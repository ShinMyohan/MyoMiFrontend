window.mypageOrderDetail = (orderNum) => {
    getMyOrderDetail(orderNum)
}

$(()=>{
    getMyOrderDetail(68)

function getMyOrderDetail(orderNum) {
    $.ajax({
        type: 'GET',
        url: backURL + 'order/' + orderNum,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        success: function (response) {
            let orderInfo = response;
            console.log(orderInfo)

            // 주문자 정보 보여주기
            let orderNum = orderInfo['orderNum'];
            let userName = orderInfo['userName'];
            let tel = orderInfo['tel'];
            let addr = orderInfo['addr'];
            // let msg = orderInfo['msg'];
            let deliveryMsg = orderInfo['deliveryMsg'];
            let receiveDate = orderInfo['receiveDate'];
            let usedPoint = orderInfo['usedPoint'];
            let totalPrice = orderInfo['totalPrice'];
            let savePoint = orderInfo['savePoint'];
            let createdDate = orderInfo['createdDate'];
            let payCreatedDate = orderInfo['payCreatedDate'];
            let canceledDate = orderInfo['canceledDate'];
            let orderDetails = orderInfo['orderDetails'];
            let length = orderDetails.length/4
            console.log(length)
            let cancelPrice = '' // 환불 금액
            let cancelMethod = '' // 환불 수단
            let pricePerProd = 0
            let totalOriginPrice = 0 // 주문한 기본 가격
            // $('div.mp-order-detail-table tbody tr td').attr('rowspan', length);

            if(deliveryMsg = 'null') {
                deliveryMsg = '없음'
            }

            if(canceledDate != null) {
                cancelPrice = totalPrice.toLocaleString().split(".")[0]+'원'
                cancelMethod = '카카오페이: ' + totalPrice.toLocaleString().split(".")[0]
            }


            $('#detailOrderNum').html('(주문번호 : ' + orderNum + ')')
            $('#detailUserName').html(userName)
            $('#detailUserAddr').html(addr)
            $('#detailUserTel').html(tel)
            $('#detailDelivery').html(receiveDate + ' / ' + deliveryMsg)
            $('#paymentProdName').html(orderDetails)
            $('#paymentPayCreatedDate').html(payCreatedDate)
            $('#detailPoint').html('- ' + usedPoint.toLocaleString().split(".")[0]+'원')
            $('#detailTotalPrice').html(totalPrice.toLocaleString().split(".")[0]+'원')
            $('#detailSavePoint').html('+ ' + savePoint.toLocaleString().split(".")[0]+'원')
            $('#detailCancelDate').html(canceledDate)
            $('#detailCancelPrice').html(cancelPrice)
            $('#detailCancelMethod').html(cancelMethod)


            let payStatus = ''
            if(canceledDate != null) {
                payStatus = '주문 취소'
                payCss = 'pay-cancel'
            } else if(payCreatedDate != null) {
                payStatus = '결제 완료'
                payCss = 'pay-complete'
            } else {
                payStatus = '주문 취소'
                payCss = 'pay-cancel'
            }


            for(let i=0; i<= length-1; i++) {
                let prodNum = orderDetails[i * 4]
                let prodName = orderDetails[i * 4 + 1]
                let prodCnt = orderDetails[i * 4 + 2]
                let originPricePerOne = orderDetails[i * 4 + 3]
                pricePerProd  = originPricePerOne * prodCnt
                totalOriginPrice += pricePerProd

                let orderHTML = `<tr>
                                    <td>
                                        <div class="order-prod-name">
                                            <span><a href="#"><img src="../../images/shin.png"
                                                        style="width:3.5em; height:3.5em; margin-right: 15px;"></a></span>
                                            <div>
                                                <a href="#">
                                                    ${prodName}
                                                </a>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <strong>${originPricePerOne}</strong>원 / ${prodCnt}개
                                    </td>
                                    <td class="price-per-prod">${pricePerProd}원</td>
                                    <td class="${payCss}">${payStatus}</td>
                                </tr>`;
                $('#mypageOrderDetail').append(orderHTML);
            }
            $('#detailOriginPrice').html(totalOriginPrice.toLocaleString().split(".")[0]+'원')
            $('#detailCoupon').html('- ' + (totalOriginPrice-usedPoint-totalPrice).toLocaleString().split(".")[0]+'원')
        },
        error: function (xhr) {
            console.log(xhr.status);
        }
    })

}
})