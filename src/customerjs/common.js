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
            // var test = !value ? false : value.length > 0
            if (!value) {
                key = options.key ? options.key : key;
                return options.message ? options.message : key + '是必填的';
            }
        };
        /*--规则自定义end--*/

        /*--公用utils start--*/
        return {
            groupMessage: function(errors) {
                var group = {};
                for(var i in errors) {
                    if(_.has(group, errors[i].attribute)) {
                        group[errors[i].attribute].push( errors[i] )
                    } else {
                        group[errors[i].attribute] = [ errors[i] ]
                    }
                }
                return group
            },
            getMessage: function getMessage(errors) {
                var groupMsg = this.groupMessage(errors);
                var msg = [], groupItem=null;
                for(var prop in groupMsg) {
                    var msgL2 = [];
                    groupItem = groupMsg[prop]
                    for(var i in groupItem) {
                        msgL2.push( groupItem[i].error )
                        if (groupItem[i].validator == 'presence' || groupItem[i].validator == 'required'){
                            break
                        }
                    }
                    msg.push(msgL2.join(' '))
                }
                return msg.join(' ; ')
            }
        }
        /*--公用utils start--*/
    }
)