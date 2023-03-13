let data = []

$("div.prod-list-empty").hide();

$(() => {
    let uu = backURL + 'sellerpage/productlist';
    //--상품목록 가져오기 START--
    function showProdList(uu) {
        let token = Cookies.get('token')
        let $origin = $("div.prod-list-row").first();
        $("div.prod-list-row").not(":first-child").remove();
        $origin.show();

        $.ajax({
            url: backURL + 'sellerpage/productlist',
            method: "get",
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            success: function (jsonObj) {
                console.log(jsonObj)
                let list = jsonObj;
                console.log(list.length)
                data = [...jsonObj];
                prodList(list);
            },
            error: function (xhr) {
                console.log(xhr.responseJSON);
                if (xhr.responseJSON.details == "NOT_FOUND_PRODUCT") {
                    // if(list.length == ''){
                    $origin.hide();
                    $("div.prod-list-empty").show();
                    // }
                }
            },

        });
    }
    showProdList(uu)
    //--상품목록 가져오기 END--


    $('div.prod-list-body').on('click', 'div.prod-list-row', (e) => {
        let prodNum = $(e.target).parents("div.prod-list-row").find("#prod-num").html();
        location.href = './sellerreviewlist.html?prodnum=' + prodNum
    })
    //--상세보기 버튼이 클릭되었을 때 할 일 START--
    window.detailbtn = (val) => {
        // console.log(val)
        location.href = '../../html/seller/productupdate.html?prodNum=' + val
    }
    //--상세보기 버튼이 클릭되었을 때 할 일 END--
})

function prodList(list) {
    let $origin = $("div.prod-list-row").first();
    let $parent = $("div.prod-list-body");
    let viewNum = 1;
    $parent.empty();

    list.forEach(p => {
        let $copy = $origin.clone();
        $copy.find('#hiddenProdNum').val(p.prodNum)
        $copy.find("div.prod-num").html(viewNum++);
        $copy.find("div.prod-name").html(p.prodName);
        $copy.find("div.prod-price").html(p.prodPrice.toLocaleString() + "원");
        $copy.find("div.prod-percentage").html(p.prodPercentage + "%");
        $copy.find('#sellerProdListImg').attr('src', p.prodImgUrl)
        if (p.status == 2) {
            $copy.find("button#prod-detail-btn").hide();
            $copy.find('#sellerProdListImg').attr('src', p.prodImgUrl)
            $copy.find('#sellerProdListImg').css('filter', 'grayscale(100%)')
            // $("#soldOutDate").css('display', 'none');
            // $("#readOrModify").css('display', '');
            // $copy.find("button#prod-detail-btn").val(p.modifiedDate);
        } else {
            $copy.find('#sellerProdListImg').attr('src', p.prodImgUrl)
            $copy.find("button#review-detail-btn").val(p.prodNum);
            $copy.find("button#prod-detail-btn").show();
            $copy.find("button#prod-detail-btn").val(p.prodNum);
            $copy.find("button#prod-detail-btn").val(p.prodNum);
            $copy.find('#sellerProdListImg').css('filter', '')
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
    switch (cate) {
        case '전체상품':
            prodList(data);
            break;
        case '판매중':
            let onSale = data.filter(p => p.status === 0)
            prodList(onSale);
            break;
        case '임시품절':
            let outOfStock = data.filter(p => p.status === 1)
            prodList(outOfStock);
            break;
        case '품절/판매중지':
            let soldOut = data.filter(p => p.status === 2)
            prodList(soldOut);
            break;
    }
}