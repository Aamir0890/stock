const express = require('express');
const connectDB = require('./config');
const routes = require('./routes/userRoutes');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const stockService = require('./services/stockService');

const PORT = 8000;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
    credentials: true
  }
});


connectDB();


app.use('/api', routes);


io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('subscribe', (ticker) => {
    socket.join(ticker);
  });

  socket.on('unsubscribe', (ticker) => {
    socket.leave(ticker);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});


stockService.startStockUpdates(io);


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
