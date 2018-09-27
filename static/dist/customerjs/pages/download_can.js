require(['jquery','knockout','validate', 'api', 'common'], function($, KO, validate, API, common){
    function AppViewModel() {
        this.collectClick = function(m, event){
           var param = $(event.target).data('param');
            API.collectCode(param)._then(function(data){
                console.log(data)
                if(data.success == 0){
                    $.toast({text: '收藏成功', icon: 'success'});
                    $(".t_third").addClass("active");
                }else{
                    $.toast({text: data.message, icon: 'error'});
                }
            }) 
        }
        this.cancelClik = function(m, event){
            // API.cancelCode()
        }
    }

    // 获取高度设置左侧导航的border
    $(function () {
        var appviewmodel1 = new AppViewModel();
        KO.applyBindings(appviewmodel1, $(".download_can")[0]);
    })
})