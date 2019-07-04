var express = require('express');
var app = express();
var mysql = require('mysql');

/*连接数据库
var connection = mysql.createConnection({
    host:'数据库地址',
    user:'数据库账号',
    password:'数据库密码',
    database:'数据库名'
})
*/
var connection = mysql.createConnection({
    host: '数据库地址',
    user: '数据库账号',
    password: '数据库密码',
    database: '数据库名'
})
connection.connect();

/* 设置跨域访问*/
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
var result = {
    "status": "200",
    "message": "success",
}
connection.query('select * from websites', function (err, rows, fields) {
    if (err) throw err;
    return result.data = rows;
});
connection.end();
//写个接口123
app.get('/123', function (req, res) {
    res.status(200),
        res.json(result)
});
//配置服务端口
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
})