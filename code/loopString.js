// 校验字符串是否是回文字符串
function loopString(string) {
  if (!string || (string && string.length <= 1)) return true
  const strArr = string.split(' ').join('').split('')
  let firstStr = ''
  let lastStr = ''
  let isLoopStr = true
  while (strArr.length > 1) {
    firstStr = strArr.shift().toLowerCase()
    lastStr = strArr.pop().toLowerCase()
    if (firstStr !== lastStr) {
      isLoopStr = false
    }
  }
  return isLoopStr
}

console.log(loopString('aba'))
console.log(loopString('ab'))
console.log(loopString())
console.log(loopString('You sis uoy'))

