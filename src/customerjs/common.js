define(['toast', 'lodash', 'knockout', 'api', 'jquery', 'validate'],
    function( toast, _, KO, API, $, validate) {
        _.assign($.toast.options, {
            showHideTransition: 'slide',
            position: 'top-center'
        });
        var viewmodel = {
            logout: function() {
                API.Logout()._then(function(data) {
                    console.log(data)
                    if(data.success == 0) {
                        $.toast({text: data.message, icon: 'success'});
                        setTimeout(function() {
                            location.href = '/login'
                        }, 150 )
                    } else {
                        $.toast({text: data.message, icon: 'error'});
                    }
                })
            }
        };
        $(function() {
            KO.applyBindings( viewmodel , $('#header')[0]);
        });
        /*--规则自定义start--*/
        validate.validators.mobile = function(value, options, key, attributes) {
            var test = /^[1][3,4,5,7,8][0-9]{9}$/.test(value)
            if (!test) {
                return options.message ? options.message : "^手机号码不合法";
            }
        };
        validate.validators.required = function(value, options, key, attributes) {
            var test = !value ? false : value.length > 0
            if (!test) {
                key = options.key ? options.key : key;
                return options.message ? options.message : key + '是必填的';
            }
        };
        /*--规则自定义end--*/

        /*--公用utils start--*/
        return {
            getMessage: function getMessage(errors) {
                var msg = [];
                for(var prop in errors) {
                    var requireMsg = '', test = false;
                    if (_.some(errors[prop], function(item) {
                        test = item.indexOf('必填')>-1 || item.indexOf('is required')>-1
                        if(test) requireMsg = item
                        return test
                    })) {
                        msg.push( requireMsg )
                    } else {
                        msg.push(errors[prop].join(' '))
                    }
                }
                return msg.join(' ; ')
            }
        }
        /*--公用utils start--*/
    }
)