import amqp from 'amqplib/callback_api';
import { config } from '../config/config';


const url = config.AMQP_URL;

let ch:any = null;
amqp.connect(url, function (err, conn) {
   conn.createChannel(function (err, channel) {
      ch = channel;
   });
});
export const publishToQueue = async (queueName:string, data:any) => {
   ch.sendToQueue(queueName, Buffer.from( data, 'utf8' ));
   console.log('Task published to queue')
}
process.on('exit', () => {
   ch.close();
   console.log(`Closing rabbitmq channel`);
});