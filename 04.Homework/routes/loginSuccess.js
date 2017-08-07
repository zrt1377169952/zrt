var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var handleError = require('../public/javascripts/handlerError');
var options = {
    connectionLimit : 3,
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '111111',
    database:'NewB'
};

router.get('/',function (req,res) {
     var username=req.query['userName'];   
     var password=req.query['passWord'];   

    
    var pool=mysql.createPool(options);
    var selectU=`select * from user where username='${username}'`;
    pool.query(selectU,function (err,result) {
        if(!handleError('查询',err)) return;

         if(result.length!==0){
            if(password===result[0]['password']){
                  res.send('登录成功');
            }
            else {
                res.send('密码错误');
            }

         }
         else {
             res.send('用户名不存在哦');
         }

    })

});
module.exports=router;

