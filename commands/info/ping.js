module.exports = {
    name: "ping",
    category: "info",
    description: "Returns latency and API ping",
    run: async (client, message, args) => {
       message.channel.send(`<a:network:733771236458627113> Pong - ${client.ws.ping}ms`)
    }
}
