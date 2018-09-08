require.config({
    baseUrl: '/js/',
    paths: {
        //库文件
        'jquery': 'libs/jquery-2.1.1.min',
        'swiper': 'libs/swiper-4.1.6.min',
        'bscroll': 'libs/bscroll',
        'handlebars': 'libs/handlebars-v4.0.11',
        'text': 'libs/text',
        'base64': 'libs/jquery.base64',
        'jsonp': 'libs/jquery.jsonp',
        'lazy': 'libs/jquery.lazyload',
        //common
        'render': 'common/render',
        'GetSlideDirection': 'common/slider-common',
        'storage': 'common/storage',
        'getReq': 'common/getRequest',
        "pxTorem": "common/pxTorem",

        //app
        'index': 'app/index',
        'login': "app/login",
        'hotel': "app/hotel",
        'details': "app/details",
        //模板
        "header": "../page/tpl/header.html",
        "slideShow": "../page/tpl/slideShow.html",
        "show": "../page/tpl/show.html"
    },
    shim: {
        'base64': {
            deps: ['jquery']
        }
    }
})