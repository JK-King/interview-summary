// 简单的发布-订阅模式
class Publish {
  // 收集订阅的池子
  pond = []
  // 订阅
  subscribe(func) {
    if (!this.pond.includes(func)) {
      this.pond.push(func)
    }
    // 取消订阅
    return function unsubscribe() {
      this.pond = this.pond.filter(fn => fn !== func)
    }
  }
  // 通知
  fire(...args) {
    this.pond.forEach(fn => {
      if (typeof fn === 'function') {
        fn(...args)
      }
    })
  }
}

const fn1 = (...args) => console.log(1, args)
const fn2 = (...args) => console.log(2, args)
const fn3 = (...args) => console.log(3, args)
const fn4 = (...args) => console.log(4, args)

// const pub1 = new Publish()
// pub1.subscribe(fn1)
// pub1.subscribe(fn2)
// setTimeout(() => {
//   pub1.fire(100, 200)
// }, 1000);
// const pub2 = new Publish()
// pub2.subscribe(fn3)
// pub2.subscribe(fn4)
// setTimeout(() => {
//   pub2.fire(300, 400)
// }, 2000);

// 自定义事件 发布-订阅模式
class PublishEvent {
  // 收集订阅的池子
  pond = {}
  // 订阅
  subscribe(eventName, func) {
    const funs = this.pond[eventName] || []
    if (!funs.includes(func)) {
      funs.push(func)
    }
    this.pond[eventName] = funs
  }
  // 取消订阅
  unsubscribe(eventName, func) {
    const funs = this.pond[eventName] || []
    this.pond[eventName] = funs.filter(fn => fn !== func)
  }
  // 通知
  fire(eventName, ...args) {
    const funs = this.pond[eventName] || []
    funs.forEach(fn => {
      if (typeof fn === 'function') {
        fn(...args)
      }
    })
  }
}

// const pub1 = new PublishEvent()
// pub1.subscribe('A', fn1)
// pub1.subscribe('A', fn2)
// pub1.subscribe('A', fn3)
// pub1.subscribe('A', fn4)
// setTimeout(() => {
//   pub1.fire('A', 100, 200)
//   pub1.unsubscribe('A', fn2)
// }, 1000);
// setTimeout(() => {
//   pub1.fire('A', 300, 400)
// }, 2000);
// const pub2 = new PublishEvent()
// pub2.subscribe('B', fn3)
// pub2.subscribe('B', fn4)
// setTimeout(() => {
//   pub2.fire('B', 300, 400)
// }, 2000);

const Subscribe = (function () {
  function SubscribeClass() {
    this.pond = []
  }
  SubscribeClass.prototype.subscribe = function (func) {
    if (!this.pond.includes(func)) {
      this.pond.push(func)
    }
    return function unsubscribe() {
      this.pond.filter(fn => fn !== func)
    }
  }
  SubscribeClass.prototype.fire = function (...args) {
    this.pond.forEach(fn => {
      if (typeof fn === 'function') {
        fn(...args)
      }
    })
  }
  return SubscribeClass
})()

const sub1 = new Subscribe
sub1.subscribe(fn1)
sub1.subscribe(fn2)
setTimeout(() => {
  sub1.fire(100, 200)
}, 1000);
const sub2 = new Subscribe
sub2.subscribe(fn3)
sub2.subscribe(fn4)
setTimeout(() => {
  sub2.fire(300, 400)
}, 2000);
