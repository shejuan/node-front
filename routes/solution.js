/* 
    开发内容：解决方案模块的接口
    开发人员：jane
*/
var express = require('express');
var router = express.Router();
var db = require('../service/db');
var result = {
    'status': '200',
    'message': 'success',
}
router.get('/get/solution', async function (req, res, next) {
    // 获取用户传递的参数
    var id = JSON.parse(req.query.data).solution_id
    db.query('select * from s_solution where solution_id = ' + id, function (err, rows, fields) {
        if (err) { }
        result.data = rows[0]
        res.json(result)
    })
})

module.exports = router