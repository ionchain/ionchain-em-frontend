require(['jquery', 'api', 'lodash', 'knockout', 'superSlide', 'knob','echarts'],
function ($, API, _, KO, superSlide, knob, echarts) {
    
    function hour24(){
        var result = []
        for(var i=1;i<24;i++){
            result.push(i + '')
        }
        return result
    }
    function years(current){
        var len = 3;
        var result = [];
        for(var i=current;i<current+ len;i++){
            result.push(i + '')
        }
        return result
    }

    var _hour24 = hour24();
    var _years = years(new Date().getFullYear())
    var period = { //横坐标种类
        '24h': _hour24,
        week: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        month: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
        year: _years
    }

    var chart1,chart2;
    var chartsOpt1 = {
        color: '#08AEB2',
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: _hour24
        },
        grid: chartGrid,
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
        color: '#08AEB2',
        xAxis: {
            type: 'category',
            data:  period['24h']
        },
        grid: chartGrid,
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [10, 52, 200, 334, 390, 330, 220],
            type: 'bar'
        }]
    };
    
    function AppViewModel() {
        this.canvasError = KO.observable(false);
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
        this.changePeriod = function(_period, Model, event){
            if (Modernizr.canvas) {// 判断是否支持canvas
                chartsOpt1.xAxis.data = period[_period]
                chart1.setOption(chartsOpt1);
                $(event.target).addClass('active').siblings().removeClass('active')
            }
        },
        this.changePeriod2 = function(_period, Model, event){
            if (Modernizr.canvas) {// 判断是否支持canvas
                chartsOpt2.xAxis.data = period[_period];
                chart2.setOption(chartsOpt2);
                $(event.target).addClass('active').siblings().removeClass('active')
                console.log(chart2,_period);
            }
        }
    }
   
    var chartGrid = {
        top: '3%',
        left: '3%',
        right: '4%',
        bottom: '11%',
        containLabel: true
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

        if (Modernizr.canvas) {// 判断是否支持canvas
            chart1 = echarts.init(document.getElementById('chart1'));
            chart1.setOption(chartsOpt1);
            chart2 = echarts.init(document.getElementById('chart2'));
            chart2.setOption(chartsOpt2);
        } else {
            appviewmodel1.canvasError(true);
        }

    });
})
