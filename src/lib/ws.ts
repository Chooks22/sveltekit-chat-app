import type { ServerOptions, WebSocket } from 'ws'
import { WebSocketServer as BaseServer } from 'ws'

class WebSocketServer extends BaseServer {
  private static clients = new Set<WebSocket>()
  public constructor(opts?: ServerOptions) {
    super(opts)
    super.on('connection', sock => {
      const clients = WebSocketServer.clients
      sock.once('close', () => {
        clients.delete(sock)
      })
      clients.add(sock)
    })
  }
  public async broadcast(eventName: string, message: unknown): Promise<void> {
    await Promise.resolve()
    for (const client of WebSocketServer.clients) {
      client.send(`${eventName}:${JSON.stringify(message)}`)
    }
  }
}

export default WebSocketServer
