const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
})

let server = app.listen(port, () => {
    console.log("Konektovan sam");
});

const io = require("socket.io")(server);

io.on("connection", (socket) => {
    // console.log(socket);
    console.log("New user connected");

    socket.username = "Anonymous";
    socket.on("change_username", (data) => {
        console.log("promenjen username");
        socket.username = data.username;
    });

    socket.on("new_messageCL", (data) => {
        io.sockets.emit("new_messageSR", {
            message: data.message,
            username: socket.username
        })
    });

    socket.on("typing", () => {
        socket.broadcast.emit("typing", { username: socket.username });
    });
})