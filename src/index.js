import { App } from './app.js';

const app = new App();
const server = app.getServer();
const PORT = process.env.PORT || 3000;

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`WebSocket disponível em ws://localhost:${PORT}`);
});
