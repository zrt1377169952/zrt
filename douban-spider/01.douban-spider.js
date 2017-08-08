/**
 * Created by dllo on 17/8/8.
 */
var cheerio = require('cheerio');
var request = require('request');
var download = require('./download');
var options = {
    url: 'https://www.douban.com/',
    headers: {
        'Host': 'www.douban.com',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36'
    }
};
request.get(options, function (error, response, body) {
    console.log(body);
    var $ = cheerio.load(body);
    //遍历新书快递部分
    var book = [];
    $('#anony-book>.wrapper>.main>.mod>.book-list>ul>li>.pic>a>img').each(function (index,element) {
        // console.log($(element).attr('data-origin'))
        var item = {
            src :$(element).attr('data-origin')
        }
        download($(element).attr('data-origin'),'douBan','book'+index+'.jpg');
        book.push(item)
        console.log($(element).attr('data-origin'))
    })


    $('#anony-book>.wrapper>.main>.mod>.book-list>ul>li>.title>a').each(function (index,element) {
        // console.log($(element).attr('data-origin'))


        book[index].title = $(element).text();
        console.log($(element).attr('data-origin'))
    })

    console.log(book)


    //正在热映
    var play = [];
    $('.main .movie-list ul li .pic  a img').each(function (index,element){
        var thePlay = {img:$(element).attr('data-origin')};
        play.push(thePlay)
        download($(element).attr('data-origin'),'douBan','reYing'+index+'.jpg');
    });

    $('.main .movie-list ul li .title  a').each(function (index,element){
        play[index].title = $(element).text();
    });

    $('.main .movie-list ul li .rating  i').each(function (index,element){
        play[index].score = $(element).text();
    });

    //热门小组
    var groupArr = [];
    $(".main .group-list ul li .pic a img").each(function (index,element){
        var theGroup = {img:$(element).attr('data-origin')};
        groupArr.push(theGroup)
        download($(element).attr('data-origin'),'douBan','xiaozu'+index+'.jpg');
    });

    $('.main .group-list ul li .info .title a').each(function (index,element){
        groupArr[index].title = $(element).text();
    });

    $('.main .group-list ul li .info').each(function (index,element){
        groupArr[index].number = $(element).text();
    });




    //遍历音乐部分

    //豆瓣新碟榜
    var itemsMusic = [];
    $('#anony-music>.wrapper>.main>.album-list>ul>li>.pic>a>img').each(function (index,element) {
        // console.log($(element).attr('data-origin'))
        var item = {
            src :$(element).attr('data-origin')
        }
        download($(element).attr('data-origin'),'douBan','music'+index+'.jpg')
        itemsMusic.push(item)
    })
    $('#anony-music>.wrapper>.main>.album-list>ul>li>.title>a').each(function (index,element) {
        // console.log($(element).text())

        itemsMusic[index].title = $(element).text()

    })

    $('#anony-music>.wrapper>.main>.album-list>ul>li>.rating>i').each(function (index,element) {
        // console.log($(element).text())
        // var item = {
        //     rating :$(element).attr('data-origin')
        // }
        itemsMusic[index].rating = $(element).text()
    })

    //热门歌单

    var itemsHotMusic = [];
    $('#anony-music>.wrapper>.main>.programme-list>ul>li>.pic>img').each(function (index,element) {

        var item = {
            src :$(element).attr('src')
        }
        itemsHotMusic.push(item)
    })

    $('#anony-music>.wrapper>.main>.programme-list>ul>li>.title').each(function (index,element) {

        itemsHotMusic[index].title1 = $(element).text()

    })





    // console.log(itemsMusic)
    // console.log(itemsHotMusic)
});