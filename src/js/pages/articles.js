require(['jquery','tabs','lazyload'], function($,Tabs,lazyload){
    $(function(){
        $(".tabs-component").Tabs({
            event:'click'
        });
        $(".remark_close").click(function(){
            $(".articles_remark").hide();
        })

    })
    
})