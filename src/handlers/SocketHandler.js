import { ISocketHandler } from '../interfaces/ISocketHandler.js';

export class SocketHandler extends ISocketHandler {
  constructor(messageService, logger) {
    super();
    this.messageService = messageService;
    this.logger = logger;
  }
  
  handleConnection(socket) {
    this.logger.info(`Cliente conectado: ${socket.id}`);
    this.messageService.sendWelcome(socket);
    
    this.setupSocketEvents(socket);
  }
  
  handleDisconnection(socket) {
    this.logger.info(`Cliente desconectado: ${socket.id}`);
  }
  
  setupSocketEvents(socket) {
    socket.on('message', (data) => this.handleMessage(socket, data));
    socket.on('disconnect', () => this.handleDisconnection(socket));
  }
  
  handleMessage(socket, data) {
    try {
      const messageData = {
        socketId: socket.id,
        message: data
      };
      
      const processedMessage = this.messageService.processMessage(messageData);
      this.messageService.broadcastMessage(processedMessage);
      
      this.logger.info('Mensagem processada:', processedMessage);
    } catch (error) {
      this.logger.error('Erro ao processar mensagem:', error);
      socket.emit('error', { message: 'Erro ao processar mensagem' });
    }
  }
}
