require(['jquery', 'pxTorem', 'text!header', 'render', 'storage', 'swiper', 'bscroll', "text!show"], function($, pxTorem, header, render, storage, swiper, bscroll, show) {
        //页面刚进去时将储存值删掉
        // if (sessionStorage.getItem('history.length') != history.length) {
        //     sessionStorage.setItem('history.length', history.length);
        // } else {
        //     storage.remove('uid')
        // }
        $('body').append(header)
        $('body').append(show)
            //判断有没有uid的值
        if (storage.get('uid')) {
            $('.section_nav').css('display', 'block')
        }

        render({ isSearch: true }, $('#header-tpl'), $('.header'))

        // 渲染导航条数据
        $.ajax({
                url: "/api/index",
                dataType: "json",
                success: function(res) {
                    handleHtml(res.one, $('#html_1'))
                    handleHtml(res.two, $('#html_2'))
                },
                error(error) {
                    console.warn(error);
                }
            })
            //获取show数据
        showHandle()

        function showHandle() {
            $.ajax({
                url: "/api/show",
                dataType: "json",
                success: function(res) {
                    render(res, $('#show-tpl'), $('#handle-show-tpl'))
                },
                error: function(error) {
                    console.warn(error)
                }
            })
        }
        //滑块

        var mySwiper_nav = new swiper(".section_nav", {
                pagination: {
                    el: ".swiper-pagination"
                }
            })
            //bscroll

        var scroll_index = new bscroll(".section", {
                scrollbar: true,
                probeType: 2,
                click: true
            })
            //上拉加载下拉刷新
        scroll_index.on('scroll', function() {
            //上拉
            if (this.y < this.maxScrollY - 50) {
                $('.BScroll_bottom').html("释放加载")
            } else if (this.y < this.maxScroll - 30) {
                $('.BScroll_bottom').html("上拉加载...")
            }
            //下拉
            if (this.y > 50) {
                $('.BScroll_top').html("释放刷新")
            } else if (this.y > 30) {
                $('.BScroll_top').html("下拉刷新")
            }
        })
        scroll_index.on('scrollEnd', function() {
            $('.BScroll_bottom').html("上拉加载...")

            $('.BScroll_top').html("下拉刷新")
        })
        scroll_index.on('touchEnd', function() {
            if ($('.BScroll_bottom').html() === '释放加载') {
                showHandle();
                scroll_index.refresh();
            }

            if ($('.BScroll_top').html() === '释放刷新') {
                //刷新页面
                window.location.reload();
            }
        })
    })
    //函数
function handleHtml(data, toId) {
    var html = '';
    $.each(data, function(i, v) {
        html += `
        <a href="${v.href}">
        <b style="background:${v.color}">
        <i class="icon iconfont icon-${v.icon}"></i>
     </b>
        <em>
         ${v.h1}
     </em>
    </a>
        `
    })
    toId.append(html);

}