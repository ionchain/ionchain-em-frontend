require.config({
    paths: {
        jquery: '/dist/jquery.min',
        api: '/api',
        lodash: '/dist/lodash.min'
    },
    map: {
    },
    shim: {
        api: ['jquery']
    }
})