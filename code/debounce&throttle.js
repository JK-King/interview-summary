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
  let flag = true
  return function (...args) {
    if (!flag) return
    flag = false
    const timer = setTimeout(() => {
      fn.call(this, ...args)
      clearTimeout(timer)
    }, delay);
  }
}

