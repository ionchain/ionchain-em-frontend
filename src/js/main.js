(function(require){
    var LIBRARY = '/dist/lib/';
    var PAGES = '/dist/js/pages/';
    var OTHER = '/dist/js/';
    require.config({
        paths: {
            jquery: LIBRARY + 'jquery.min',
            api: OTHER + 'api',
            lodash: LIBRARY + 'lodash.min',
            knockout: LIBRARY + 'knockout',
            serialize: LIBRARY + 'form-serialize',
            validate: LIBRARY + 'validate',
            polyfill: LIBRARY + 'browser-polyfill'
        },
        map: {
            '*': {
                css: '/dist/lib/css.min.js'
            }
        },
        shim: {
            api: ['jquery', 'lodash'],
            validate: ['lodash']
        }
    })
})(require);
