This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## create-react-app

npx create-react-app react-demo —typescript
  默认情况下，生成的项目支持所有现代浏览器。对Internet Explorer 9、10和11的支持需要polyfill。
通过npm run eject   ， 暴露webpack配置
学习网站：https://create-react-app.dev/docs/getting-started


### 安装其他库

1、路由
react-router：提供了一些router的核心api，包括Router, Route, Switch等，但是它没有提供dom操作进行跳转的api。
react-router-dom：提供了HashRouter、BrowserRouter, Route, Link等api ,我们可以通过dom的事件控制路由

2、HTTP
axios：Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。
proxy：参照create-react-app官网推荐库——http-proxy-middleware

3、UI
Ant-design：服务于企业级产品的设计体系
sass: npm install node-sass --save(因为新版本已经集成了 sass 的处理了，因此，就不需要额外的配置有关 sass 的内容了。但是，如果需要在项目中使用 sass 的话，还是需要安装依赖包的。)

4、状态管理
redux：数据处理中心
react-redux：连接组件和数据中心，也就是把React和Redux联系起来
redux-thunk、redux-saga：用来做异步操作


### 启动

localhost:3000

## 其他

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
