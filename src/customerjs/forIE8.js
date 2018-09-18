define(['jquery'],
function( $) {
    $(function(){
        var minH = $(window).height() - $("#header").outerHeight()
        if (!Modernizr.cssvhunit && $('.ly-body').height() < minH) {
            $('.ly-body').height(minH)
        }
    })
})