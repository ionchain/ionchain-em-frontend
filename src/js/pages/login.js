require(['jquery', 'api', 'lodash', 'knockout', 'serialize', 'validate'], function($, API, _, KO, serialize, validate) {
    var ViewModel = function() {
        this.numberOfClicks = KO.observable(0);
     
        this.registerClick = function() {
            this.numberOfClicks(this.numberOfClicks() + 1);
        };
     
        this.resetClicks = function() {
            this.numberOfClicks(0);
        };
     
        this.hasClickedTooManyTimes = KO.pureComputed(function() {
            return this.numberOfClicks() >= 3;
        }, this);

        this.loginForm = KO.observable({
            mobile: '',
            password: ''
        });
        this.login = function () {
            var params = serialize($('#login-form')[0], { hash: true }, {format: "detailed"});
            var valid = validate(params, {
                mobile: {presence: {message: "^手机号码是必填的"}},
                password: {presence: {message: "^密码是必填的"}}
            });
            var msg = valid.mobile[0]

            console.log(  valid, 'valid');

            if(!valid) {return; }
            
            API.Login(params)._then(function(data) {
                console.log( data);
            })._catch(function(err){
            });
        }
    };
     
    KO.applyBindings(new ViewModel());
})