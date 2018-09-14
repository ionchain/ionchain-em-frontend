require(['jquery','knockout','validate', 'common', 'api', 'progress'], function($, KO, validate, common, API, progress){
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
            // console.log(feedback);
            if(feedback == ""){
                this.feedback("投诉内容不能为空");
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
    }

    // 获取高度设置左侧导航的border
    $(function () {
        var appviewmodel1 = new AppViewModel();
        KO.applyBindings(appviewmodel1, $(".release")[0]);

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
       

    });
})