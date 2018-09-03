require(['jquery','tabs','lazyload','common'], function($,Tabs,lazyload, common){
    $(function(){
        $(".tabs-component").Tabs({
            event:'click'
        });
        $(".remark_close").click(function(){
            $(".articles_remark").hide();
        })

    })
    
})