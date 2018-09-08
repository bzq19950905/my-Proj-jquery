require(['jquery', 'render', 'storage', 'getReq', 'base64', 'jsonp'], function($, render, storage, getReq, base64, jsonp) {

    var _articalCon = $(".artical-con"),
        _curChapter = $(".cur-chapter");

    var fiction_id = getReq().fiction_id,
        islight = true,
        nightBg = '#0f1410',
        chooseBg = storage.get("bg") || '#f7eee5',
        chapter_id = storage.get("chapter_id") || 1;

    _curChapter.html(chapter_id);

    if (storage.get("tag") && storage.get("tag") != '黑夜') {
        islight = false;
    }

    if (islight) {
        _articalCon.css("background", chooseBg);
    } else {
        _articalCon.css("background", nightBg);
    }

    _articalCon.show();

    //请求章节数
    $.ajax({
        url: '/api/chapter',
        dataType: 'json',
        data: {
            fiction_id: fiction_id
        },
        success: function(res) {
            $(".total-chapter").html(res.item.toc.length);
        },
        error: function(error) {
            console.warn(error)
        }
    })

    getArtical();

    //请求当前章节内容
    function getArtical() {
        $.ajax({
            url: '/api/artical',
            dataType: 'json',
            data: {
                fiction_id: fiction_id,
                chapter_id: chapter_id
            },
            success: function(res) {
                console.log(res);
                jsonp({
                    url: res.jsonp,
                    callback: 'duokan_fiction_chapter',
                    cache: true,
                    success: function(data) {
                        var str = $.base64.atob(data, true);
                        var artical = JSON.parse(str);
                        console.log(artical);
                        render(artical, $("#artical"), $(".artical-con"), true)
                    }
                })
            },
            error: function(error) {
                console.warn(error);
            }
        })
    }

    //点击上一章
    $(".pre-btn").on("click", function() {
        if (chapter_id > 1) {
            chapter_id -= 1;
            getArtical();
            _curChapter.html(chapter_id);
            storage.set("chapter_id", chapter_id);
        } else {
            alert("没有上一章");
        }
    })

    //点击下一章
    $(".next-btn").on("click", function() {
        if (chapter_id < 4) {
            chapter_id += 1;
            getArtical();
            _curChapter.html(chapter_id);
            storage.set("chapter_id", chapter_id);
        } else {
            alert("没有下一章")
        }
    })

    //点击内容
    _articalCon.on("click", function() {
        $(".set-wrap").show();
    })

    //点击mask

    $(".mask").on("click", function() {
        $(".set-wrap").hide();
        $(".set-panel").hide();
        $(".size").removeClass("active");
    })

    //点击返回
    $(".icon-circle-back").on("click", function() {
        history.go(-1);
    })

    //点击目录
    $(".chapter-btn").on("click", function() {
        window.location.href = "../../page/chapter-list.html?fiction_id=" + fiction_id + "&chapter_id=" + chapter_id
    })

    //点击字体

    $(".size").on("click", function() {
        $(".set-panel").toggle();
        $(this).toggleClass("active");
    })

    //点击day

    $(".day").on("click", function() {
        $(this).toggleClass("light");
        if (islight) {
            $(this).find("dd").text("白天");
            _articalCon.css("background", nightBg);
        } else {
            $(this).find("dd").text("黑夜");
            _articalCon.css("background", chooseBg);
        }

        islight = !islight;
        var tag = islight ? '黑夜' : '白天';
        storage.set("tag", tag)
    })

    //点击大

    var initSize = storage.get('fz') || 14, //初始的字体
        maxSize = 28, //最大字体
        minSize = 12; //最小字体

    $(".artical-con p").css("font-size", initSize / 37.5 + 'rem');


    //点击大按钮
    $(".large-btn").on("click", function() {
        if (initSize < maxSize) {
            initSize += 2;
            storage.set('fz', initSize);
        }
        $(".artical-con p").css("font-size", initSize / 37.5 + 'rem');
    })

    //点击小按钮

    $(".small-btn").on("click", function() {
        if (initSize > minSize) {
            initSize -= 2;
            storage.set('fz', initSize);
        }
        $(".artical-con p").css("font-size", initSize / 37.5 + 'rem');
    })

    //切换背景

    $(".set-bg-btns").on("click", "li", function() {
        $(this).addClass("active").siblings().removeClass("active");
        chooseBg = $(this).attr("bg-color");
        storage.set("bg", chooseBg);
        if (islight) {
            _articalCon.css("background", chooseBg);
        }
    })


})