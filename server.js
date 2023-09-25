const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path'); 
const app = express();
const server = http.createServer(app);
const env = require('dotenv').config();
const io = socketIo(server);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set the views directory
app.use(express.static(path.join(__dirname, 'public')));
// Define a route for your Express server
app.get('/', (req, res) => {
  res.render('chat'); // Render the 'chat.ejs' template
});

// Define a Socket.io event handler
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Handle events when a user sends a message
  socket.on('chat message', (message) => {
    console.log('Message:', message);
    
    // Broadcast the message to all connected clients
    io.emit('chat message', message);
  });
  
  // Handle disconnect event
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const port = 3000; // Change this to your desired port
server.listen(port, process.env.IP, () => {
  console.log(`Server is running on server ${process.env.IP}`);
});
