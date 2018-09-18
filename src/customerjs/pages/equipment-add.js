require(['jquery', 'api', 'lodash', 'knockout', 'serialize', 'validate', 'toast','common', 'csPopUp', 'selection', 'jquery_fileupload','jquery_validate'],
    function($, API, _, KO, serialize, validate, toast, common, csPopUp, selection, jquery_fileupload,jquery_validate) {
        $("#tipBoxA").csPopUp();
        $(function () {
           var oDropdown ;
           var msDropDown;
           $.get("/api/v1/categories",function(res){
               if(res.success == 0){
                    var data=res.data;
                    var html="";
                    for(var i = 0; i< data.length; i++){
                        html += '<option value='+data[i].id +'>' + data[i].name + '</option>';
                    }
                    $("#websites1").html(html);
                    oDropdown=$("#websites1").msDropDown().data('dd');
                    $.get("/api/v1/categories/1/sub_categories",function(data){
                        if(data.success == 0){
                            var data = data.data;
                            var html = "";
                            for(var i = 0; i < data.length; i++){
                                html += '<option value='+data[i].id +'>' + data[i].name + '</option>';
                            }
                            $("#websites2").html(html);
                            msDropDown=$("#websites2").msDropDown().data('dd');
                        }
                    })
                    
                    oDropdown.on('change',function(ress){
                        var catId = $(ress.currentTarget).val();
                        $.get("/api/v1/categories/"+catId+"/sub_categories",function(data){
                            if(data.success == 0){
                                var data = data.data;
                                var html = "";
                                for(var i = 0; i < data.length; i++){
                                    html += '<option value='+data[i].id +'>' + data[i].name + '</option>';
                                }
                                $("#websites2").html(html);
                                msDropDown.refresh();
                            }
                        })
                    })
                }
           })
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