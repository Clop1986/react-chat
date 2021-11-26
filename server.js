const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});
const port = process.env.PORT || 9999; 
const rooms = new Map();

app.use(express.static('build'));

app.get('/rooms', (req, res) => {  
  res.json(rooms);
});

io.on('connection', (socket) => {
  console.log('user connected', socket.id);
});

server.listen(port, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log('Сервер запущен!');
});