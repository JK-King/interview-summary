toType.js

1、typeof 可以用来校验以下数据类型: number boolean string undefined function Symbol
          其他数据类型返回都是 object
          缺点：不准确，只能校验基本类型(null除外)
2、instanceof 用来校验 A 是否是 B的实例，是从原型链上进行查找的
          数组 即是 Array的实例，也是Object的实例
          缺点：可以人为的随便改变原型链上的指向，不准确
3、constructor 实例的构造函数
          array.constructor === Arrray
          缺点：可以人为的改变constructor，不准确
4、Object.prototype.toString.call(obj) 可以校验所有的类型，返回[object Array]格式
