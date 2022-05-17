Function.prototype.myCall = function (context, ...args) {
  const thisFn = this
  context = typeof context === 'number' ? Object.assign(context) : context
  context = context || window
  const fnKey = Symbol('A')
  context[fnKey] = thisFn
  const result = context[fnKey](...args)
  delete context[fnKey]
  return result
}

Function.prototype.myBind = function (context, ...args) {
  const thisFn = this
  context = typeof context === 'number' ? Object.assign(context) : context
  context = context || window
  return function (...params) {
    return thisFn.apply(context, args.concat(params))
  }
}

Function.prototype.myApply = function (context, args) {
  const thisFn = this
  context = typeof context === 'number' ? Object.assign(context) : context
  context = context || window
  const fnKey = Symbol('A')
  context[fnKey] = thisFn
  const result = context[fnKey](args)
  delete context[fnKey]
  return result
}

const obj = {
  name: 'obj'
}

function aa() {
  console.log(this, arguments)
}

// aa.call(obj, 1, 2, 3, 4)
aa.myCall(obj, 1, 2, 3, 4)
// aa.myCall(1, 1)
aa.myApply(obj, [1,2])
aa.myBind(obj, 1,3)('a')

