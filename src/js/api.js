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
        function Bullet(_data, callback) {
            this.data = _data ? _data : null;
            this.error = null;
            this.thenCallback = callback ? callback : function(){};
            this.catchCallback = callback ? callback : function(){};
            this._then = function(cb){
                this.thenCallback = cb;
                return this;
            }
            this._catch = function(cb){
                this.catchCallback = cb;
                return this;
            }
        }
        var bullet = new Bullet()
        opt.data = JSON.stringify(opt.data)
        var _opt = _.assign({
            success: function(data) {
                bullet.data = data
                try {
                    bullet.thenCallback(data);
                } catch (err){
                    bullet.catchCallback(err);
                }
            },
            error: function(error) {
                console.log("error");
                bullet.error = error;
                bullet.catchCallback(error);
            }
        }, opt)

        function init() {
            $.ajax(_opt)
        }

        init()
        return bullet
    }
    return {
        Login: function(data, params) {
            return Xajax({
                url: config.BASE_URL + '/users/login',
                data: data
            })
        },
        Logout: function(data, params) {
            return Xajax({
                type: 'get',
                url: '/local-api/logout',
                data: data
            })
        },
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
        }
      
    }
});
