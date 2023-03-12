let token = Cookies.get('token')

window.cancelOrder = () => {
    cancelPayment()
}

function cancelPayment() {
    if (window.confirm("사용하신 쿠폰의 만료기간이 지났을 경우 재사용은 불가능합니다. " + "주문을 취소하시겠습니까?" )) {
        cancelMyPaymemt(); // 주문서 작성
    } else {
    }
}

$(()=>{
getMyOrderDetail()
function getMyOrderDetail() {
    let orderNum = localStorage.getItem('orderNum')

    $.ajax({
        type: 'GET',
        url: backURL + 'order/' + orderNum,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        success: function (response) {
            let orderInfo = response.data;
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
            let length = orderDetails.length/5

            let cancelPrice = '' // 환불 금액
            let cancelMethod = '' // 환불 수단
            let pricePerProd = 0
            let totalOriginPrice = 0 // 주문한 기본 가격

            // 수령일로 부터 3일전 날짜
            let receiveDateString = receiveDate.substring(0,10)
            let receive = new Date(receiveDateString)
            let receiveMinus3 = new Date(receiveDateString)

            receiveMinus3.setDate(receive.getDate() - 2)
            let now = new Date()
            let isValid = Boolean(receiveMinus3 - now > 0)

            if(deliveryMsg = 'null') {
                deliveryMsg = '없음'
            }

            if(canceledDate != null) {
                cancelPrice = totalPrice.toLocaleString().split(".")[0]+' 원'
                cancelMethod = '카카오페이: ' + totalPrice.toLocaleString().split(".")[0]
                $('#detailCancelPrice').html(cancelPrice.toLocaleString().split(".")[0])
            }

            // 수령일로 부터 3일 전에만 버튼 보임
            if(canceledDate == null & isValid) {
                let cancelBtn = '<button type="button" class="btn btn-light" onclick="cancelOrder()">주문취소</button>'
                $('.mp-order-detail-cancel').append(cancelBtn)
            }

            $('#detailOrderNum').html('(주문번호 : ' + orderNum + ')')
            $('#detailUserName').html(userName)
            $('#detailUserAddr').html(addr)
            $('#detailUserTel').html(tel)
            $('#detailDelivery').html(receiveDate + ' / ' + deliveryMsg)
            $('#paymentProdName').html(orderDetails)
            $('#paymentPayCreatedDate').html(payCreatedDate)
            $('#detailPoint').html('- ' + usedPoint.toLocaleString().split(".")[0]+' 원')
            $('#detailTotalPrice').html(totalPrice.toLocaleString().split(".")[0]+' 원')
            $('#detailSavePoint').html('+ ' + savePoint.toLocaleString().split(".")[0]+' 원')
            $('#detailCancelDate').html(canceledDate)
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
                let prodNum = orderDetails[i * 5]
                let prodName = orderDetails[i * 5 + 1]
                let prodImg = orderDetails[i * 5 + 2]
                let prodCnt = orderDetails[i * 5 + 3]
                let originPricePerOne = orderDetails[i * 5 + 4]
                let originPricePerOneShow = originPricePerOne.toLocaleString().split(".")[0]
                pricePerProd  = originPricePerOne * prodCnt
                let pricePerProdShow = pricePerProd.toLocaleString().split(".")[0]
                totalOriginPrice += pricePerProd

                let prodHref = "../../html/product/productinfo.html?prodNum=" + prodNum

                let orderHTML = `<tr>
                                    <td>
                                        <div class="order-prod-name">
                                            <span><img src="${prodImg}" style="width:3.5em; height:3.5em; margin-right: 15px;"></span>
                                                <a id="toProdInfo" href="${prodHref}">
                                                    ${prodName}
                                                </a>
                                        </div>
                                    </td>
                                    <td>
                                        <strong>${originPricePerOneShow}</strong> 원 / ${prodCnt}개
                                    </td>
                                    <td class="price-per-prod">${pricePerProdShow} 원</td>
                                    <td class="${payCss}">${payStatus}</td>
                                </tr>`;

                $('#mypageOrderDetail').append(orderHTML);
            }
            $('#detailOriginPrice').html(totalOriginPrice.toLocaleString().split(".")[0]+' 원')
            $('#detailCoupon').html('- ' + (totalOriginPrice-usedPoint-totalPrice).toLocaleString().split(".")[0]+' 원')
        },
        error: function (xhr) {
            console.log(xhr.status);
        }
    })
}
})

function cancelMyPaymemt() {
    let orderNum = localStorage.getItem('orderNum')

    $.ajax({
        type: 'PATCH',
        url: backURL + 'payment/cancel/' + orderNum,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        success: function (response) {
            location.reload()
            alert('취소가 완료되었습니다.')
            let res = response;
            console.log(res)
        }, error: function(xhr) {
            console.log(xhr.status)
        }
    })
}