import axios from 'axios';
import React from 'react';

function JoinBlock({onLogin}) {
  const [roomId, setRoomId] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  const onEnter = async () => {
    if (!roomId || !userName) {
      return alert('Неверные данные!'); 
    }
    const obj = {
      roomId,
      userName
    }
    setLoading(true);
    await axios.post('/rooms', obj);
    onLogin(obj);    
  }  

  return (
    <div className="join-block">
      <input type="text" placeholder="Комната" value={roomId} onChange={e => setRoomId(e.target.value)} />
      <input type="text" placeholder="Ваше имя" value={userName} onChange={e => setUserName(e.target.value)} />
      <button className="btn btn-success" onClick={onEnter} disabled={isLoading}>
        {isLoading ? 'Вход...': 'Войти'}
      </button>      
    </div>
  );
}

export default JoinBlock