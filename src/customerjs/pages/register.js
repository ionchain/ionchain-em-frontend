require(['jquery', 'api', 'lodash', 'knockout', 'serialize', 'validate', 'toast','common', 'moment', 'preventRobot'],
    function($, API, _, KO, serialize, validate, toast, common, moment, preventRobot) {
        preventRobot.init(
            document.getElementById('captcha'),
            function() {
                viewmodel.smsStepNext();
            },
            function() {
            }
        );
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
            this.step = KO.observable(2);
            this.smsStep = KO.observable(1); // 发送验证码的步骤状态
            this.mobile =  KO.observable(17621039206);
            this.password =  KO.observable();
            this.password_confirmation =  KO.observable();
            this.company_name =  KO.observable();
            this.company_org_code =  KO.observable();
            this.eth_address =  KO.observable();
            this.isShowSMScodeInput = KO.observable(true);
            this.stepNext = function() {
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
                        return;
                    }
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
            this.smsStepNext = function() {
                if(this.smsStep() == 1){
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
                }
                console.log("smsStep",  this.smsStep(), this.code());
                if( this.smsStep() == 2 ) {
                    this.getSmsCode();
                }
                if(this.smsStep()==3) {
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
                }
                if(this.smsStep >= 3) return
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
                    _this.step( _this.step()+1 )
                } else {
                    $.toast({text: res.message, icon: 'error'});
                }
                })._catch()._then(function() {
                })
            };
        };
        var viewmodel = new ViewModel();
        $('.next-btn').on('keyup', function(e) {
            if(e.keyCode == 13) {
            }
        })
        
        KO.applyBindings( viewmodel, $("#page-register")[0]);
        // viewmodel.getSmsCode();
    }
)
