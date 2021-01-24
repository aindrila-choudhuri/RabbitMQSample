const amqp = require("amqplib/callback_api");

//Step1: create connection
amqp.connect("amqp://localhost", (connectionErr, connection) => {
    if (connectionErr) {
        throw connectionErr;
    }

    //Step2: create channel
    connection.createChannel((channelErr, channel) => {
        if (channelErr) {
            throw channelErr;
        }

        //Step3: assert queue
        const QUEUE = "myFirstQueue";
        await channel.assertQueue(QUEUE);

        //Step4: consume the message
        channel.consume(QUEUE, (msg) => {
            console.log(`Message received: ${JSON.stringify(msg)}`);
            console.log(`Message content: ${msg.content.toString()}`);
        }, {
            noAck: true
        })

    })
})