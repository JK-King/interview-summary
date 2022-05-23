// 冒泡排序
function bubbling(arr) {
  for (let i = 0; i < arr.length; i++) {
    // 用第i项与剩下的项相比
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        const temp = arr[j]
        arr[j] = arr[i]
        arr[i] = temp
      }
    }
  }
}

// 插入排序
function insertSort(arr) {
  const newArr = []
  newArr.push(arr[0])
  for (let i = 1; i < arr.length; i++) {
    const A = arr[i]
    for (let j = newArr.length - 1; j >= 0; j--) {
      const B = newArr[j]
      if (A > B) {
        newArr.splice(j + 1, 0, A)
        break
      }
      if (j === 0) newArr.splice(0, 0, A)
    }
  }
  return newArr
}

// 快速排序
function fastSort(arr) {
  if (arr.length <= 1) {
    return arr
  }
  const middleIdx = Math.floor(arr.length / 2)
  // 从原数组中取出中间值，删除
  let middleVal = arr.splice(middleIdx, 1)[0]
  let arrLeft = [], arrRight = []
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    item < middleVal ? arrLeft.push(item) : arrRight.push(item)
  }
  return fastSort(arrLeft).concat(middleVal, fastSort(arrRight))
}


const arr = [12, 8, 24, 16, 1]
// bubbling(arr)
// console.log(arr)
// console.log(insertSort(arr))
// console.log(fastSort(arr))

// 数组扁平化
function flatArray(arr) {
  let result = []
  arr.forEach(item => {
    if (Array.isArray(item)) {
      result = result.concat(flatArray(item))
    } else {
      result.push(item)
    }
  });
  return result
}

// console.log(flatArray([1, 2, [1, 2, 3], [2, 3, 4, [5, 7, [8]]]]))

// 菲波那切数列
function fibonacci(n) {
  // n是数列的下标
  if (n <= 1) return 1
  const arr = [1, 1]
  let i = n + 1 - 2
  while (i > 0) {
    let a = arr[arr.length - 2]
    let b = arr[arr.length - 1]
    arr.push(a + b)
    i--
  }
  return arr[arr.length - 1]
}

function fibonacci1(count) {
  function fn(count, curr = 1, next = 1) {
    if (count < 1) {
      return curr
    } else {
      return fn(count - 1, next, curr + next)
    }
  }
  return fn(count)
}

// console.log(fibonacci1(0))
// console.log(fibonacci1(1))
// console.log(fibonacci1(2))
// console.log(fibonacci1(3))
// console.log(fibonacci1(4))
// console.log(fibonacci1(5))
// console.log(fibonacci1(6))
// console.log(fibonacci1(7))
// console.log(fibonacci1(8))

// 输入一个自然数n，输入联系自然数和为n的所有数组
function fn(n) {
  function createArr(i, j) {
    const arr = []
    for (let m = 0; m < j; m++) {
      arr.push(i + m)
    }
    return arr
  }
  const middle = Math.ceil(n / 2)
  const result = []
  for (let i = 1; i < middle; i++) {
    for (let j = 2; ; j++) {
      const total = (i + (i + j - 1)) * (j / 2)
      if (total > n) break
      if (total === n) {
        result.push(createArr(i, j))
        break
      }
    }
  }
  return result
}

console.log(fn(3))
console.log(fn(4))
console.log(fn(6))
console.log(fn(10))
console.log(fn(15))

