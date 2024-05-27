// 152
const io = require("socket.io")(8900, {
    cors: {
      origin: "http://localhost:3000",
    },
});

// socket server to client - io
// socket server to every client - io.emit
// to one client - io.to(socketId).emit
// from client taking event from server - socket.on
// socket taking something from client - socket.on
// from client sending event to server - socket.emit

// 155
let users = [];
const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) && users.push({userId, socketId});
}

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};
  

io.on("connection", (socket) => {
    // when connect
    console.log("A user connected");
    
    // 156
    //take userId and socketId from user
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        // sending users to every client
        io.emit("getUsers", users);
    })

    // 159
    // send and get message
    socket.on("sendMessage", ({senderId, receiverId, text}) => {
       const user = getUser(receiverId);
       io.to(user.socketId).emit("getMessage", {
        senderId,
        text
       })
    })

    // 158
    // when user disconnected
    socket.on("disconnect", () => {
        console.log("A user disconnected");
        removeUser(socket.id);
        io.emit("getUsers", users);
    })
})