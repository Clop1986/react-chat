import React from 'react';
import socket from '../socket';

function Chat({ users, messages, userName, roomId, onAddMessage }) {
  const [messageValue, setMessageValue] = React.useState('');
  const messagesRef = React.useRef(null);

  const onSendMessage = () => {
    if (messageValue) {
      socket.emit('ROOM:NEW_MESSAGE', {
        userName,
        roomId,
        text: messageValue,
      });    
      onAddMessage({ userName, text: messageValue });
      setMessageValue('');
    }    
  };

  React.useEffect(() => {
    messagesRef.current.scroll(0, messagesRef.current.scrollHeight);
  }, [messages]);
  
  console.log(userName)

  return (
    <div className="chat">
      <div className="chat-users">
        Комната: <b>{roomId}</b>
        <hr />
        <b>Онлайн ({users.length}):</b>
        <ul>
          {users.map((name, index) => (
            <li key={name + index} onClick={() => setMessageValue(!messageValue ? `${name} ` : `${messageValue} ${name} `)}>{name}</li>
          ))}
        </ul>
      </div>
      <div className="chat-messages">
        <div ref={messagesRef} className="messages">
          {messages.map((message, index) => (            
            <div key={message + index} className={message.userName === userName ? 'message message-my' : 'message'}>
              <p>{message.text}</p>
              <div>
                <span>{message.userName}</span>
              </div>
            </div>
          ))}
        </div>
        <form>
          <textarea
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
            className="form-control"
            rows="3"></textarea>
          <button onClick={onSendMessage} type="button" className="btn btn-primary">
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;