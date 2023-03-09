// 상품 장바구니에 추가
function addCart() {
    let token = Cookies.get('token')

    if(token == null) {
        alert('로그인이 필요한 서비스입니다.')
        $('#exampleModal').modal('hide');

    }

    let prodNum = location.search.substring(1).replace('prodNum=', '')
    let prodCnt = $('#result').html()
    let data = {'product' : {'prodNum' : prodNum}, 'prodCnt' : prodCnt}

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
            $('#exampleModal').modal('show');

        }, error: function (xhr) {
            console.log(xhr.status);
        }
    })
}

// 바로 구매
window.buyProduct = () => {
    let token = Cookies.get('token')

    if(token == null) {
        alert('로그인이 필요한 서비스입니다.')
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
