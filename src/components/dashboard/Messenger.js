import SendBox from './SendBox';

import axios from 'axios';
import socketIO from '../../utils/socket';
import { useCallback, useEffect, useState } from 'react';

function Message(props) {
    if (props.chat.customerMessage) return <p className='customerMessage'>🤵 {props.chat.customerMessage}</p>;
    if (props.chat.clientMessage) return <p className='clientMessage'>{props.chat.clientMessage}</p>;
}

export default function Messenger() {

    const [token, setToken] = useState(sessionStorage.getItem('sessionID') || null);
    const [chatHistory, setChat] = useState([]);
    const [customerN, setCustomer] = useState();
    const [conversation, setConversation] = useState([]);

    useEffect(() => {

        let history = sessionStorage.getItem('chatHistory');

        if (history) {
            history = JSON.parse(history).chats;
            if (Array.isArray(history) && history.length > 0) setChat(history);
        }

        axios.post(`${process.env.REACT_APP_BACKEND}/chat`, { token: token })
            .then((response) => {

                let theseChats = response.data.customerChats;

                if (chatHistory != theseChats) {

                    sessionStorage.setItem('chatHistory', JSON.stringify({
                        chats: theseChats,
                    }));

                    setChat(theseChats);
                }
            })
            .catch((e) => console.log(e.message));

        socketIO.on('message', (data) => {

            let current = sessionStorage.getItem('currentCustomer')

            if (current == data.phoneNumber) {

                if (sessionStorage.getItem(data.phoneNumber)) {
                    setConv(current, true);
                }
            }

            let newChat = JSON.parse(sessionStorage.getItem('chatHistory')).chats;

            for(let customer of newChat){
                if(customer.customerNumber == data.phoneNumber) return;
            }

            newChat.push({"customerDisplay": data.phoneNumber, "customerNumber": data.phoneNumber});
            setChat(newChat);
        });

        return () => socketIO.off('message');

    }, []);

    const setConv = useCallback((chatID, toFetch) => {

        let cache = sessionStorage.getItem(chatID);

        if (cache && !toFetch) {
            cache = JSON.parse(cache).chats;
            if (Array.isArray(cache) && cache.length > 0) setConversation(cache);
        }

        axios.post(`${process.env.REACT_APP_BACKEND}/chat/${chatID}`, { token: token })
            .then((response) => {

                let list = response.data.conversation;

                sessionStorage.setItem(chatID, JSON.stringify({
                    chats: list,
                }));

                sessionStorage.setItem('currentCustomer', chatID);

                setConversation(list);
            })
            .catch((e) => console.log(e.message));

    }, []);

    return (
        <div className='rowWiseElements'>
            <div className='chat-history'>
                <h4>History</h4>
                {(chatHistory.length > 0) ? chatHistory.map((chat) => <a onClick={() => {
                    setConv(chat.customerNumber);
                    setCustomer(chat.customerNumber);
                }} id={chat.customerNumber} key={chat.customerNumber}>{chat.customerDisplay}</a>) : null}
            </div>
            <div className='conversation'>
                {(conversation.length > 0) ? conversation.map((message) => <Message chat={message} key={message.messageID} customerNumber={customerN} />) : null}
                {(conversation.length > 0) ? <SendBox userToken={token} toPhone={customerN} /> : null}
            </div>
        </div>
    );
}