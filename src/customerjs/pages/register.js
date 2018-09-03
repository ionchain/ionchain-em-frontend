require(['jquery', 'api', 'lodash', 'knockout', 'serialize', 'validate', 'toast','common', 'moment', 'preventRobot'],
    function($, API, _, KO, serialize, validate, toast, common, moment, preventRobot) {
        
        var interval = 120; // 短信发送时间间隔
        var reqSmsCodeDisable = false; // 发送短信按钮，点击频率控制
        var ticker = null;
       
        var ViewModel = function(){
            this.errorMsg2 = KO.observable();
            this.smsCodeValidErrMsg = KO.observable(); // 验证码校验步骤错误消息
            this.code = KO.observable(); //验证码
            this.sendSMSmessage = KO.observable(); // 发送短信接口反馈消息
            this.isSendSmsSuccess = KO.observable(false);
            this.sendEnable = KO.observable(false); // 发送短信验证码，按钮可用状态
            this.secondsLeft = KO.observable(interval); // 发送短信时间间隔倒计时
            this.errorMsg1 = KO.observable();// 发送验证短信前，手机号码验证信息
            this.step = KO.observable(1);
            this.smsStep = KO.observable(1); // 发送验证码的步骤状态
            this.mobile =  KO.observable();
            this.password =  KO.observable();
            this.password_confirmation =  KO.observable();
            this.company_name =  KO.observable();
            this.company_org_code =  KO.observable();
            this.eth_address =  KO.observable();
            this.isShowSMScodeInput = KO.observable(true);
            this.passwordValidMsg = KO.observable();
            // 创建用户
            this.createUser = function() {
                API.createUser({
                    mobile: this.mobile(),
                    password: this.password(),
                    password_confirmation: this.password_confirmation(),
                    company_name: this.company_name(),
                    company_org_code: this.company_org_code(),
                    eth_address: this.eth_address()
                })._then((res) => {
                    if (res.success === 0) {
                        this.nextStep() // 切换到下一界面
                    } else {
                        this.$snotify.error(res.message)
                    }
                })
            };
            this.nextStep = function() {
                if(this.step() == 2) {
                    var errors = validate({
                        company_name: this.company_name(),
                        eth_address: this.eth_address()
                    }, {
                        company_name: {
                            required: {message: "^企业名称是必填的"}
                        },
                        eth_address: {
                            required: {message: "^icon地址是必填的"}
                        }
                    },{format: "detailed", fullMessages: false});
                    if(errors) {
                        console.log(errors, 'errors');
                        this.errorMsg2(common.getMessage(errors))
                    }
                    this.createUser();
                    return;
                }
                this.step( this.step() + 1 )
            };
            this.sentTime = KO.observable();
             // 数秒
            this.timerTick = function() {
                var _this = this;
                var secondsPast = moment().diff(moment(this.sentTime()), 'seconds')
                
                this.secondsLeft( interval - (secondsPast > interval ? interval : secondsPast) );
                
                ticker = setInterval(function() {
                    if(_this.secondsLeft() < 1) {
                        _this.sendEnable(true)
                        clearTimeout(ticker);
                        return
                    }
                    _this.secondsLeft( _this.secondsLeft() - 1)

                }, 1000)
            };
            this.smsNextStep = function() {
                switch(this.smsStep()) {
                    case 1:
                        var errors = validate({mobile: this.mobile()}, {
                            mobile: {
                                required: {message: "^手机号码是必填的"},
                                mobile: true
                            }
                        },{format: "detailed", fullMessages: false});
                        if(errors) {
                            this.errorMsg1(common.getMessage(errors))
                            return;
                        }
                        break;
                    case 2:
                        this.getSmsCode();
                        break;
                    case 3:
                        var errors = validate(
                            {code:this.code()}
                        , {
                            code: {
                                required: {message: "^请输入验证码"},
                            }
                        },{format: "detailed"});
                        if(errors) {
                            this.smsCodeValidErrMsg((common.getMessage(errors)))
                            return;
                        }
                        this.verifySMScode()
                        return
                        break;
                    case 4:
                        var errors = validate(
                            {
                                password: this.password(),
                                password_confirmation: this.password_confirmation() 
                            },
                            {
                                password: {
                                    required: {message: "^请输入密码"},
                                    length: {
                                        minimum: 6,
                                        message: "^密码长度要大于6"
                                    }
                                },
                                password_confirmation: {
                                    required: {message: "^请输入确认密码"},
                                    equality: {
                                        attribute: 'password',
                                        message: "^两次输入的密码不一致",
                                    }
                                }
                            },{format: 'flat'}
                        );
                        console.log('errors>>', common.getMessage(errors), errors)
                        if(errors) {
                            this.passwordValidMsg(errors.join(' ; '))
                            return;
                        }
                        this.nextStep();
                        return
                        break;
                }
                if(this.smsStep >= 4) return
                this.smsStep( this.smsStep() + 1 )
            };
            this.getSmsCode = function() {
                var _this = this;
                if(reqSmsCodeDisable){
                    return
                }
                reqSmsCodeDisable = true
                API.getSmsCode({ mobile: this.mobile() })._then(function (res) {
                  console.log(res);
                  try{
                    if (res.success === 0) { // 短信发送成功
                        var sentTime = moment().format('YYYY-MM-DD HH:mm:ss');
                        _this.isSendSmsSuccess(true);
                        _this.sendSMSmessage(res.message);
                        _this.sentTime( sentTime );
                        _this.timerTick();
                        sessionStorage.setItem('sent-time', sentTime)
                        $.toast({text: res.message, icon: 'success'});
                    } else {
                        console.log("errrrrr");
                        _this.isSendSmsSuccess(false)
                        _this.sendSMSmessage(res.message);
                        $.toast({text: res.message, icon: 'error'});
                        if (res.success === 2001) {
                            _this.isShowSMScodeInput(false)
                        }
                    }
                  }catch(e){
                      console.log(e);
                  }
                  
                })._catch(function(err){
                    console.log(err);
                })._then(function() {
                    reqSmsCodeDisable = false
                })
            };
            // 校验验短信证码
            this.verifySMScode = function() {
                var _this = this;
                API.verifySMScode({
                    mobile: this.mobile(),
                    code: this.code()
                })._then(function(res) {
                if (res.success === 0) {
                    $.toast({text: res.message, icon: 'success'});
                    // 切换到下一界面
                    _this.smsStep( _this.smsStep() + 1 )
                } else {
                    $.toast({text: res.message, icon: 'error'});
                }
                })._catch()._then(function() {
                })
            };
        };
        var viewmodel = new ViewModel();
        preventRobot.init(
            document.getElementById('captcha'),
            function() {
                viewmodel.smsNextStep();
            },
            function() {
            }
        );
        $('.next-btn').on('keyup', function(e) {
            if(e.keyCode == 13) {
            }
        })
        
        KO.applyBindings( viewmodel, $("#page-register")[0]);
    }
)
