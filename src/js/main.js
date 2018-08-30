(function(require){
    var LIBRARY = '/dist/lib/';
    var PAGES = '/dist/js/pages/';
    var OTHER = '/dist/js/';
    var PLUGINS = '/plugins/'
    require.config({
        paths: {
            jquery: LIBRARY + 'jquery.min',
            api: OTHER + 'api',
            lodash: LIBRARY + 'lodash.min',
            knockout: LIBRARY + 'knockout',
            'form-serialize': '/lib/form-serialize',
            validate: LIBRARY + 'validate',
            tabs: PLUGINS + 'tabs/jquery.tabs',
            lazyload: PLUGINS + 'tabs/jquery.lazyload'
        },
        map: {
        },
        shim: {
            api: ['jquery'],
            tabs: ['jquery'],
            lazyload: ['jquery']
        }
    })
})(require);
