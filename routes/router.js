var router = require('express').Router();
var users = []
// 用户对首页的
// 定义一个get 请求, function返回的是一个回调函数的三个参数
// router.get('/',function(req,res,next){
//     res.send('hellod word')   // 返回给用户的参数
// })

// 处理请求
router.post('/register',function(req,res,next){
    // 获取用户输入的数据
    var userName = req.body.userName
    var password = req.body.password
    var qq = req.body.qq;
    // 对数据进行处理
    var userObj = {
        userName:userName,
        password:password,
        qq:qq
    }
    // 注册逻辑  
    /*
    if(如果用户已经注册过了){
        返回，请更换注册名
    }else{
        真的进行注册
        返回到首页去登陆
    }
    */
   var userLocal = findusers(userObj);
   if(userLocal === null){
    // 真的进行注册
    users.push(userObj)  // 注册用户收到数据集合中
    // 返回到，首页去登陆
    res.redirect('/');// 跳转到首页去
   }else{
    // 返回，请更换注册名
    res.send('请更换注册名,重新注册')
   }

    // 返回数据
})

// 封装公共的方法
function findusers(userObj){
    var result = null;  // 初始化的
    for(var i=0;i<users.length;i++){
        var objTemp = users[i];
        if(objTemp.userName === userObj.userName){
            // 找到了已经注册过得用户
            result = objTemp
            break;
        }
    }
    return result;
}


module.exports = router