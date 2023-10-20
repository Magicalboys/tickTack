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

// // 创建一个事件发射器实例
// const emitter = new EventEmitter();

// // 定义事件处理程序
// const handler1: EventHandler = (message: string) => {
//   console.log(`Handler 1: ${message}`);
// };

// const handler2: EventHandler = (message: string) => {
//   console.log(`Handler 2: ${message}`);
// };

// // 订阅事件
// emitter.subscribe("event1", handler1);
// emitter.subscribe("event1", handler2);

// // 发布事件
// emitter.emit("event1", "Hello, World!");

// // 输出：
// // Handler 1: Hello, World!
// // Handler 2: Hello, World!

// // 取消订阅事件
// emitter.unsubscribe("event1", handler1);

// // 再次发布事件
// emitter.emit("event1", "Goodbye!");

// 输出：
// Handler 2: Goodbye!
