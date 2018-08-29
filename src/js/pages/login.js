require(['jquery', 'api', 'lodash', 'knockout', 'form-serialize', 'validate'], function($, API, _, KO, serialize, validate) {
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
                mobile: {presence: {message: "是必填的"}},
                password: {presence: {message: "是必填的"}}
            });
            console.log(valid, 'valid');
            if(!valid) {return}
            
            API.Login(params)._then(function(data) {
                console.log( data);
            })._catch(function(err){
            });
        }
    };
     
    KO.applyBindings(new ViewModel());
})