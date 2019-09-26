import Q from '@nmq/q/client';

export default function useQ(q){
  const queue = new Q(q);

  const qSubscribe = (event, callback) => queue.subscribe(event, callback);
  const qPublish = (queue, event, payload) => Q.publish(queue, event, payload);

  return [qSubscribe, qPublish];
};