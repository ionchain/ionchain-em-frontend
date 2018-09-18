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
            layer: PLUGINS + 'layer/layer',
            progress: PLUGINS + 'progress/schedule',
            // tooltip: PLUGINS + 'tooltip.js/index',
            // popper: PLUGINS + 'popper'
            csPopUp: PLUGINS + 'jquery.csPopUp',
            easing: PLUGINS + 'jquery.easing.1.3',
            superSlide: 'plugins/jquery.SuperSlide.2.1.1.source',
            knob: '/plugins/jquery.knob.min',
            circleChart: '/plugins/circleChart.es5.min',
            radialIndicator: '/plugins/radialIndicator',
            echarts: '/plugins/echarts.simple.min',
            selection: '/plugins/selection/jquery.dd',
            fileupload_ui_widget: '/plugins/jquery.fileupload/jquery.ui.widget',
            fileupload_iframe_transport: '/plugins/jquery.fileupload/jquery.iframe-transport',
            jquery_fileupload: '/plugins/jquery.fileupload/jquery.fileupload'
        },
        map: {
            '*': {
                css: '/dist/lib/css.min.js'
            }
        },
        shim: {
            jquery_fileupload: ['fileupload_iframe_transport','fileupload_ui_widget'],
            circleChart: ['jquery'],
            knob: ['jquery'],
            superSlide: ['jquery'],
            progress: ['css!' + PLUGINS + 'progress/schedule.css'],
            // tooltip: ['popper'],
            easing: ['jquery'],
            csPopUp: ['jquery', 'easing'],
            layer: ['css!' +  PLUGINS + 'layer/theme/default/layer.css'],
            api: ['jquery'],
            tabs: ['jquery'],
            lazyload: ['jquery'],
            api: ['jquery', 'lodash'],
            validate: ['lodash'],
            toast: ['jquery','css!'+LIBRARY+'jquery.toast.min.css'],
            preventRobot: ['css!'+ PLUGINS + 'prevent-robot/jigsaw.css'],
            selection: ['css!' + '/plugins/selection/dd.css']
        }
    })
})(require);
