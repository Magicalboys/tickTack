type EventHandler = (...args: string[]) => void;

export class EventEmitter {
  private events: { [eventName: string]: EventHandler[] } = {};

  public subscribe(eventName: string, handler: EventHandler): void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(handler);
  }

  public unsubscribe(eventName: string, handler: EventHandler): void {
    const eventHandlers = this.events[eventName];

    if (eventHandlers) {
      this.events[eventName] = eventHandlers.filter((h) => h !== handler);
    }
  }

  public emit(eventName: string, ...args: string[]): void {
    const eventHandlers = this.events[eventName];

    if (eventHandlers) {
      eventHandlers.forEach((handler) => handler(...args));
    }
  }
}
