(function(require){
    var LIBRARY = '/dist/lib/';
    var PAGES = '/dist/js/pages/';
    var COMMON = '/dist/js/';
    var PLUGINS = '/dist/plugins/';
    require.config({
        paths: {
            jquery: LIBRARY + 'jquery.min',
            api: COMMON + 'api',
            lodash: LIBRARY + 'lodash.min',
            knockout: LIBRARY + 'knockout',
            validate: LIBRARY + 'validate',
            tabs: PLUGINS + 'tabs/jquery.tabs',
            lazyload: PLUGINS + 'tabs/jquery.lazyload',
            serialize: LIBRARY + 'form-serialize',
            validate: LIBRARY + 'validate',
            polyfill: LIBRARY + 'browser-polyfill',
            toast: LIBRARY + 'jquery.toast.min',
            public: COMMON + 'public'
        },
        map: {
            '*': {
                css: '/dist/lib/css.min.js'
            }
        },
        shim: {
            api: ['jquery'],
            tabs: ['jquery'],
            lazyload: ['jquery'],
            api: ['jquery', 'lodash'],
            validate: ['lodash'],
            toast: ['jquery','css!'+LIBRARY+'jquery.toast.min.css']
        }
    })
})(require);
