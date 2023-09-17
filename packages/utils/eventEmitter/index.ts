// 定义订阅者接口
interface Subscriber {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  update(data: any): void;
}

// 定义发布者类
class Publisher {
  private subscribers: Subscriber[] = [];

  // 注册订阅者
  subscribe(subscriber: Subscriber): void {
    this.subscribers.push(subscriber);
  }

  // 取消订阅
  unsubscribe(subscriber: Subscriber): void {
    const index = this.subscribers.indexOf(subscriber);
    if (index !== -1) {
      this.subscribers.splice(index, 1);
    }
  }

  // 发布消息
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  publish(data: any): void {
    for (const subscriber of this.subscribers) {
      subscriber.update(data);
    }
  }
}

// 实现具体的订阅者
class ConcreteSubscriber implements Subscriber {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  update(data: any): void {
    console.log("收到消息:", data);
  }
}

// 使用示例
const publisher = new Publisher();

const subscriber1 = new ConcreteSubscriber();
const subscriber2 = new ConcreteSubscriber();

publisher.subscribe(subscriber1);
publisher.subscribe(subscriber2);

publisher.publish("Hello, subscribers!");

publisher.unsubscribe(subscriber2);

publisher.publish("Another message");
