export class HealthController {
  constructor(logger) {
    this.logger = logger;
  }
  
  getHealth(req, res) {
    try {
      const healthData = {
        status: 'OK',
        message: 'API funcionando!',
        timestamp: new Date().toISOString(),
        websocket: 'Socket.io ativo',
        uptime: process.uptime()
      };
      
      this.logger.info('Health check solicitado');
      res.json(healthData);
    } catch (error) {
      this.logger.error('Erro no health check:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}