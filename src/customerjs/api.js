define(['jquery', 'lodash', 'toast'], function ($, _, toast) {
    var _config = {
        'development': {
            BASE_URL: '/api/v1'
        },
        'production': {
            BASE_URL: '/api/v1'
        }
    }
    var config = _config.production
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
                var bullet = new Bullet();
                bullet.catchCallback = cb;
                return bullet;
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
                    console.log(err)
                    bullet.catchCallback(err);
                }
            },
            error: function(error) {
                bullet.error = error;
                console.log(error, 'error');
                if(error.status < 400){
                    bullet.catchCallback(error);
                } else {
                    $.toast({text: error.status +' '+ error.statusText, icon: 'error'});
                }
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
        getSmsCode: function(data) {
            return Xajax({
                type: 'post',
                url: config.BASE_URL + '/users/sms_code',
                data: data
            })
        },
        resetSmsCode: function(data) {
            return Xajax({
                type: 'post',
                url: config.BASE_URL + '/users/reset_password',
                data: data
            })
        },
        verifySMScode: function(data) {
            return Xajax({
                type: 'post',
                url: config.BASE_URL + '/users/verify_sms_code',
                data: data
            })
        },
        createUser: function(data) {
            return Xajax({
                type: 'post',
                url: config.BASE_URL + '/users/create',
                data: data
            })
        },
        // 收藏
        // collectCode: function(){
        //     return Xajax({
        //         type:'get'
        //     })
        // },
        // 个人中心(投诉与反馈)
        feedbackCode: function(data) {
            return Xajax({
                type: 'post',
                url: config.BASE_URL + '/feedbacks/create',
                data: data
            })
        },
        // 个人中心(账号设置)
        accountUpdate: function(data){
            return Xajax({
                type: 'post',
                url: config.BASE_URL + '/companies/update',
                data: data
            })
        },
        deviceAdd: function(data) {
            return Xajax({
                type: 'post',
                url: config.BASE_URL + '/devices/create',
                data: data
            })
        },
        //----test---
        testGetSmsCode: function(data, success, err) {
            return Xajax({
                type: 'post',
                url: '/test/getSmsCode',
                data: data
            })
        },
       

    }
});
