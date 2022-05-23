1、通过babel-preset-react-app语法解析包把jsx转为createElement格式
    babeljs.cn 网站了解
    =>createElement(type, props, ...children)
2、执行createElement后，返回json对象，对象包含标签类型、属性等

3、基于React-Dom中render方法，把生成的json对象生成真实的DOM渲染到页面中
