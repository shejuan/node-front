/* 
    开发内容：首页模块的接口
    开发人员：jane
*/

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
/*连接数据库 并创建连接
var connection = mysql.createConnection({
    host:'数据库地址',
    user:'数据库账号',
    password:'数据库密码',
    database:'数据库名'
})
*/
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'pc-node'
})
connection.connect();

/* 设置跨域访问*/
router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    // res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
var result = {
    "status": "200",
    "message": "success",
}

var list = {

}
connection.query('select * from h_img_wheel', function (err, rows, fields) {
    if (err) {}
    console.log(err,rows)
    return list.wheel =rows;
});

connection.query('select * from h_img_meter', function (err, rows, fields) {
    if (err) {}
    console.log(err,rows)
    return list.meter =rows;
});

var object ={}
connection.query('select * from h_img_power', function (err, rows, fields) {
    if (err) {}
    console.log(err,rows)
    /* 键值对的形式  {'11':'one','22':'two'}*/
    for(var i = 0;i<rows.length;i++){
        if(object[rows[i].power_no]){
            object[rows[i].power_no].push(deleteparam(rows[i]))
        }else{
            object[rows[i].power_no]=[]
            object[rows[i].power_no].push(deleteparam(rows[i]))
        }
    }

    /* map格式 [{key:'11',value:'one'},{key:'22',value:'two'}]*/
    var res = []
    Object.keys(object).forEach((key) => {
        res.push({
            name: String(key),
            children: object[key]
        })
    })
    return list.power = res;
});
function deleteparam(obj){
    delete obj.power_no
    delete obj.power_id
    return obj
}
connection.end(); 
/* ---------------------------------------------------------------------- */
/*
    1.处理页面加载的get请求
    paramas={
        id:1
    }
    2.响应的时候返回数组
    data = {
        imgList：[{url:'',name:''}]
    }
*/

router.get('/get/shouyeImg', function (req, res, next) {
    // 获取用户传递的参数
    var id = req.body.id
    res.status(200)
    result.data = list
    res.json(result)
    console.log(req.query, '---id---')
    // 对传递的参数进行处理，比如在数据库中进行查找
    // 返回数据
})

module.exports = router