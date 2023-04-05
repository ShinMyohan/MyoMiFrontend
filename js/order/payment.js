$(()=>{
    let token = Cookies.get('token')

    let orderNum = JSON.parse(localStorage.getItem('orderNum'));
    Afterpayment(orderNum)
// 결제 완료 페이지로 이동
function Afterpayment(orderNum) {
    $.ajax({
        type: 'GET',
        url: backURL + 'order/' + orderNum,
        xhrFields: {
            withCredentials: true
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        success: function (response) {
            let orderInfo = response.data;
            // console.log(orderInfo)

            // 주문자 정보 보여주기
            let orderNum = orderInfo['orderNum'];
            let userName = orderInfo['userName'];
            let tel = orderInfo['tel'];
            let addr = orderInfo['addr'];
            // let msg = orderInfo['msg'];
            let deliveryMsg = orderInfo['deliveryMsg'];
            let receiveDate = orderInfo['receiveDate'];
            // let originPrice = orderInfo['originPrice'];
            let usedPoint = orderInfo['usedPoint'];
            let totalPrice = orderInfo['totalPrice'];
            let savePoint = orderInfo['savePoint'];
            let payCreatedDate = orderInfo['payCreatedDate'];
            let orderDetails = orderInfo['orderDetails'];

            let orderDetailsLength = orderDetails.length/5; // 외 *건 때문에 -1
            let originPrice = 0
            if(deliveryMsg = 'null') {
                deliveryMsg = '없음'
            }

            // 상품 원래 금액
            for(let i=0; i<= orderDetailsLength-1; i++) {
                let prodCnt = orderDetails[i * 5 + 3]
                let originPricePerOne = orderDetails[i * 5 + 4]
                originPrice += originPricePerOne * prodCnt
            }

            $('#paymentOrderNum').html(orderNum)
            $('#paymentUserInfo').html(userName + ' / ' + tel + '<br>' + addr)
            $('#paymentRecieveDate').html(' ' + receiveDate)
            $('#paymentDeliveryMsg').html(' ' + deliveryMsg)
            if(orderDetailsLength > 1) {
                $('#paymentProdName').html(orderDetails[1]+ ' 외 ' + (orderDetailsLength-1) + '건' )
            } else {
                $('#paymentProdName').html(orderDetails[1])
            }
            $('#paymentPayCreatedDate').html(payCreatedDate)
            $('#paymentOriginPrice').html(originPrice.toLocaleString().split(".")[0]+'원')
            $('#paymentCoupon').html((originPrice-usedPoint-totalPrice).toLocaleString().split(".")[0]+'원')
            $('#paymentUsedPoint').html(usedPoint.toLocaleString().split(".")[0]+'원')
            $('#paymentTotalPrice').html(totalPrice.toLocaleString().split(".")[0])
            $('#paymentSavePoint').html(savePoint.toLocaleString().split(".")[0])
            localStorage.removeItem('orderNum');
        },
        error: function (xhr) {
            console.log(xhr.status);
        }
    })

}
})

window.paymentOk = () => {
    location.replace("../index.html")
}