import type { Chat } from 'src/routes/_types'

type Listener = (...args: unknown[]) => void | Promise<void>

export interface ChatEvents {
  message: [chat: Chat]
}

export class ChatClient {
  private ws: WebSocket
  private listeners: Map<string, Set<Listener>> = new Map()
  public constructor(url: string) {
    this.ws = new WebSocket(url)
    this.ws.addEventListener('message', ev => {
      const m = ev.data as string
      const sep = m.indexOf(':')
      const eventName = m.slice(0, sep)
      const payload = m.slice(sep + 1)
      this.emit(eventName, JSON.parse(payload))
    })
  }
  public on<T extends keyof ChatEvents>(
    eventName: T,
    listener: (...args: ChatEvents[T]) => void
  ): this
  public on(eventName: string, listener: Listener): this {
    if (this.listeners.has(eventName)) {
      const listeners = this.listeners.get(eventName)!
      listeners.add(listener)
    } else {
      const listeners = new Set<Listener>()
      listeners.add(listener)
      this.listeners.set(eventName, listeners)
    }
    return this
  }
  public emit<T extends keyof ChatEvents>(eventName: T, ...args: ChatEvents[T]): this
  public emit(eventName: string, ...args: unknown[]): this
  public emit(eventName: string, ...args: unknown[]): this {
    if (this.listeners.has(eventName)) {
      const listeners = this.listeners.get(eventName)!
      void Promise.resolve().then(() => {
        for (const listener of listeners) {
          void listener(...args)
        }
      })
    }
    return this
  }
}
