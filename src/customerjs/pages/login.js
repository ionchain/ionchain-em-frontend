require(['jquery', 'api', 'lodash', 'knockout', 'serialize', 'validate', 'toast','common'],
    function($, API, _, KO, serialize, validate, toast, common) {
        var ViewModel = function() {
            this.mobile = KO.observable();
            this.password = KO.observable();
            this.formValid = KO.observable(true);
            this.errorMessage = KO.observable();
            this.login = function () {
                var params = serialize($('#login-form')[0], { hash: true }, {format: "detailed"});
                var errors = validate(params, {
                    mobile: {
                        presence: {message: "^手机号码是必填的"},
                        mobile: true
                    },
                    password: {presence: {message: "^密码是必填的"}}
                });
                
                if(errors) {
                    this.formValid(false);
                    this.errorMessage( common.getMessage(errors) )
                    return;
                }
                this.formValid(true);
                
                API.Login(params)._then(function(data) {
                    if(data.success == 0) {
                        $.toast({text: '登录成功', icon: 'success'});
                        setTimeout(function() {
                            location.replace('/')
                        }, 150)
                    } else {
                        $.toast({text: data.message, icon: 'error'});
                    }
                })._catch(function(err){
                });
            };
            this.checkMobile = function() {
                var errors = validate({mobile: this.mobile()}, {
                    mobile: {
                        presence: {message: "^手机号码是必填的"},
                        mobile: true
                    }
                })
                if(errors) {
                    this.formValid(false);
                    this.errorMessage( common.getMessage(errors) )
                } else {
                    this.formValid(true);
                }
            };
            this.checkPwd = function() {
                var errors = validate({password: this.password()}, {
                    password: {
                        required: {message: "^密码是必填的"}
                    }
                })
                console.log(this.password(),'--', errors)
                if(errors) {
                    this.formValid(false);
                    this.errorMessage( common.getMessage(errors) )
                } else {
                    this.formValid(true);
                }
            };
        };
        var viewmodel = new ViewModel();
        $('#inp-password').on('keyup', function(e) {
            if(e.keyCode == 13) {
                viewmodel.login()
            }
        })
        
        KO.applyBindings( viewmodel );
    }
)
