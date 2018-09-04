require(['jquery', 'api', 'lodash', 'knockout', 'serialize', 'validate', 'toast','common', 'moment', 'preventRobot', 'layer'],
    function($, API, _, KO, serialize, validate, toast, common, moment, preventRobot, layer) {
        var interval = 120; // 短信发送时间间隔
        var reqSmsCodeDisable = false; // 发送短信按钮，点击频率控制
        var ticker = null;
        var loadingIndex= null;
       
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
                loadingIndex = layer.load(2);
                var _this = this;
                API.createUser({
                    mobile: this.mobile(),
                    password: this.password(),
                    password_confirmation: this.password_confirmation(),
                    company_name: this.company_name(),
                    company_org_code: this.company_org_code(),
                    eth_address: this.eth_address()
                })._then( function(res) {
                    layer.close(loadingIndex)
                    if (res.success === 0) {
                        _this.step( _this.step() + 1 ) // 切换到下一界面
                    } else {
                        $.toast({text: res.message, icon: 'error'});
                    }
                })._catch(function(){
                    layer.close(loadingIndex)
                })
            };
            // 注册大步骤控制，视图切换
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
            // 注册第一步（共3步）中的小步骤---下一步处理
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
                        return
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
                            },{format: 'detailed'}
                        );
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
            // 获取短信验证码
            this.getSmsCode = function() {
                var _this = this;
                // 控制发送短信按钮，使用频率
                if(reqSmsCodeDisable){
                    return
                }
                reqSmsCodeDisable = true
                loadingIndex = layer.load(2);
                API.getSmsCode({ mobile: this.mobile() })._then(function (res) {
                    layer.close(loadingIndex);
                    reqSmsCodeDisable = false;
                    if (res.success === 0) { // 短信发送成功
                        _this.smsStep(_this.smsStep()+1);
                        var sentTime = moment().format('YYYY-MM-DD HH:mm:ss');
                        _this.isSendSmsSuccess(true);
                        _this.sendSMSmessage(res.message);
                        // 记录短信发送时间
                        _this.sentTime( sentTime );
                        // 数秒，倒计时
                        _this.timerTick();
                        // sessionStorage.setItem('sent-time', sentTime)
                        $.toast({text: res.message, icon: 'success'});
                    } else {
                        _this.isSendSmsSuccess(false)
                        _this.sendSMSmessage(res.message);
                        $.toast({text: res.message, icon: 'error'});
                        if (res.success === 2001) {
                            _this.isShowSMScodeInput(false);
                        }
                    }
                })._catch(function(err){
                    reqSmsCodeDisable = false;
                    layer.close(loadingIndex);
                })._then(function() {
                    layer.close(loadingIndex);
                })
            };
            // 校验验短信证码
            this.verifySMScode = function() {
                var _this = this;
                loadingIndex = layer.load(2);
                API.verifySMScode({
                    mobile: this.mobile(),
                    code: this.code()
                })._then(function(res) {
                    layer.close(loadingIndex)
                    if (res.success === 0) {
                        $.toast({text: res.message, icon: 'success'});
                        // 切换到下一界面
                        _this.smsStep( _this.smsStep() + 1 )
                    } else {
                        $.toast({text: res.message, icon: 'error'});
                    }
                })._catch(function(){
                    layer.close(loadingIndex)
                })._then(function() {
                    layer.close(loadingIndex)
                })
            };
            this.gotoHome = function() {
                location.href = '/'
            }
        };
        var viewmodel = new ViewModel();
        // 初始化滑动验证控件
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
