(function () {
  const classTypes = {}
  const toString = classTypes.toString
  const arr = ['Object', 'Array', 'Date', 'RegExp', 'BigInt', 'Error']
  arr.forEach(name => {
    classTypes[`[object ${name}]`] = name.toLowerCase()
  })
  function toType(obj) {
    // 校验 null undefined
    if (!obj) return obj + ''
    // toString.call 转成 [object Array]格式
    // typeof 只能校验基本类型
    return typeof obj === 'object' ? classTypes[toString.call(obj)] : typeof obj
  }
  window.toType = toType
})()

// console.log(toType(1))
// console.log(toType(true))
// console.log(toType(new Error('11')))
// console.log(toType(function fn() { }))
// console.log(toType('1'))
// console.log(toType(null))
// console.log(toType(undefined))

// console.log(typeof undefined)
// console.log(typeof 1)
// console.log(typeof '1')
// console.log(typeof true)
// console.log(typeof function () { })
// console.log(typeof Symbol(Symbol('').toString()))
// console.log([] instanceof Array)
// console.log([] instanceof Object)
// let a = []
// console.log(a.constructor === Array)

// console.log(typeof null)
