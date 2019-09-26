import io from 'socket.io-client';
const socket = io.connect('http://localhost:3000');

export default function useSocket() {
  const socketSubscribe = (event, callback) => socket.on(event, callback);
  const socketPublish = (event, payload) => socket.emit(event, payload);

  return [socketSubscribe, socketPublish];
}
