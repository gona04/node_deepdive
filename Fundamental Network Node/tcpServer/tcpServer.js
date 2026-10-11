import net from "node:net";

const clients = [];

const server = net.createServer((socket) => {
  socket.on("error", (error) => {
    console.error(`Client socket error: ${error.code}`);
  });
});

server.listen(2000, "0.0.0.0", () => {
  console.log("Listening to port 2000");
});

server.on("connection", (socket) => {
  console.log("Connected to client");
  const address = `${socket.remoteAddress}:${socket.remotePort}`;
  let otherClients;
  socket.on("data", (chunk) => {
    //seeing if the user already exists
    const currentClient = clients.find((client) => client.address === address);

    //If the user doesnt exist then adding that user
    if (!currentClient) {
      const { name } = JSON.parse(chunk.toString());
      const newClient = { name, address, socket };
      clients.push(newClient);

      //seding other users details that a new user has loggedin
      clients.forEach((client) => {
        if (client !== newClient) {
          client.socket.write(`${newClient.name} just logged in`);
        }
      });
      //sending user details to other users
      otherClients = clients.filter((client) => client !== newClient);
      if (otherClients.length > 0) {
        socket.write(
          JSON.stringify({
            type: "users",
            names: otherClients.map((client) => client.name),
          }),
        );
      }

      return;
    }

    const message = chunk.toString();
    const recipients = clients.filter(
      (client) => {
        if(message.includes(client.name)) return client;
      }
    );
   //if recipient send the message to them or else everyone
   if(recipients) {
    recipients[0].socket.write(`${currentClient.name} says: ${message}`);
   } else {
    clients.forEach(client => {
      client.socket.write(`${currentClient.name} says: ${message}`)
    })
   }
  });

  socket.on("close", () => {
    console.log(
      socket.remoteAddress,
      ":",
      socket.remotePort,
      "network disconnected",
    );
  });
});
