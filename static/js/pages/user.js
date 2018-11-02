var localeMap = {
    'zh-CN': 'cn',
    'en': 'en'
}
var locale_name = 'jquery_validate_'+localeMap[language]

require(['jquery','knockout','validate', 'common', 'api', 'progress','jquery_fileupload','serialize','jquery_validate', locale_name], function($, KO, validate, common, API, progress,jquery_fileupload,serialize,jquery_validate,jquery_validate_locale){
    //表单验证
    var validator = $("#account_from").validate({
        debug:true
    });
    function AppViewModel() {
        this.userList = KO.observableArray([
            { name: 'Bert' },
            { name: 'Charles' },
            { name: 'Denise' }
        ]);
        // 投诉与反馈
        this.feedback = KO.observable(); 
        this.feedbackClick= function(){
            var feedback = this.feedback();
            if(feedback == "" || feedback == undefined || feedback == "反馈不能为空"){
                this.feedback("反馈不能为空");
            }else{
                API.feedbackCode({content: feedback})._then(function(data){
                    if(data.success == 0){
                        $.toast({text: '提交成功', icon: 'success'});
                    }else{
                        $.toast({text: data.message, icon: 'error'});
                    }
                })
            }
        }
        this.ac_submit = function(){
            var formData = serialize($('#account_from')[0], { hash: true });
            formData.user_id = userinfo.id
            if(validator.form()){
                API.accountUpdate(formData)._then(function(data){
                    if(data.success == 0){
                        $.toast({text: data.message, icon: 'success'});
                    } else {
                        $.toast({text: data.message, icon: 'error'});
                    }
                })
            }
        }
    }
    
    // 获取高度设置左侧导航的border
    $(function () {
        var appviewmodel1 = new AppViewModel();
        KO.applyBindings(appviewmodel1, $(".release")[0]);
        
        //自动获取侧边导航的高度
        var heightDiv1 = $(".release").height();
        var heightDiv2 = $(".user-nav").height();
        if(heightDiv1 > heightDiv2){
            $(".user-nav").height(heightDiv1 + "px");
        }else{
            $(".user-nav li:last-child>a").addClass("a_border");
        }

        /*横向进度条*/
        $(".scheduleX").each(function () { 
            var progressNum = $(this).data('progress');
            if(!progress ) return ;
            progress.scheduleX({
                el: this,
                fulfill: progressNum,   //选择数
                listAll: 100,  //总数
                speed: 25,     //动画速度，可选，默认25,越小越快
                again: false,  //选择数改变动画是否从零开始，默认true从零开始
                bgColor: "#ECECEC",    //底部颜色
                listColor: "#08AEB2",  //伸缩条颜色，默认原谅绿
                scWidth: "437",        //进度条宽度
                scHeight: "4"         //进度条高度
            });
        })
       
        // 消息中心的tabs
        $(".message_nav>a").click(function(){
            $(".message_nav>a").eq($(this).index()).addClass("active").siblings().removeClass("active");
            $(".message_content>ul").eq($(".message_nav>a").index(this)).addClass("message_on").siblings().removeClass('message_on'); 
        });
        // 账号设置
        $('#equipment-pic-photo').fileupload({
            dataType: 'json',
            done: function (e, data) {
                console.log('done', data);
            }
        });

        $('#data-sample-photo').click(function(){
            $('#equipment-pic-photo').click()
        })

    });
})