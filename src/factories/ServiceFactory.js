import { MessageService } from '../services/MessageService.js';
import { Logger } from '../services/Logger.js';
import { SocketHandler } from '../handlers/SocketHandler.js';
import { HealthController } from '../controllers/HealthController.js';

export class ServiceFactory {
  static createLogger() {
    return new Logger();
  }
  
  static createMessageService(io) {
    return new MessageService(io);
  }
  
  static createSocketHandler(messageService, logger) {
    return new SocketHandler(messageService, logger);
  }
  
  static createHealthController(logger) {
    return new HealthController(logger);
  }
}