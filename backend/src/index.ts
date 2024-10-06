import WebSocket, { WebSocketServer } from 'ws';
import http from 'http';
const PORT: number = 8080;
const server = http.createServer((req: any, res: any) => {
  console.log(new Date() + ' Received request for ' + req.url);
  res.end('Hello World');
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws: WebSocket) => {
  ws.on('error', (err) => console.log(err));
  console.log('Client connected');
  ws.on('message', (data: any, isBinary: any) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
  console.log('user count: ', wss.clients.size);
  ws.send('Hello! Message From Server!!');
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
