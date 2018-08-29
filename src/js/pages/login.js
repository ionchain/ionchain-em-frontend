require(['api', 'lodash', 'knockout'], function(API, _, KO) {
    API.Login({mobile: '18862349106', password: '123456'})._then(function(data) {
        console.log( data);
    })._catch(function(err){
    });
    
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
    };
     
    KO.applyBindings(new ViewModel());
})