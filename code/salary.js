function salary(days) {
  let n = 1 // 相同薪资的天数
  // 内循环的起始值，没次开始都要重置
  let y = 1
  // 每天的薪资
  let m = 1
  // 每天薪资的数组
  let a = []
  // 外循环，为了生成内循环的参数
  for (let i = 1; i <= days; i++) {
    if (a.length >= days) {
      break
    }
    // 内循环
    while (y <= n && a.length < days) {
      a.push(m)
      y++
    }
    y = 1
    n += 1
    m += 1
  }
  return a.reduce((pre, next) => pre = pre + next, 0)
}

console.log(salary(5))
