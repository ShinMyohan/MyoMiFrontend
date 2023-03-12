$(() => {
    let token = Cookies.get('token')

    $("div.mp-follow-empty").hide();
    function showList() {
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
                    $copy.find("div.seller-id").html(sellerId);

                    $parent.append($copy);

                });
                if(list == ''){
                    $("div.mp-follow-empty").show();
                }
                $origin.hide();
            },
            error: function(xhr){
                console.log(xhr.status);

            },
        });
    } showList()

    //--방문하기 버튼이 클릭되었을 때 할 일 START--
    $('div.mp-follow-body').on('click', 'div.mp-follow-r>div.mp-follow-col-4>button.visitbtn', (e)=>{
       let sellerid =  $(e.target).parents('.mp-follow-r').find('.seller-id').html();
       console.log(sellerid);
       location.href = "../product/sellerstore.html?"+sellerid
    })
    //--방문하기 버튼이 클릭되었을 때 할 일 END--

    //--언팔로우 버튼이 눌렸을 떄 할일 START--
    $('div.mp-follow-body').on('click', 'div.mp-follow-r>div.mp-unfollow-bt>button.mp-unfollow-btn', (e) => {
        let sellerid = $(e.target).parents('.mp-follow-r').find('.seller-id').html();
        console.log(sellerid);
        $.ajax({
            url: backURL + 'store/follow/' + sellerid,
            method: 'DELETE',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            success: function () {
                alert("언팔로우 되었습니다.");
                window.location.href = "./mypage-followlist.html"
            },
            error: function (xhr) {
                alert(xhr);
            }
        });
    })
    //--언팔로우 버튼이 눌렸을 떄 할일 END--
    
})