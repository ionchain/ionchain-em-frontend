require(['jquery','knockout','validate', 'api', 'common'], function($, KO, validate, API, common){
    function AppViewModel() {
        // this.collectClick = function(m, event){
        //    var param = $(event.target).data('param');
        //     API.collectCode(param)._then(function(data){
        //         console.log(data)
        //         if(data.success == 0){
        //             $.toast({text: '收藏成功', icon: 'success'});
        //             location.reload();
        //         }else{
        //             $.toast({text: data.message, icon: 'error'});
        //         }
        //     }) 
        // }
        // this.cancelClik = function(m, event){
        //     var param = $(event.target).data('param');
        //     API.cancelCode(param)._then(function(data){
        //         if(data.success == 0){
        //             $.toast({text: '取消收藏', icon: 'success'});
        //             location.reload();
        //         }else{
        //             $.toast({text: data.message, icon: 'error'});
        //         }
        //     })
        // }
        this.collectClick = function(m, event){
            var whether = $(event.target).data('whether');
            if(whether != true){
                var collect = $(event.target).data('collect');
                API.collectCode(collect)._then(function(data){
                    // console.log(data)
                    if(data.success == 0){
                        $(event.target).data('whether', true);
                        $(event.target).data('cancel',{id: data.data.id});
                        // canel_id.id = data.data.id;
                        $(".t_third>button").addClass("active");
                    }else{
                        $.toast({text: data.message, icon: 'error'});
                    }
                }) 
            }else{
                var cancel = $(event.target).data('cancel');
                API.cancelCode(cancel)._then(function(data){
                    if(data.success == 0){
                        $(event.target).data('whether', false);
                        $(".t_third>button").removeClass("active");
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
        KO.applyBindings(appviewmodel1, $(".download_can")[0]);
    })
})