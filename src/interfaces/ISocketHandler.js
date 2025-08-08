export class ISocketHandler {
  handleConnection(socket) {
    throw new Error('Method must be implemented');
  }
  
  handleDisconnection(socket) {
    throw new Error('Method must be implemented');
  }
}
