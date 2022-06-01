function trap1(arr = []) {
  if (arr.length === 0) return 0
  const len = arr.length
  let res = 0

  for (let i = 1; i < len - 1; i++) {
    let l_max = 0, r_max = 0
    for (let j = i; j < len; j++) {
      // 找右边最高的柱子
      r_max = Math.max(r_max, arr[j])
    }

    for (let j = i; j >= 0; j--) {
      // 找左边最高的柱子
      l_max = Math.max(l_max, arr[j])
    }
    res += Math.min(l_max, r_max) - arr[i]
  }
  return res
}

console.log(trap1([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))
console.log(trap1([4, 2, 0, 3, 2, 5]))


function trap(arr = []) {
  if (arr.length === 0) return 0
  const len = arr.length
  let res = 0, left = 0, right = len - 1
  let l_max = arr[left], r_max = arr[right]
  while (left <= right) {
    l_max = Math.max(l_max, arr[left])
    r_max = Math.max(r_max, arr[right])

    if (l_max < r_max) {
      res += l_max - arr[left]
      left++
    } else {
      res += r_max - arr[right]
      right--
    }
  }
  return res
}

// console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))
// console.log(trap([4, 2, 0, 3, 2, 5]))
