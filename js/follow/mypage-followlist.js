    // 체크박스 전체선택,해제
    function checkAll() {
        if($("#cboxAll").is(':checked')) {
            $("input[name=cbox]").prop("checked", true);
        } else {
            $("input[name=cbox]").prop("checked", false);
        }
    }

    //하위박스 모두 체크시, 전체체크박스 체크
    $(document).on("click", "input:checkbox[name=cbox]", function(e) {
	
        var chks = document.getElementsByName("cbox");
        var chksChecked = 0;
        
        for(var i=0; i<chks.length; i++) {
            var cbox = chks[i];
            
            if(cbox.checked) {
                chksChecked++;
            }
        }
        
        if(chks.length == chksChecked){
            $("#cboxAll").prop("checked", true);
        }else{
            $("#cboxAll").prop("checked",false);
        }
        
    });

$(()=>{

    


})