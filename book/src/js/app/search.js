require(['jquery', 'renderHeader', 'storage', 'render', 'text!searchTpl', 'lazy'], function($, renderHeader, storage, render, searchTpl, lazy) {
    renderHeader({ isSearch: true });

    var searchHistory = storage.get('history') || [];

    // render(searchHistory, $("#tag-tpl"), $(".type-tags"), true);

    $("body").append(searchTpl);

    var _searchList = $(".search-list");

    //请求热门搜索关键字

    var arr = [];

    $.ajax({
        url: '/api/searchKey',
        dataType: 'json',
        success: function(res) {
            res.ads.forEach(function(item, index) {
                arr.push(item.ad_name)
            })

            var concatArr = searchHistory.concat(arr);
            var targetArr = unique3(concatArr);


            render(targetArr, $("#tag-tpl"), $(".type-tags"), true);
        },
        error: function(error) {
            console.warn(error);
        }
    })

    function unique3(target) {
        var res = [];
        var json = {};
        for (var i = 0; i < target.length; i++) {
            if (!json[target[i]]) {
                res.push(target[i]);
                json[target[i]] = 1;
            }

            // !json['诛仙']
            // res.push('诛仙')
            // json['诛仙'] = 1

            // json = { '诛仙':1}
        }
        return res;
    }

    $(".search-btn").on("click", function() {
        var val = $(".ipt").val();
        $(".type-tags").hide();
        _searchList.show();
        if (!val) {
            _searchList.html("<p>输入内容为空</p>")
        } else {
            search(val);

            var searchHistory = storage.get('history') || [];

            if (searchHistory.indexOf(val) == -1) {
                searchHistory.push(val);
                storage.set("history", searchHistory);
            }
        }
    })



    function search(val) {
        $.ajax({
            url: '/api/search',
            dataType: 'json',
            data: {
                key: val
            },
            success: function(res) {
                console.log(res)
                if (!res) {
                    _searchList.html("<p>暂无搜索内容</p>")
                } else {
                    _searchList.html(" ")
                    render(res.items, $("#search-template"), _searchList);
                    $("img[data-original]").lazyload({
                        effect: "fadeIn",
                        threshold: 200,
                        container: $(".inner-content")
                    })
                }
            },
            error: function(error) {
                console.warn(error)
            }
        })
    }

    //input input事件
    $(".ipt").on("input", function() {
        var val = $(this).val();

        if (!val) {
            $(".type-tags").show();
            _searchList.hide();
            _searchList.html(" ");
            var searchHistory = storage.get('history');
            var target = searchHistory.concat(arr);
            render(target, $("#tag-tpl"), $(".type-tags"), true);
        }
    })

    //点击tags
    $(".type-tags").on("click", "li", function() {
        var key = $(this).text();
        search(key);
        $(".ipt").val(key);
        $(".type-tags").hide();
        _searchList.show();
    })

})