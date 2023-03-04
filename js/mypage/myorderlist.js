$(document).ready(function(){
    $(function() {
        $('input[name="daterange"]').daterangepicker({
            "startDate": "2023/02/10",
            "endDate": "2023/02/26",
            opens: 'center',
            locale: {
            format: 'YYYY/MM/DD'
            }
        });
    });
    getOrderList()
});


function getOrderList() {

    $.ajax({
        method: 'GET',
        url: backURL + 'order/list',
        data: {},
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        success: function (jsonObj) {
            let orderList = jsonObj;
            console.log(orderList)

    for(let i=0; i<= orderList.length-1; i++) {
        let orderNum = orderList[i]['orderNum'];
        let totalPrice = orderList[i]['totalPrice'];
        let payCreatedDate = orderList[i]['payCreatedDate'];
        let canceledDate = orderList[i]['canceledDate'];
        let reviewNum = orderList[i]['reviewNum'];
        let pname = orderList[i]['pname'];
        let payStatus = 0
        let reviewStatus = 0


        if(reviewNum == null) {
            reviewCss = 'show'
            reviewStatus= '리뷰 남기기'
        } else {
            reviewCss = 'hide'
            reviewStatus= '리뷰 완료'
        }

        if(canceledDate != null) {
            payStatus = '주문 취소'
            payCss = 'pay-cancel'
            reviewCss = 'hide'
            reviewStatus= '취소된 주문'
        } else if(payCreatedDate != null) {
            payStatus = '결제 완료'
            payCss = 'pay-complete'
        } else {
            payStatus = '주문 취소'
            payCss = 'pay-cancel'
            reviewCss = 'hide'
            reviewStatus= '취소된 주문'
        }

        let orderHTML = `<tr>
                                <td class="order-num">2023/01/07
                                    <div>${orderNum}</div>
                                </td>
                                <td>
                                    <div class="img-prod">
                                        <span><a href="#"><img src="../../images/shin.png"
                                                    style="width:3em; height:3em; margin-right: 7px;"></a></span>
                                        <div><a href="#">${pname}</a></div>
                                    </div>
                                </td>
                                <td>
                                    <strong>${totalPrice}원</strong> / 1개
                                </td>
                                <td class="${payCss}">${payStatus}</td>
                                <td><button type="button" id="reviewStatus" class="btn btn-light review-${reviewCss}">${reviewStatus}</button>
                                </td>
                            </tr>`;
        $('#mypageOrderList').append(orderHTML);
    }
    }
})
}