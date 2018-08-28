define(['jquery', 'lodash'], function ($, _) {
    var _config = {
        'development': {
            BASE_URL: '/api/v1'
        },
        'production': {
            BASE_URL: '/api/v1'
        }
    }
    var config = _config.development

    $.ajaxSetup({
        type: 'post',
        contentType: 'application/json;charset=UTF-8',
        processData: false
    })
    function Xajax(opt){
        function Bullet(data = null) {
            this.data = data
            this.then = function(){}
            this.catch = function(){}
        }
        var done = new Bullet()
        var preSet = {
            then: function(cb) {
                done.then = cb;
                var _done = new Bullet(done.data);
                return _done
            },
            catch: function(cb) {
                done.catch = cb
            }
        }
        opt.data = JSON.stringify(opt.data)
        var _opt = _.merge({
            success: function(data) {
                done.then(data)
            },
            err: function(data) {
                done.catch(data)
            }
        }, opt)

        function init() {
            $.ajax(_opt)
        }

        init()
        return preSet
    }
    return {
        Login: function(data, params) {
            return Xajax({
                url: config.BASE_URL + '/users/login',
                data: data
            })
        },
        /* Login: function(data, success, err) {
            $.ajax({
                methods: 'post',
                url: config.BASE_URL + '/users/login',
                dat: data,
                success: success,
                err: err
            })
        }, */
        getSmsCode: function(data, success, err) {
            $.ajax({
                methods: 'post',
                url: config.BASE_URL + '/users/sms_code',
                dat: data,
                success: success,
                err: err
            })
        },
        resetSmsCode: function(data, success, err) {
            $.ajax({
                methods: 'post',
                url: config.BASE_URL + '/users/reset_password',
                dat: data,
                success: success,
                err: err
            })
        },
        verifySMScode: function(data, success, err) {
            $.ajax({
                methods: 'post',
                url: config.BASE_URL + '/users/verify_sms_code',
                dat: data,
                success: success,
                err: err
            })
        },
        createUser: function(data, success, err) {
            $.ajax({
                methods: 'post',
                url: config.BASE_URL + '/users/create',
                dat: data,
                success: success,
                err: err
            })
        },
        Logout: function(data, success, err) {
            $.ajax({
                methods: 'post',
                url: config.BASE_URL + '/logout',
                dat: data,
                success: success,
                err: err
            })
        }
    }
});
