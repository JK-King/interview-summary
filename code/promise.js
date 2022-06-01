function promiseAll(arr) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(arr)) return reject('error')
    const res = [], len = arr.length
    let total = 0
    arr.forEach((item, index) => {
      Promise.resolve(item).then(result => {
        total++
        res[index] = result
        if (total === len) {
          resolve(res)
        }
      })
    });
  })
}

const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('1')
  }, 1000);
})

const p2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('2')
  }, 2000);
})

const p3 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('3')
  }, 3000);
})

promiseAll([p1, p2, p3]).then((res) => {
  console.log(res)
})
