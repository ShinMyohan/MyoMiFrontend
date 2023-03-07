$(()=>{
    //--셀러 상태Bar 확인 START--
    $(document).ready(function(){
        $.ajax({
            url:backURL+'sellerpage/info',
            method:'GET',
            beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        success: function(jsonObj){
        // console.log(jsonObj);
        $(".mp-user-name").html(jsonObj.companyName);
        $(".mp-user-order").html(jsonObj.orderCnt);
        $(".mp-user-qna").html(jsonObj.qnaCnt);
        $(".mp-user-follow").html(jsonObj.followCnt);
        $("div.")
        },
        error: function(xhr){
            alert(xhr);
        }
        });
    });
    //--셀러 상태Bar 확인 END--

    //--상품목록 가져오기 START--
    function showList(){
        let $origin = $("div.prod-list-row").first();
        $("div.prod-list-row").not(":first-child").remove();
        $origin.show();
        $.ajax({
            url: backURL + 'sellerpage/productlist',
            methoe:"get",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            success: function(jsonObj){
                let list = jsonObj;
                // console.log(list)
                let $origin = $("div.prod-list-row").first();
                let $parent = $("div.prod-list-body");
                $(list).each(p=>{
                    let num = list[p]["prodNum"];
                    let name = list[p]["prodName"];
                    let price = list[p]["prodPrice"];
                    let percentage = list[p]["prodPercentage"];
                    let $copy = $origin.clone();

                    $copy.find("div.prod-num").html(num);
                    $copy.find("div.prod-name").html(name);
                    $copy.find("div.prod-price").html(price.toLocaleString()+"원");
                    $copy.find("div.prod-percentage").html(percentage +"%");
                    $copy.find("button#review-detail-btn").val(num);
                    $copy.find("button#prod-detail-btn").val(num);

                    $parent.append($copy);
                });
                $origin.hide();
            },
            error: function(xhr){
                alert(xhr.status);
            },

        });
    } showList()
    //--상품목록 가져오기 END--

    //--리뷰보기 버튼이 클릭되었을 때 할 일 START--
    window.reviewbtn = (val) =>{
        // console.log(val)
        location.href="#"+val
    }
    //--리뷰보기 버튼이 클릭되었을 때 할 일 END--

    //--상세보기 버튼이 클릭되었을 때 할 일 START--
    window.detailbtn = (val) =>{
        // console.log(val)
        location.href="#"+val
    }
    //--상세보기 버튼이 클릭되었을 때 할 일 END--
})