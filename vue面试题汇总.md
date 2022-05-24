## vue2和vue3响应式数据的理解
- vue2中采用了defineProperty将数据处理成响应式的，需要递归处理对象属性的getter和setter方法，动态添加的属性无法进行响应式。
  vue2中对数组的响应式处理，是通过修改数组原型上的7个方法实现的(push、pop、unshift、shift、splice、sort、reverse)，不能对索引和长度进行监听处理
- vue3中采用了proxy直接对对象和数组进行了拦截，不用递归处理对象属性的getter和setter方法，性能高，也能处理动态添加的属性。
  不用重写数组的方法，也可以对数组的长度和索引进行监听处理
- 对vue2的优化：
  1、减少对象的层级
  2、不需要响应式的数据不要放到data中，或者不需要改变的数据使用Object.freeze进行处理
  3、不要连续多次对一个属性get、set，尽量对get缓存，set最后的结果，例如：for循环中this.xxx

## nextTick在哪里使用？原理是？
- 一般在页面渲染完成后，做其他操作时使用
  this.nextTick(fn) nextTick执行是同步的，fn会存放当callback异步队列中
- nextTick会把操作逻辑暂存到异步队列中，等同步代码执行完成后，依次执行异步队列中的异步操作
- 内部实现原理：采用顺序 promise -> mutationObserver -> setImmediate -> setTimeout


## computed和watch的区别
- computed和watch都是基于watcher实现的
- computed数据能用于页面渲染，只有取值时才会执行对应的方法，用dirty属性实现了缓存机制。
- watch只是监听数据的变化，可以用于根据数据变化进行不同的操作。

## Vue.set方法是如何实现的？
- 针对通过索引更改数组使用splice方法，进行数据的操作
- 针对对象使用defineReactive方法中的defineProperty，手动监听新增属性的get和set

## diff算法
- diff算法是采用同级比较，深度优先策略比较新旧虚拟dom，取出需要更新的虚拟dom批量重新渲染到页面上
- vue2中的diff算法是采用：头头、尾尾、头尾、尾头的比较方式，时间复杂度O(n)
  静态标签：对虚拟dom增加静态标签标识，不随着数据变化进行更新的标签；
- vue3中diff算法做了优化，
  静态提升：不参与更新的元素只创建一次，之后就复用。
  事件缓存：对事件使用缓存策略，不需要每次都重新生成事件，可当多静态标签使用
  新旧虚拟dom对比采用：头头、尾尾、最长递增子序列优化对比
  [a,b,c,d,e,f,g]和[a,b,f,c,d,e,h,g]比较：
  - 头头比较，发现不同的后结束比较，[a,b]
  - 尾尾比较，发现不同的后结束比较，[g]
  - 把剩下的没有比较过的[f,c,d,e,h]，通过方法newIndexToOldIndexMap生成新dom在就dom中的下标[5,2,3,4,-1],
    -1是旧dom数组中没有的dom，说明需要新增
  - 然后再拿到最长递增子序列 [2,3,4] 对应的节点 [c,d,e],然后把其余dom基于 [c,d,e]的位置进行移动、删除、新增操作


# 按需引入实现原理
- 是通过babel-plugin-import 转换组件的引入路径
  - 类似 import {Button} from 'antd' -> import Button form 'antd/lib/Button'
- 组件库必须支持按需引入才行。

# import和require的区别
- require，exports/module.exports 是属于CommonJS规范，nodejs中常用
- import，export/export default 是属于ES6规范
- require是运行时执行，所以支持动态导入和动态匹配路径
- import是编译时执行，不支持动态导入和动态匹配路径

# 事件循环机制，宏任务和微任务有哪些
- 先执行宏任务，一个宏任务执行完后，查看微任务队列中是否有微任务需要执行，
  - 有，就执行微任务，队列中的微任务执行完成后，再执行下一个宏任务，
  - 没有，就继续执行下一个宏任务

- 宏任务
  - script 整体同步代码
  - setTimeout
  - setInterval
  - setImmediate
  - I/O操作
  - UI渲染
- 微任务
  - process.nextTick
  - Promise，async，await
  - MutationObserver

# script标签的defer和async
- defer和async都是进行异步处理脚本，都会在load之前执行
- 多个使用defer的脚本，是按照顺序执行；而async是不能保证顺序的
- 使用defer的脚本，如果在html解析完成后，脚本还没有下载完成，不会触发DomContentLoaded方法
- async不能保证和DomContentLoaded的顺序
