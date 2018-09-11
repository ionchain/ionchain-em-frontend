require(['jquery','knockout','validate', 'api'], function($, KO, validate, API){
    function AppViewModel() {
        this.downList = KO.observableArray([
            { name: 'Bert' },
            { name: 'Charles' },
            { name: 'Denise' }
        ]);
    }

    // 获取高度设置左侧导航的border
    $(function () {
        var appviewmodel1 = new AppViewModel();
        KO.applyBindings(appviewmodel1, $(".download_can")[0]);
    })
})