// 상품 장바구니에 추가
function addCart() {
    let token = Cookies.get('token')

    if(token == null) {
        alert('로그인이 필요한 서비스입니다.')
        $('#exampleModal').modal('hide');

    }

    let prodNum = location.search.substring(1).replace('prodNum=', '')
    let prodCnt = $('#result').html()
    let data = {'prodNum' : prodNum, 'prodCnt' : prodCnt}

    $.ajax({
        method: 'POST',
        url: backURL + 'cart',
        data : JSON.stringify(data),
        xhrFields: {
            withCredentials: true
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        success: function (jsonObj) {
            // $('#exampleModal').modal({backdrop: 'static', keyboard: false});
            $('#exampleModal').modal('show');

        }, error: function (xhr) {
            // console.log(xhr)
            if(xhr.responseJSON.details == 'PRODUCT_STATUS_ERROR') {
                alert('품절인 상품은 장바구니에 담을 수 없습니다.')
            } else if(xhr.responseJSON.status == 401) {
                alert(xhr.responseJSON.details)
            }
        }
    })
}

// 바로 구매
window.buyProduct = () => {
    let token = Cookies.get('token')
    let prodStatus = JSON.parse(localStorage.getItem('cartList')).status

    if(token == null) {
        alert('로그인이 필요한 서비스입니다.')
    } else if(prodStatus == 1) {
        alert('품절된 상품은 구매할 수 없습니다.')
    } else {
        let cnt = $('#result').html()
        let prodCnt = parseInt(cnt)
        prodInfo = JSON.parse(localStorage.getItem('cartList'));
        prodInfo.prodCnt = prodCnt
        data = []
        data.push(prodInfo)
        localStorage.setItem('orderList', JSON.stringify(data));

        location.replace('../order/order.html')
    }
}
