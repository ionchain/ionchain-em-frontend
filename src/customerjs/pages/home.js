require(['jquery', 'api', 'lodash', 'knockout', 'superSlide', 'knob'],
function ($, API, _, KO, superSlide, knob) {
    function AppViewModel() {
        this.isinit = KO.observable(true);
        this.equList = KO.observableArray([
            { name: 'Bert' },
            { name: 'Charles' },
            { name: 'Denise' },
            { name: 'Denise' }
        ]);
    }

    $(function() {
        var appviewmodel1 = new AppViewModel();
        KO.applyBindings(appviewmodel1, $(".page-home")[0]);

        $(".dial").knob({
            lineCap: 'rounded',
            readonly: true,
            displayInput: false
        });
        $('.dial').removeClass('hide-tem');
        $("#banner").slide({
            autoPlay: false,
            delayTime: 500,
            titCell: ".panel li",
            mainCell: ".slide-wrap",
            effect: "leftLoop"
        });
    });
})
