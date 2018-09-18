require(['jquery', 'api', 'lodash', 'knockout', 'serialize', 'validate', 'toast','common', 'csPopUp', 'selection', 'jquery_fileupload'],
    function($, API, _, KO, serialize, validate, toast, common, csPopUp, selection, jquery_fileupload) {
        $("#tipBoxA").csPopUp();
        $(function () {
            $("#websites1").msDropDown();
            $("#websites2").msDropDown();
        })
        $('#equipment-pic-upload').fileupload({
            dataType: 'json',
            done: function (e, data) {
                console.log('done', data);
            }
        });
        $('#equipment-pic-upload').fileupload({
            dataType: 'json',
            done: function (e, data) {
                console.log('done', data);
            }
        });
        $('#data-sample-upload').fileupload({
            dataType: 'json',
            done: function (e, data) {
                console.log('done', data);
            }
        });
        // $('#equipment-form').
        
        var ViewModel = function() {
            this.submit = function(){
                var formData = serialize($('#equipment-form')[0], { hash: true });
                API.deviceAdd(formData)._then(function(data){
                    console.log(data);
                })
            }
        }
        var viewmodel = new ViewModel();
        KO.applyBindings( viewmodel ,$("#page-equ-add")[0]);
    }
);