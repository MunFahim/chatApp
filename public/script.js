// script.js

// Connect to the Socket.io server (Make sure this script is loaded after socket.io.js)
const socket = io();

// Function to send a message
function sendMessage() {
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value.trim();

  if (message) {
    // Emit a 'chat message' event to the server
    socket.emit('chat message', message);

    // Clear the message input field
    messageInput.value = '';
  }
}

// Function to handle incoming messages
function receiveMessage(message) {
  const messagesList = document.getElementById('messages');
  const messageItem = document.createElement('li');
  messageItem.textContent = message;
  messagesList.appendChild(messageItem);
}

// Listen for the 'chat message' event from the server
socket.on('chat message', (message) => {
  receiveMessage(message);
});

// Handle form submission (sending messages)
document.getElementById('message-form').addEventListener('submit', (e) => {
  e.preventDefault();
  sendMessage();
});