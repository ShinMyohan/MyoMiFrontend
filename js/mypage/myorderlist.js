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
            console.log(orderList)

            // Object 객체 배열로 반환
            let array = Object.keys(orderList.data).reverse().map(item => orderList.data[item]);

            if(array.length == 0) {
                let emptyHTML = `<div class="emptyOrderList">
                                    <h6>최근에 주문한 상품이 없습니다.</h6>
                                </div><hr>`;
                $('#mypageOrderList').append(emptyHTML);
                $('#mypageOrderList').css('display','table-caption');
                $('#mypageOrderList').css('padding','20px');
            }

            for(let i=0; i<= array.length-1; i++) { // 1부터 시작
                for(let j=0; j<= array[i].length-1; j++) {
                    let orderNum = array[i][j]['orderNum'];
                    let totalPrice = array[i][j]['totalPrice'].toLocaleString().split(".")[0];
                    let createdDate = array[i][j]['createdDate'];
                    let payCreatedDate = array[i][j]['payCreatedDate'];
                    let canceledDate = array[i][j]['canceledDate'];
                    let reviewNum = array[i][j]['reviewNum'];
                    let pname = array[i][j]['pname'];
                    let prodNum = array[i][j]['prodNum'];
                    let payStatus = 0
                    let reviewStatus = 0
                    let disabled = ''
                    let oneOrderLength = array[i].length

                    if(canceledDate !== null || payCreatedDate == null) {
                        payStatus = '주문 취소'
                        payCss = 'pay-cancel'
                    } else if(payCreatedDate !== null) {
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
                                                        <div class="prod-num" style="display : none">${prodNum}</div>
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
                                                            <div class="order-num" style="display : none">${orderNum}</div>
                                                            <div class="prod-num" style="display : none">${prodNum}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td><button type="button" class="btn btn-light review-${reviewCss}">${reviewStatus}</button></td>
                                            </tr>`
                        $('#mypageOrderList').append(addOrderHTML);
                    }
                }}
            }, error : function(xhr) {
                            console.log(xhr.responseJSON)
                        }
                    })
                }

    $('#mypageOrderList').on('click', 'button.review-show', (e) => {
        let orderNum = $(e.target).parents("#mypageOrderList>tr").find("div.order-num").html();
        let prodNum = $(e.target).parents("#mypageOrderList>tr").find("div.prod-num").html();
        location.href = '../../html/review/addreview.html?ordernum='+orderNum+'&prodnum='+prodNum
    })
})