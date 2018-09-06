require(['jquery', 'api', 'lodash', 'knockout', 'superlide'],
function ($, API, _, KO, superlide) {
    $("#banner").slide({
        autoPlay: false,
        delayTime: 500,
        titCell: ".panel li",
        mainCell: ".slide-wrap",
        effect: "leftLoop"
    });
})
