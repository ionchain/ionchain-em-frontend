require(['jquery','tabs','lazyload','common','api','lodash', 'knockout'], function($,Tabs,lazyload, common, API, _, KO){
    $(function(){
        $(".tabs-component").Tabs({
            event:'click'
        });
        $(".remark_close").click(function(){
            $(".articles_remark").hide();
        })

    })
   
})