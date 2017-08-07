var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var handleError = require('../public/javascripts/handlerError');
var options = {
    connectionLimit: 3,
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'NewB'
};
router.get('/', function (req, res, next) {
    var username = req.query['userName'];
    var password1 = req.query['passWord1'];
    var password2 = req.query['passWord2'];


    // console.log(username);
    // console.log(password1);
    // console.log(password2);
    var pool = mysql.createPool(options);
    var select = `select * from user where username='${username}'`;
    pool.query(select, function (err, results) {
        if (!handleError('查询', err)) return;
        if (results.length !== 0) {
            if (password1 === results[0]['password']) {
                var insert = `update user set password='${password2}' where username ='${username}'`;
                pool.query(insert,function (err) {
                    if(handleError('修改',err)){
                        res.send("修改成功");
                    }
                })


            }
            else {
                res.send('密码错误,不能修改');
            }

        }
        else {
            res.send('用户名不存在哦');
        }


    })


});

module.exports = router;