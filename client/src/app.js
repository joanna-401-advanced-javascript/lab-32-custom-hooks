import React, {useState, useEffect} from 'react';

import io from 'socket.io-client';
import Q from '@nmq/q/client';

import useForm from "./hooks/useForm";
import useSocket from "./hooks/useSocket";

// Connect outside of the render cycle ...
const socket = io.connect('http://localhost:3000');
const queue = new Q('deeds');

const App = (props) => {
  const [values, handleChange, handleSubmit] = useForm({});
  const [queueMessage, setQueueMessage] = useState({});
  const [socketMessage, setSocketMessage] = useState({});
  const [socketSubscribe, socketPublish] = useSocket(socket);

  const submitCallback = (formValues) => {
    Q.publish('deeds', 'work', formValues);
    socketPublish('words', formValues);
  };


  useEffect( () => {
    queue.subscribe('work', message => {
      setQueueMessage(message);
    });

    socketSubscribe('incoming', setSocketMessage);

  }, []);

  return (
    <>
      <pre>Form Values: {JSON.stringify(values)}</pre>
      <pre>Queue Values: {JSON.stringify(queueMessage)}</pre>
      <pre>Socket Values: {JSON.stringify(socketMessage)}</pre>
      <form onSubmit={(event) => handleSubmit(event, submitCallback)}>
        <input name='firstName' placeholder="First Name" onChange={handleChange} />
        <input name='lastName' placeholder="Last Name" onChange={handleChange} />
        <button>Save</button>
      </form>
    </>
  );
};

export default App;

