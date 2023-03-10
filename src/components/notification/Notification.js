export default function Notification(props) {
    return (
        <p className={props.className}>{props.reason}</p>
    );
}