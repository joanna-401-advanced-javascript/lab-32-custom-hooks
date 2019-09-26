import Q from '@nmq/q/client';

export default function useQ(q) {
  const queue = new Q(q);

  const qSubscribe = (event, callback) => queue.subscribe(event, callback);
  const qPublish = (queuePublish, event, payload) => Q.publish(queuePublish, event, payload);

  return [qSubscribe, qPublish];
}
