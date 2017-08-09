var webpage = require('webpage');
var page = webpage.create();
var fs = require('fs');
phantom.outputEncodings = 'utf-8';
page.open('https://www.douban.com/', function (status) {
    if (status === 'success') {
        console.log('加载成功');
        page.includeJs("https://unpkg.com/jquery@3.2.1/dist/jquery.js", function () {
            setTimeout(function () {
                var array = page.evaluate(function () {
                    var arr=[];
                    $('#anony-video>.wrapper>.main>.video-rushi>li>.video-cover>a').each(function (index,element) {
                            var a=$(element).css('background-image').replace('url(','').replace(')','');
                            arr.push(a);
                    });
                    $('#anony-video>.wrapper>.main>.video-banzui>li>.video-cover>a').each(function (index,element) {
                        var b=$(element).css('background-image').replace('url(','').replace(')','');
                        arr.push(b);
                    });
                    return arr;
                });

                fs.write('./images.json', array);
                phantom.exit(0);

            }, 5000)

        })
    } else {
        console.log('加载失败');
        phantom.exit(0)
    }
});