require(['jquery','knockout'], function($, KO){
    var ViewModel = function(){
        this.verify = function(){
            console.log(123)
        }
    };
    KO.applyBindings( ViewModel);
})