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
        //----test start---
        testGetSmsCode: function(data, success, err) {
            return Xajax({
                type: 'post',
                url: '/test/getSmsCode',
                data: data
            })
        },
        //----test end---
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
        //点击 收藏
        collectCode: function(data){
            return Xajax({
                type:'post',
                url: config.BASE_URL + '/favorites/create',
                data: data
            })
        },
        //取消收藏
        cancelCode: function(data){
            return Xajax({
                type: 'post',
                url: config.BASE_URL + '/favorites/destroy',
                data: data
            })
        },
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
        // 设备列表
        getDeviceList (userId) {
            return Xajax({
                type: 'get',
                url: [config.BASE_URL,'/users/',userId,'/devices'].join('')
            })
            // return _axios.get(`/users/${userId}/devices`)
        },
        // 设备详情
        getDeviceDesc (deviceId) {
            return Xajax({
                type: 'get',
                url: [config.BASE_URL,'/devices/',deviceId].join('')
            })
            // return _axios.get(`/devices/${deviceId}`)
        },
        // 历史总收益接口
        getHisProfit () {
            var txTo = '0x1ac505f02e6a6aa7abb1b8b99c7c43bc53dba2de'
            return Xajax({
                type: 'get',
                url: ['/browser-api/v1','/equipment/totalIncome?txTo=',txTo].join('')
            })
        }
    }
});
