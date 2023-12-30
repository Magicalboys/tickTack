import { EventArg, UIInstance } from '@ticktack/types/src/library-component';

type EventHandler = (eventArgs: EventArg) => void;
type Events = Map<string, EventHandler[]>;

export class EventEmitter {
  private events: Events;
  target: UIInstance;
  constructor() {
    this.events = new Map();
  }

  on(eventName: string, listener: EventHandler) {
    if (!this.events.get(eventName)) {
        this.events.set(eventName, []);
    }
    this.events.get(eventName)?.push(listener)
  }

  emit(eventName: string, args: Record<string, unknown>) {
    const listeners = this.events.get(eventName);

    if (!listeners) {
        return;
    }

    for (const listener of listeners) {
        listener({
            target: this.target,
            args
        })
    }
  }

  off(eventName?: string) {
    if (!eventName) {
        this.events.clear();
        return;
    }

    // 取消监听指定事件
    this.events.delete(eventName);
  }

  once(eventName: string, listener: EventHandler) {
    // 执行一次就off掉
    const wrapper = (eventArgs: EventArg) => {
        listener(eventArgs);
        this.off(eventName);
    }
    this.on(eventName, wrapper);
  }
}
