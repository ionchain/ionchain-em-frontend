require(['jquery', 'api', 'lodash', 'knockout', 'serialize', 'validate', 'toast','common', 'csPopUp', 'selection'],
    function($, API, _, KO, serialize, validate, toast, common, csPopUp, selection) {
        $("#tipBoxA").csPopUp();
        $(function () {
            $("#websites1").msDropDown();
            $("#websites2").msDropDown();
        })
    }
);