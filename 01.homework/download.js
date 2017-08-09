/**
 * Created by dllo on 17/8/8.
 */

var path = require('path');
var fs = require('fs');
var request = require('request');

function download(url,directory,filename) {
    //根据当前目录生成文件目录
    var dir = path.join(__dirname,directory);
    //判断是否存在
    var isDir = fs.existsSync(dir);
    //不存在 创建
    if(!isDir){
        fs.mkdir(dir);
    }
    //生成 保存 文件路径
    var filepath = path.join(__dirname,directory,filename);
    //下载并且保存
    request(url).pipe(fs.createWriteStream(filepath))
}
module.exports = download;