define(['toast', 'lodash', 'knockout', 'api', 'jquery'], 
    function( toast, _, KO, API, $) {
        _.assign($.toast.options, {
            showHideTransition: 'slide',
            position: 'top-center'
        })
        var viewmodel = {
            logout: function() {
                console.log('logout');
                API.Logout()._then(function(data) {
                    console.log(data)
                    if(data.success == 0) {
                        $.toast({text: data.message, icon: 'success'});
                        setTimeout(function() {
                            location.href = '/login'
                        }, 350 )
                    } else {
                        $.toast({text: data.message, icon: 'error'});
                    }
                })
            }
        }
        $(function() {
            console.log($('#header')[0]);
            KO.applyBindings( viewmodel , $('#header')[0]);
        })
    }
)