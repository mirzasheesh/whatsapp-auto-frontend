import { io } from 'socket.io-client';

const socketIO = io(`https://wbm-socket.iinerds.com`);

export default socketIO;