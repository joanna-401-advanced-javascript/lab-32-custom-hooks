
// const socket = io.connect('http://localhost:3000');

export default function useSocket(socket){

  const socketSubscribe = (event, callback) => socket.on(event, callback);
  const socketPublish = (event, payload) => socket.emit(event, payload);

  return [socketSubscribe, socketPublish];
};