require(['jquery', 'pxTorem', 'text!header', 'render', 'storage'], function($, pxTorem, header, render, storage) {
    $('body').append(header)
    render({ isSearch: false }, $('#header-tpl'), $('.header'))
        //点击提交
    $('#submit').on('click', function() {
        $.ajax({
            url: "/login",
            dataType: 'json',
            type: 'post',
            data: {
                name: $('#name').val(),
                pwd: $('#pwd').val()
            },
            success: function(res) {
                if (res.code == 1) {
                    console.log(res)
                    alert(res.msg)
                    location.href = "../../index.html"
                    storage.set('uid', JSON.stringify(res.login))

                } else if (res.code == 2) {
                    alert(res.msg)
                }
            },
            error: function(error) {
                console.warn(error)
            }
        })
    })
    $("#rollBack").on('click', function() {
        history.go(-1);
    })
})