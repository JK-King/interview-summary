class ObserverMgt {
  pond = []
  add(observer) {
    if (!this.pond.includes(observer)) {
      this.pond.push(observer)
    }
  }
  remove(observer) {
    this.pond = this.pond.filter(ob => ob !== observer)
  }

  notify(...args) {
    this.pond.forEach(ob => {
      ob.update(...args)
    })
  }
}

class Observer {
  constructor(name) {
    this.name = name
  }
  update(...args) {
    console.log(this, args)
  }
}

const ob1 = new Observer('A')
const ob2 = new Observer('B')
const ob3 = new Observer('C')

const obMgt = new ObserverMgt()
obMgt.add(ob1)
obMgt.add(ob2)
obMgt.add(ob3)
obMgt.notify(100, 200)
obMgt.remove(ob2)
obMgt.notify(300, 400)
