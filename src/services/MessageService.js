import { IMessageService } from '../interfaces/IMessageService.js';

export class MessageService extends IMessageService {
  constructor(io) {
    super();
    this.io = io;
  }
  
  processMessage(data) {
    return {
      id: data.socketId,
      message: data.message,
      timestamp: new Date().toISOString(),
      processed: true
    };
  }
  
  broadcastMessage(message) {
    this.io.emit('message', message);
  }
  
  sendWelcome(socket) {
    socket.emit('welcome', {
      message: 'Conectado com sucesso!',
      id: socket.id,
      timestamp: new Date().toISOString()
    });
  }
}