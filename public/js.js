const socket = io.connect("http://localhost:3000");

const messageVal = document.getElementById("message");
const usernameVal = document.getElementById("username");
const send_username = document.getElementById("send_username");
const send_message = document.getElementById("send_message");
const chatroom = document.getElementById("chatroom");
const feedback = document.getElementById("feedback");

send_message.addEventListener("click", function () {
    if (messageVal.value != "") {
        socket.emit("new_messageCL", { message: messageVal.value });
    }
});

socket.on("new_messageSR", (data) => {
    feedback.value = "";
    messageVal.value = "";
    let div = document.createElement("div");
    div.innerHTML = `<p class='message'><span class='nick'>${data.username}: </span>${data.message}</p>`;
    chatroom.appendChild(div);
});

send_username.addEventListener("click", function () {
    socket.emit("change_username", { username: usernameVal.value })
});

messageVal.addEventListener("keypress", function () {
    socket.emit("typing");
});

socket.on("typing", (data) => {
    feedback.innerHTML = `<p><i> ${data.username} is typing.....</p></i>`;
});