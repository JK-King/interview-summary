var tree = {
  age: 10,
  name: 'a',
  child: [{
    age: 20,
    name: 'b'
  }, {
    age: 30,
    name: 'c',
    child: [
      {
        age: 40,
        name: 'd'
      },
      {
        age: 50,
        name: 'e'
      }
    ]
  }]
}

function holdName(name,tree) {
  if (tree.name === name) return tree.age
  let age = null
  if (tree.child && Array.isArray(tree.child)) {
    tree.child.forEach((obj) => {
      if (holdName(name, obj)) {
        age = holdName(name, obj)
        return age
      }
    });
  }
  return age
}

console.log(holdName('a', tree))
console.log(holdName('c', tree))
console.log(holdName('d', tree))
console.log(holdName('f', tree))
