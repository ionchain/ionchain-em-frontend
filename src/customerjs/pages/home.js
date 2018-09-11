require(['jquery', 'api', 'lodash', 'knockout', 'superSlide', 'knob','echarts'],
function ($, API, _, KO, superSlide, knob, echarts) {
    function AppViewModel() {
        this.isinit = KO.observable(true);
        this.equList = KO.observableArray([
            { name: 'Bert' },
            { name: 'Charles' },
            { name: 'Denise' },
            { name: 'Denise' }
        ]);
        this.equList2 = KO.observableArray([
            { name: 'Bert' },
            { name: 'Charles' },
            { name: 'Denise' },
            { name: 'Denise' },
            { name: 'Denise' },
            { name: 'Denise' }
        ]);
    }
    var charts1_opt = {
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
        }]
    };
    
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
