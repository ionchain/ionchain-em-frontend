require(['jquery','knockout', 'serialize', 'validate'], function($, KO, serialize, validate){
    var ViewModel = function(){
        this.mobile = KO.observable(),
        this.errorMessage = KO.observable();
        this.formValid = KO.observable(true);
        this.verify = function(){
            // console.log('username>>', this.mobile() )
            var errors = validate(this.mobile(),{
                mobile:{presence :{message: "^手机号码是必填的"}},
            });
            // console.log(errors);
            // if(errors){
            //     this.formValid(false);
            //     this.errorMessage(getMessage(errors))
            //     return;
            // }
            // this.formValid(true);
        }
    };

    KO.applyBindings( ViewModel);
})