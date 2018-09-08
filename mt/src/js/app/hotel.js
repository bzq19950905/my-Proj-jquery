require(['jquery', 'pxTorem', 'text!slideShow', 'render', 'storage', 'swiper', 'bscroll'], function($, pxTorem, slideShow, render, storage, swiper, bscroll) {
    $('body').append(slideShow);
    init()

    function init() {
        //轮播图数据
        $.ajax({
            url: "/api/hotel",
            dataType: "json",
            success: function(res) {
                render(res.slideShow, $("#slideShow-tpl"), $("#slideShow_To"))

                //实例化录播图
                var myswiper = new swiper(".slideShow", {
                        autoplay: true,
                        loop: true,
                        pagination: {
                            el: ".swiper-pagination"
                        }
                    })
                    //渲染数据城市数据
                render(res.city, $("#city-tpl"), $(".mask_city"))
                render(res.city, $("#city-tpl-right"), $(".mask_right"));

                BScroll.refresh()
            },
            error: function(error) {
                console.warn(error)
            }
        })

    }
    //实例化BScroll
    var BScroll = new bscroll(".mask_section", {
            scrollbar: true,
            click: true,
            porbeType: 2
        })
        //点击right右侧
    $(".mask_right").on('click', 'li', function() {
            var index = $(this).index();
            BScroll.scrollToElement($('.mask_city>li').eq(index)[0])
        })
        //点击切换线
    $('.tab_left').on('click', function() {

        $(".list").css("left", "0%")
    })
    $('.tab_right').on('click', function() {

            $(".list").css("left", "50%")
        })
        //点击选择城市
    $("#city").on('click', function() {
            $('.mask').css("transform", "translateY(0%)");
        })
        //点击退出
    $("#rollBack").on('click', function() {
            $('.mask').css("transform", "translateY(100%)");
        })
        //点击城市 选取城市
    $('.mask_city').on('click', 'ul>li', function() {
            var val = $.trim($(this).html())
            $('#city').html(val);
            $('.mask').css("transform", "translateY(100%)");
        })
        //跳转详情页



})