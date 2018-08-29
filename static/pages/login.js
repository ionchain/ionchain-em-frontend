console.log('login')
require(['api', 'lodash'], function(API, _) {
    /* API(data)(function() {
        console.log( 22222);
    }, function() {

    }) */
    API.Login({mobile: '18862349106', password: '123456'}).then(function(data) {
        console.log( data)
    }).catch(function(err) {
    })
    // console.log(API.Login({}).then());
    
    /* $.ajax({
        type: 'post',
        url: '/api/v1/users/login',
        data: JSON.stringify({password:'333333', mobile: '13234545'})
    }).done(function(){
        console.log(77777777, arguments);
    }) */
})