const webpack = require('webpack');
const express = require('express');
const bodyParser = require('body-parser');
const webpackDevMiddleware = require('webpack-dev-middleware');

// --- node-server set-start ---
const app = express();
const port = '8066';
const hostName = 'localhost';

// 添加 body-parser 中间件，解析 post 请求的 json 参数
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// 跨域设置
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header('X-Powered-By', '3.2.1');
  res.header('Content-Type', 'application/json;charset=UTF-8');
  next();
});
// node-server listening
app.listen(port, hostName, () => {
  console.log(`服务器运行在 http://${hostName}:${port}\n`);
})
// --- node-server set-end ---

// ++++++ webpack-middleware set-start ++++++
const config = require('./webpack.config.dev.js'); // webpack 配置文件的路径
const compiler = webpack(config);
const API = require('./mock/api.js'); // 本地 mock 数据

// webpack web-server 启动本地服务
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath // webpack-dev-middleware 的配置选项
}));

// 像往常一样请求：mock api
app.get('/webpackMiddleware/abc', API.getAbc);
app.post('/webpackMiddleware/bcd', API.postBcd);
// more request ...

// ++++++ webpack-middleware set-end ++++++
