function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms)
    }, ms);
  })
}
const tasks = [() => {
  return delay(1000)
}, () => {
  return delay(1003)
}, () => {
  return delay(1006)
}, () => {
  return delay(1004)
}, () => {
  return delay(1002)
}, () => {
  return delay(1005)
}]

function createRequest(tasks, poolNum, callback) {
  class TaskQueue {
    running = 0
    results = []
    queue = []
    pushTask(task) {
      this.queue.push(task)
      this.next()
    }
    next() {
      const _this = this
      while (_this.running < poolNum && _this.queue.length) {
        const task = _this.queue.shift()
        task().then(res => {
          _this.results.push(res)
        }).finally(() => {
          _this.running--
          _this.next()
        })
        _this.running++
      }
      if (_this.running === 0) callback(_this.results)
    }
  }
  const TQ = new TaskQueue()
  tasks.forEach(task => TQ.pushTask(task));
}

createRequest(tasks, 3, (res) => {
  console.log(res)
})

// function createRequest(tasks, poolNum = 2) {
//   const results = []
//   let runTasks = new Array(poolNum).fill(null)
//   let index = 0
//   runTasks = runTasks.map(() => {
//     return new Promise((resolve, reject) => {
//       const run = function () {
//         if (index >= tasks.length) {
//           resolve()
//           return
//         }
//         const oldIndex = index
//         const task = tasks[index++]
//         task().then(res => {
//           results[oldIndex] = res
//           run()
//         }).catch(reason => reject(reason))
//       }
//       run()
//     })
//   })

//   return Promise.all(runTasks).then(() => results)
// }

// createRequest(tasks, 3).then(res => {
//   console.log(res)
// })

