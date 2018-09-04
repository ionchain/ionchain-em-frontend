(function(require){
    var LIBRARY = '/dist/lib/';
    var PAGES = '/dist/customerjs/pages/';
    var COMMON = '/dist/customerjs/';
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
            common: COMMON + 'common',
            moment: LIBRARY + 'moment',
            preventRobot: PLUGINS + 'prevent-robot/jigsaw',
            layer: PLUGINS + 'layer/layer'
        },
        map: {
            '*': {
                css: '/dist/lib/css.min.js'
            }
        },
        shim: {
            layer: ['css!' +  PLUGINS + 'layer/theme/default/layer.css'],
            api: ['jquery'],
            tabs: ['jquery'],
            lazyload: ['jquery'],
            api: ['jquery', 'lodash'],
            validate: ['lodash'],
            toast: ['jquery','css!'+LIBRARY+'jquery.toast.min.css'],
            preventRobot: ['css!'+ PLUGINS + 'prevent-robot/jigsaw.css']
        }
    })
})(require);
