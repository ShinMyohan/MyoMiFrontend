window.mypageOrderDetail = (orderNum) => {
    localStorage.setItem('orderNum', orderNum)
    location.replace('../mypage/myorderdetail.html')
}

$(()=>{
    let token = Cookies.get('token')

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
            let orderList= jsonObj
            let keys = Object.keys(orderList);
            let values = Object.values(orderList);
            // console.log(Object.values(values[0]))
            // console.log(Object.values(values[1])[0]['orderNum'])

            // console.log(values[1].length)
            if(keys.length == 0) {
                let emptyHTML = `<div class="emptyOrderList">
                                    <h6>최근에 주문한 상품이 없습니다.</h6>
                                </div><hr>`;
                $('#mypageOrderList').append(emptyHTML);
                $('#mypageOrderList').css('display','table-caption');
                $('#mypageOrderList').css('padding','20px');
            }
            for(let i=0; i<= values.length-1; i++) {
                for(let j=0; j<= values[i].length-1; j++) {
                let orderNum = Object.values(values[i])[j]['orderNum'];
                let totalPrice = Object.values(values[i])[j]['totalPrice'].toLocaleString().split(".")[0];
                let createdDate = Object.values(values[i])[j]['createdDate'];
                let payCreatedDate = Object.values(values[i])[j]['payCreatedDate'];
                let canceledDate = Object.values(values[i])[j]['canceledDate'];
                let reviewNum = Object.values(values[i])[j]['reviewNum'];
                let pname = Object.values(values[i])[j]['pname'];
                let payStatus = 0
                let reviewStatus = 0
                let disabled = ''
                let oneOrderLength = values[i].length

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

                    //리뷰 썼는지 확인
                if(reviewNum == null) {
                    reviewCss = 'show'
                    reviewStatus= '리뷰 남기기'
                } else {
                    reviewCss = 'hide'
                    reviewStatus= '리뷰 완료'
                    disabled = 'disabled'
                }

                if( j == 0) {
                    let orderHTML = `<tr>
                                        <td rowspan="${oneOrderLength}" class="order-date" onclick="mypageOrderDetail(${orderNum})">
                                            ${createdDate}<div class="order-num">${orderNum}</div>
                                        <td>
                                            <div
                                                style="display: flex; margin: 0 13px 0 13px; align-items: center;">
                                                <div>
                                                    <a id="pName" onclick="mypageOrderDetail(${orderNum})">
                                                    ${pname}
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                        <td rowspan="${oneOrderLength}">
                                            <strong>${totalPrice}</strong> 원
                                        </td>
                                        <td rowspan="${oneOrderLength}">
                                        <div class="${payCss}">${payStatus}</div>
                                        <td><button type="button" class="btn btn-light review-${reviewCss}" ${disabled}>${reviewStatus}</button></td>
                                    </tr>`
                    $('#mypageOrderList').append(orderHTML);
                }
                if(j >= 1) {
                    let addOrderHTML =  `<tr class="per">
                                            <td>
                                                <div
                                                    style="display: flex; margin: 0 15px 0 15px; align-items: center;">
                                                    <div>
                                                        <a id="pName" onclick="mypageOrderDetail(${orderNum})">
                                                        ${pname}
                                                        </a>
                                                    </div>
                                                </div>
                                            </td>
                                            <td><button type="button" class="btn btn-light review-${reviewCss}">${reviewStatus}</button></td>
                                        </tr>`
                    $('#mypageOrderList').append(addOrderHTML);
                }
}}}})
    }
})
