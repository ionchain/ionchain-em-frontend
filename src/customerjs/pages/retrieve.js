require(['jquery','knockout', 'serialize', 'validate', 'common'], function($, KO, serialize, validate,common){
    function getMessage(errors) {
        var msg = [];
        for(var prop in errors) {
            msg.push(errors[prop].join(' '))
        }
        return msg.join(' ; ')
    }
    var ViewModel = function(){
        this.mobile = KO.observable(),
        this.errorMessage = KO.observable();
        this.formValid = KO.observable(true);
        this.verify = function() {
            // console.log('username>>', this.mobile() )
            var errors = validate({mobile: this.mobile()},{
                mobile:{
                  presence :{message: "^手机号码是必填的"},
                  mobile: true
                }
            })
            if(errors){
                this.formValid(false);
                this.errorMessage(getMessage(errors))
                return;
            }
            this.formValid(true);


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
        
    };

    KO.applyBindings( ViewModel);
})