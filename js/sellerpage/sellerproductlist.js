let data = []

$("div.prod-list-empty").hide();

$(()=>{
    let token = Cookies.get('token')
    let uu = backURL + 'sellerpage/productlist';
    //--상품목록 가져오기 START--
    function showProdList(uu){
        let token = Cookies.get('token')
        let $origin = $("div.prod-list-row").first();
        $("div.prod-list-row").not(":first-child").remove();
        $origin.show();

        $.ajax({
            url: backURL + 'sellerpage/productlist',
            method:"get",
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            success: function(jsonObj){
                console.log(jsonObj)
                let list = jsonObj;
                data = [...jsonObj];
                // console.log(data)
                prodList(list);
                if(list == ''){
                    $("div.prod-list-empty").show();
                }
            },
            error: function(xhr){
                alert(xhr.status);
            },

        });
    }
    showProdList(uu)
    //--상품목록 가져오기 END--

    //--리뷰보기 버튼이 클릭되었을 때 할 일 START--
    window.reviewbtn = (val) =>{
        // console.log(val)
        location.href = './sellerreviewlist.html?prodnum='+val
    }
    //--리뷰보기 버튼이 클릭되었을 때 할 일 END--

    //--상세보기 버튼이 클릭되었을 때 할 일 START--
    window.detailbtn = (val) =>{
        // console.log(val)
        location.href='../../html/seller/productupdate.html?prodNum='+val
    }
    //--상세보기 버튼이 클릭되었을 때 할 일 END--
})

function prodList(list){
    let $origin = $("div.prod-list-row").first();
    let $parent = $("div.prod-list-body");
    let viewNum = 1;
    $parent.empty();
    list.forEach(p=>{
        let $copy = $origin.clone();

        $copy.find('#hiddenProdNum').val(p.prodNum)
        $copy.find("div.prod-num").html(viewNum++);
        $copy.find("div.prod-name").html(p.prodName);
        $copy.find("div.prod-price").html(p.prodPrice.toLocaleString()+"원");
        $copy.find("div.prod-percentage").html(p.prodPercentage +"%");
        $copy.find('#sellerProdListImg').attr('src', p.prodImgUrl)
        if(p.status === 2) {
            $copy.find("button#prod-detail-btn").hide();
            // $("#soldOutDate").css('display', 'none');
            // $("#readOrModify").css('display', '');
            // $copy.find("button#prod-detail-btn").val(p.modifiedDate);
        } else {
            $copy.find("button#review-detail-btn").val(p.prodNum);
            $copy.find("button#prod-detail-btn").show();
            $copy.find("button#prod-detail-btn").val(p.prodNum);
            // $("#soldOutDate").css('display', 'none');
            // $("#readOrModify").css('display', '');
        }
        $parent.append($copy);
    });
    $origin.hide();
}

function listByStatus(event) {
    //console.log(event.target.value); //도시락, 샐러드, 밀키트
    let $origin = $('.menunav .card');
    let $parent = $('div.productlist');
    let cate = event.target.value;
    console.log(cate);
    $parent.empty()
    // console.log(prodList(list))
    switch(cate) {
        case '전체상품':
            prodList(data);
            break;
        case '판매중':
            let onSale = data.filter(p=>p.status === 0)
            prodList(onSale);
            break;
        case '임시품절':
            let outOfStock = data.filter(p=>p.status === 1)
            prodList(outOfStock);
            break;
        case '품절/판매중지':
            let soldOut = data.filter(p=>p.status === 2)
            prodList(soldOut);
            break;
    }
}