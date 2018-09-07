require(['jquery','knockout','validate', 'common', 'api', 'progress'], function($, KO, validate, common, API, progress){
    $(function () {
        var heightDiv1 = $(".release").height();
        var heightDiv2 = $(".user-nav").height();
        if(heightDiv1 > heightDiv2){
            $(".user-nav").height(heightDiv1 + "px");
        }else{
            $(".user-nav li:last-child>a").addClass("a_border");
        }
        /*横向进度条*/
        progress.scheduleX({
            fulfill: 90,   //选择数
            listAll: 100,  //总数
            speed: 25,     //动画速度，可选，默认25,越小越快
            again: false,  //选择数改变动画是否从零开始，默认true从零开始
            bgColor: "#ECECEC",    //底部颜色
            listColor: "#08AEB2",  //伸缩条颜色，默认原谅绿
            scWidth: "437",        //进度条宽度
            scHeight: "4"         //进度条高度
        });

    });
})