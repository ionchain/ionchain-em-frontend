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
            'form-serialize': '/lib/form-serialize',
            validate: LIBRARY + 'validate'
        },
        map: {
        },
        shim: {
            api: ['jquery']
        }
    })
})(require);
