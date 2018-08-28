require(['api'], function(API) {
    API.Login({}).then(function(res) {
        console.log(res)
    }).catch(function(err) {
        console.log(err);
    })
})