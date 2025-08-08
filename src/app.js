import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { SocketConfig } from './config/SocketConfig.js';
import { ServiceFactory } from './factories/ServiceFactory.js';

export class App {
  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.io = new Server(this.server, SocketConfig.getConfig());
    
    this.initializeServices();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupWebSocket();
  }
  
  initializeServices() {
    this.logger = ServiceFactory.createLogger();
    this.messageService = ServiceFactory.createMessageService(this.io);
    this.socketHandler = ServiceFactory.createSocketHandler(this.messageService, this.logger);
    this.healthController = ServiceFactory.createHealthController(this.logger);
  }
  
  setupMiddleware() {
    this.app.use(express.json());
    this.app.use(express.static('public')); // Para servir arquivos estáticos
  }
  
  setupRoutes() {
    this.app.get('/', (req, res) => this.healthController.getHealth(req, res));
    this.app.get('/health', (req, res) => this.healthController.getHealth(req, res));
  }
  
  setupWebSocket() {
    this.io.on('connection', (socket) => {
      this.socketHandler.handleConnection(socket);
    });
  }
  
  getServer() {
    return this.server;
  }
}