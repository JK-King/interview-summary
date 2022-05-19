// 浅克隆
function shallowClone(obj) {
  const type = toType(obj)
  const Contr = obj.constructor
  // 处理数组对象
  const dealObjectHandler = function (obj) {
    const result = new Contr()
    // getOwnPropertySymbols 获取symbol key
    const objKeys = Object.keys(obj).concat(Object.getOwnPropertySymbols(obj))
    objKeys.forEach(key => {
      result[key] = obj[key]
    })
    return result
  }
  switch (type) {
    case 'object':
    case 'array':
      return dealObjectHandler(obj)
    case 'symbol':
    case 'bigint':
      return Object(obj)
    case 'regexp':
    case 'date':
      return new Contr(obj)
    case 'error':
      return new Contr(obj.message)
    case 'function':
      // 返回新函数
      return function () {
        return obj.call(this, ...arguments)
      }
    default:
      return obj
  }
}

// 深克隆
function deepClone(obj, cache = new Set()) {
  const type = toType(obj)
  const Contr = obj.constructor
  if (type === 'object' || type === 'array') {
    // 防止无限循环引用
    if (cache.has(obj)) return obj
    cache.add(obj)

    const result = new Contr()
    const objKeys = Object.keys(obj).concat(Object.getOwnPropertySymbols(obj))
    objKeys.forEach(key => {
      result[key] = deepClone(obj[key], cache)
    })
    return result
  }
  return shallowClone(obj)
}

const obj = {
  a: 1,
  b: {
    c: 2
  },
  [Symbol('1')]: 1
}
const obj1 = shallowClone(obj)
const obj2 = deepClone(obj)
console.log(obj1, obj)
console.log(obj2, obj)
