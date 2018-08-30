define(['toast', 'lodash'], function( toast, _ ) {
    _.assign($.toast.options, {
        showHideTransition: 'slide',
        position: 'top-center'
    })
})