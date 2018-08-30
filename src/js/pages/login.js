require(['jquery', 'api', 'lodash', 'knockout', 'serialize', 'validate','public', 'toast'],
    function($, API, _, KO, serialize, validate, public, toast) {
        function getMessage(errors) {
            var msg = [];
            for(var prop in errors) {
                msg.push(errors[prop].join(' '))
            }
            return msg.join(' ; ')
        }
        var ViewModel = function() {
            this.formValid = KO.observable(true);
            this.errorMessage = KO.observable();
            this.login = function () {
                var params = serialize($('#login-form')[0], { hash: true }, {format: "detailed"});
                var errors = validate(params, {
                    mobile: {presence: {message: "^手机号码是必填的"}},
                    password: {presence: {message: "^密码是必填的"}}
                });
                
                if(errors) {
                    this.formValid(false);
                    this.errorMessage( getMessage(errors) )
                    return;
                }
                this.formValid(true);
                
                API.Login(params)._then(function(data) {
                    if(data.success == 0) {
                        $.toast({text: '登录成功'});
                    } else {
                        $.toast({text: data.message});
                    }
                })._catch(function(err){
                });
            }
        };
        KO.applyBindings(new ViewModel());
    }
)