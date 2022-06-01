// 防抖：是在一段时间内，无论触发多少次回调，都只执行最后一次

function debounce(fn, delay) {
  let timer = null
  return function (...args) {
    // 先清除之前的定时器，再创建新的定时器
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn.call(this, ...args)
      clearTimeout(timer)
    }, delay);
  }
}

// 节流：是在一定的时间间隔内只执行一次，无视后来的回调函数，也不会延长时间间隔
function throttle(fn, delay) {
  let timer = null
  return function (...args) {
    if (timer) return
    timer = setTimeout(() => {
      fn.call(this, ...args)
      clearTimeout(timer)
      timer = null
    }, delay);
  }
}

// 时间戳：第一次立即执行
function throttle1(fn, delay) {
  const lastTime = 0
  return function (...args) {
    let nowTime = Date.now()
    if (nowTime - lastTime >= delay) {
      lastTime = nowTime
      fn.call(this, ...args)
    }
  }
}

// 保证最后一次能立即执行
function throttle2(fn, delay) {
  let timer = null
  let startTime = Date.now()
  return function (...args) {
    const nowTime = Date.now()
    const time = delay - (nowTime - startTime)
    timer && clearTimeout(timer)
    if (time <= 0) {
      fn.call(this, ...args)
      startTime = Date.now()
    } else {
      timer = setTimeout(() => {
        fn.call(this, ...args)
        clearTimeout(timer)
        timer = null
      }, time);
    }
  }
}

