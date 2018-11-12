define(['toast', 'lodash', 'knockout', 'api', 'jquery', 'validate', 'locales', 'cookie', 'utils'],
    function( toast, _, KO, API, $, validate, locales, cookie, utils) {
        var _language = $.cookie('language') ? $.cookie('language') : 'zh-CN'
        _.assign($.toast.options, {
            showHideTransition: 'slide',
            position: 'top-center'
        });
        function _translate(text){
            try{ 
                console.log("language", _language, locales)
                return locales[_language][text]
            }catch(e){
                console.log(e)
                return text
            }
        }
        /*--header 模版绑定 start--*/
        var viewmodel = {
            logout: function() {
                API.Logout()._then(function(data) {
                    console.log(data)
                    if(data.success == 0) {
                        $.toast({text: data.message, icon: 'success'});
                        setTimeout(function() {
                            location.href = '/login'
                        }, 300 )
                    } else {
                        $.toast({text: data.message, icon: 'error'});
                    }
                })
            }
        };
        $(function() {
            KO.applyBindings( viewmodel , $('#header')[0]);
        });
        /*--header 模版绑定 end--*/
        /*--规则自定义start--*/
        validate.validators.mobile = function(value, options, key, attributes) {
            var test = /^[1][3,4,5,7,8][0-9]{9}$/.test(value)
            if (!test) {
                return options.message ? options.message : "^" + _translate('手机号码不合法');
            }
        };
        validate.validators.required = function(value, options, key, attributes) {
            // var test = !value ? false : value.length > 0
            if (!value) {
                key = options.key ? options.key : key;
                return options.message ? options.message : key +  _translate('是必填的');
            }
        };
        /*--规则自定义end--*/

        /**footer start */
        $(function() {
            var vmodel_footer = {
                //语言切换
                languageSwitch: function(x, e) {
                    console.log(arguments, this)
                    $.cookie('language', $(e.target).data('language'));  
                    location.reload();
                }
            }
            // console.log($('.js-footer')[0], "@@@@@@@@@@")
            KO.applyBindings( vmodel_footer , $('.js-footer')[0]);
        });
        /**footer end */
        /**存储语言选择，状态来自于url start */
        var language = ""
        if(language = utils.getSearch('language')){
            $.cookie('language', language);
        }
        /**存储语言选择，状态来自于url end */
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
            getMessage: function (errors) {
                var groupMsg = this.groupMessage(errors);
                console.log('getMessage>>>', groupMsg)
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
            },
            translate: _translate
        }
        /*--公用utils start--*/
    }
)