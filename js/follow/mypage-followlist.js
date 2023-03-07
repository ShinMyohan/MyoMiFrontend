$(()=>{
    function showList(){
        let $origin = $("div.mp-follow-r").first();
        $("div.mp-follow-r").not(":first-child").remove();
        $origin.show();
        $.ajax({
            url: backURL +'mypage/follow',
            methoe:"get",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            success: function(jsonObj){
                let list = jsonObj;
                console.log(list)
                let $origin = $("div.mp-follow-r").first();
                let $parent = $("div.mp-follow-body");
                $(list).each(p=>{
                    let storeName = list[p]["companyName"];
                    let followCnt = list[p]["followCnt"];
                    let sellerId = list[p]["sellerId"];
                    let $copy = $origin.clone();

                    $copy.find("#store-name").html(storeName);
                    $copy.find("#follow-cnt").html(followCnt);
                    $copy.find("button#visitbtnn").val(sellerId);
                    $parent.append($copy);
    
                });
                $origin.hide();
            },
            error: function(xhr){
                alert(xhr.status);
            },
        });
    } showList()

    //--방문하기 버튼이 클릭되었을 때 할 일 START--
    window.visitBtn = (val) => {
        console.log(val)
        location.href="../store/follow.html?" + val
    }
    //--방문하기 버튼이 클릭되었을 때 할 일 END--

    //--팔로우 선택해서 언팔로우하기 START--
    
    let s = $("input:radio[name='{cbox}']:checked").val();
    // let sellerId = document.getElementsByName('cbox').values; 
    //--팔로우 선택해서 언팔로우하기 END--
})