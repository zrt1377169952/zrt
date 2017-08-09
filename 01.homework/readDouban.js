/**
 * Created by dllo on 17/8/9.
 */
var fs=require('fs');
var download=require('./download');
fs.readFile('./images.json','utf-8',function (err,data) {
    var array=data.split(',');
    array.forEach(function (item,index) {
        console.log(item);
        download(item,'images',index+'.jpg');
    })
});