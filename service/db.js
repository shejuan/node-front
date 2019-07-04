var mysql = require('mysql');

/*连接数据库 并创建连接信息
var connection = mysql.createConnection({
    host:'数据库地址',
    user:'数据库账号',
    password:'数据库密码',
    database:'数据库名',
    port:'3306',// 端口，可不填，默认是3306
    userConnectionPooling:true   // 使用连接池
})
*/
var mysql = require('mysql');
// 创建一个数据库连接池
var pool = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'pc-node'
});
// SELECT * FROM users
// 让我们的方法支持两种模式
// 一种是只传入SQL语句和回调函数
// 一种是传入SQL语句、参数数据、回调函数
exports.query = function (sql, P, C) {
    console.log(sql, P, C,'**********************')
    var params = [];
    var callback;
    // 如果用户传入了两个参数，就是SQL和callback
    if (arguments.length == 2 && typeof arguments[1] == 'function') {
        callback = P;
    } else if (arguments.length == 3 && Array.isArray(arguments[1]) && typeof arguments[2] == 'function') {
        params = P;
        callback = C;
    } else {
        throw new Error('对不起，参数个数不匹配或者参数类型错误');
    }
    // 如果用户传入了三个参数，那么就是SQL和参数数组、回调函数
    // 从池子里面拿一个可以使用的连接
    pool.getConnection(function (err, connection) {
        // Use the connection
        connection.query(sql, params, function () {
            // 使用完毕之后，将该连接释放回连接池
            connection.release();
            callback.apply(null, arguments);
        });
    });
};