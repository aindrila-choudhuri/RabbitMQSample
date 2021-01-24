const amqp = require("amqplib/callback_api");

//Step1: create connection
amqp.connect("amqp://localhost", (connError, connection) => {
    if (connError) {
        throw connError;
    }

    //Step2: create channel
    connection.createChannel((channelError, channel) => {
        if (channelError) {
            throw channelError;
        }

        //Step3: assert queue
        const QUEUE = "myFirstQueue";
        await channel.assertQueue(QUEUE);

        //Step4: send message to queue
        channel.sendToQueue(QUEUE, Buffer.from("hello from my first queue"));

        console.log(`Message sent to ${QUEUE}`);
    });
});