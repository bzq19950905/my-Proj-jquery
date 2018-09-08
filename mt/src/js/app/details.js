require(['jquery', 'pxTorem', 'render', 'storage', 'swiper', 'bscroll', 'getReq'], function($, pxTorem, render, storage, swiper, bscroll, getReq) {
    // var url = location.search;
    // var obj = {};
    // if (url.indexOf('?') != -1) {
    //     url = url.substr(1);
    //     var arr = url.split("&");
    //     arr.forEach(function(item, index) {
    //         var objArr = item.split("=");
    //         obj[objArr[0]] = objArr[1];
    //     })
    // }
    // console.log(obj);
    var id = getReq().id
    $.ajax({
            url: '/details',
            dataType: "json",
            data: {
                id: id
            },
            success: function(res) {
                //调用函数渲染数据
                dataHandle(res)
            },
            error: function(error) {
                console.log(error);
            }
        })
        //函数
    function dataHandle(data) {

        Image(data, $('.top_img'))
    }
    //渲染图片
    function Image(data, classTo) {

        var img = ` <img src="${data[0].img}" alt="">`
        classTo.append(img)
    }
})