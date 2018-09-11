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
    var chartsOpt1 = {
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
            areaStyle: {},
            smooth: true
        }]
    };
    var chartsOpt2 = {
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'直接访问',
                type:'bar',
                barWidth: '60%',
                data:[10, 52, 200, 334, 390, 330, 220]
            }
        ]
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

        var chart1 = echarts.init(document.getElementById('chart1'));
        chart1.setOption(chartsOpt1);
        var chart2 = echarts.init(document.getElementById('chart2'));
        chart2.setOption(chartsOpt2);

    });
})
