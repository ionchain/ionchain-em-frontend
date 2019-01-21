require(['jquery','knockout', 'serialize', 'validate', 'common', 'moment', 'api', 'layer', 'jquery_Slider'], function($, KO, serialize, validate,common, moment, API, layer,jquery_Slider){
    var reqSmsCodeDisable = false; // 发送短信按钮，点击频率控制
    var interval = 120; // 短信发送时间间隔
    var ViewModel = function(){
      this.step = KO.observable(1);
      this.smsStep = KO.observable(1); // 发送验证码的步骤状态
      this.errorMsg1 = KO.observable();// 发送验证短信前，手机号码验证信息
      this.isSendSmsSuccess = KO.observable(false); // 是否成功发送短信
      this.sendSMSmessage = KO.observable(); // 发送短信接口反馈消息
      this.mobile =  KO.observable();
      this.sentTime = KO.observable(); // 短信发送时间
      this.secondsLeft = KO.observable(interval); // 发送短信时间间隔倒计时
      this.sendEnable = KO.observable(false); // 发送短信验证码，按钮可用状态
      this.isShowSMScodeInput = KO.observable(true);
      this.code = KO.observable(); //验证码
      this.smsCodeValidErrMsg = KO.observable(); // 验证码校验步骤错误消息
      this.passwordValidMsg = KO.observable();
      this.password =  KO.observable();
      this.password_confirmation =  KO.observable();
      //按钮文字
      this.tip_reget = function(){
        var text = ''
        switch(language){
            case 'en':
                text = 'Re get after '+ this.secondsLeft()+'s'
                break;
            case 'zh-CN':
                text = this.secondsLeft() + 's后重新获取'
                break;
            default:
                break;
        }
        return text
      }
      // 创建用户
      this.createUser = function() {
        API.createUser({
            mobile: this.mobile(),
            password: this.password(),
            password_confirmation: this.password_confirmation(),
            company_name: this.company_name(),
            company_org_code: this.company_org_code(),
            eth_address: this.eth_address()
        })._then( function(res) {
            if (res.success === 0) {
                this.nextStep() // 切换到下一界面
            } else {
                this.$snotify.error(res.message)
            }
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
            _this.step( _this.step() + 1 )
        } else {
            $.toast({text: common.translate(res.message), icon: 'error'});
        }
        })._catch()._then(function() {
        })
      };
      // 数秒
      this.timerTick = function() {
        var _this = this;
        var secondsPast = moment().diff(moment(this.sentTime()), 'seconds');
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
      // 获取短信验证码
      this.getSmsCode = function(type) {
        var _this = this;
        // 控制发送短信按钮，使用频率
        if(reqSmsCodeDisable){
            return
        }
        reqSmsCodeDisable = true
        loadingIndex = layer.load(2);
        API.getSmsCode({ mobile: this.mobile(), source: 'reset_password'})._then(function (res) {
            layer.close(loadingIndex);
            reqSmsCodeDisable = false;
            if (res.success === 0) { // 短信发送成功
              _this.sendEnable(false);
              if(type===1){ // 切换
                _this.step(_this.step() + 1);
              }
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
                $.toast({text: common.translate(res.message), icon: 'error'});
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
      this.smsNextStep = function() {
        console.log(this.smsStep(), 'smsNextStep');
        switch(this.smsStep()) {
            case 1:
                var errors = validate({mobile: this.mobile()}, {
                    mobile: {
                        required: {message: "^" + common.translate('手机号码是必填的')},
                        mobile: true
                    }
                },{format: "detailed", fullMessages: false});
                if(errors) {
                    this.errorMsg1(common.getMessage(errors))
                    return;
                }
                break;
            case 2:
                this.getSmsCode(1);
                break;
        }
        if(this.smsStep() >= 2) return
        this.smsStep( this.smsStep() + 1 )
        console.log('#####' ,this.smsStep())
      };
      this.nextStep = function() {
        var _this = this;
        if(this.step() == 2) {
          var errors = validate(
            {code:this.code()}
          , {
              code: {
                  required: {message: "^" + common.translate('请输入验证码')}
              }
          },{format: "detailed"});
          if(errors) {
            this.smsCodeValidErrMsg((common.getMessage(errors)))
            return;
          }
          this.verifySMScode()
        } else if (this.step() == 3) {
          var errors = validate(
            {
                password: this.password(),
                password_confirmation: this.password_confirmation() 
            },
            {
                password: {
                    required: {message: "^" + common.translate('请输入密码')},
                    length: {
                        minimum: 6,
                        message: "^" + common.translate('密码长度要大于6')
                    }
                },
                password_confirmation: {
                    required: {message: "^" + common.translate('请输入确认密码')},
                    equality: {
                        attribute: 'password',
                        message: "^" + common.translate('两次输入的密码不一致')
                    }
                }
            },{format: 'flat'}
          );
          if(errors) {
              this.passwordValidMsg(errors.join(' ; '))
              return;
          }
          loadingIndex = layer.load(2);
          API.resetPwd({
            mobile: this.mobile(),
            password: this.password(),
            password_confirmation: this.password_confirmation() 
          })._then(function (res) {
            layer.close(loadingIndex);
            if(res.success === 0){
                _this.step( _this.step() + 1 )
                $.toast({text: res.message, icon: 'success'});
            }else{
                $.toast({text: res.message, icon: 'error'});
            }
          })._catch(function(){
            layer.close(loadingIndex);
          })
          
        }
      };
      this.gotoLogin = function() {
        location.href = '/login'
      }
    };
    var viewmodel = new ViewModel();
    if(Modernizr.es6object){
        require(['preventRobot'],function (preventRobot) {
            preventRobot.init(
                document.getElementById('captcha'),
                function() {
                    viewmodel.smsNextStep();
                    console.log(0)
                },
                function() {
                }
            );
        })   
        
    }else{
        $(function(){
            $("#slider").slider({
                callback: function(result) {
                    $("#result1").text(result); 
                   if(result == true){
                    viewmodel.smsNextStep();
                   }
                }
            });
            $("#slider").show();
            $("#captcha").hide();
        })
       
    }
    KO.applyBindings( viewmodel, $("#page-retrieve")[0]);
})