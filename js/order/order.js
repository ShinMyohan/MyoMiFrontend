window.getMyPoint = () => {
    getTotalPoint()
}

window.applyPoint = () => {
    pointApplyAmount()
}

window.createOrderButton = () => {
    confirmPayment()
}

function confirmPayment() {
    if (window.confirm("결제 하시겠습니까?")) {
        createOrder(); // 주문서 작성
    } else {
        console.log("결제를 취소하였습니다.");
    }
}
$(()=>{
    let totalPrice = 0
    let discountPrice = 0
    let payPrice = 0

    // 주문 상품 목록 & 금액 가져오기
    function getOrderProdInfo() {
        let orderList = JSON.parse(localStorage.getItem('orderList'));
        for(let i=0; i<= orderList.length-1; i++) {
                // let prodNum = orderList[i].prodNum;
                let prodName = orderList[i].name;
                let prodCnt = orderList[i].prodCnt;
                let originPrice = orderList[i].originPrice
                let percentage = orderList[i].percentage;
                let prodPrice = ((originPrice - originPrice*(percentage/100))*prodCnt).toLocaleString();

                // 상품 목록 아래에 나올 금액들
                totalPrice += (originPrice * prodCnt)
                discountPrice += originPrice * (percentage/100) * prodCnt
                payPrice += (originPrice - originPrice*(percentage/100)) * prodCnt
                console.log('totalPrice1 : ' + totalPrice)
                let productHTML = `<div id="orderProduct">
                                        <img src="../../imgs/shin.png" class="rounded" id="img">
                                        <div id="productDetail" class="col">
                                            <h6>상품명</h6>
                                            <h5 id="orderProductName">${prodName}</h5>
                                        </div>
                                        <div id="options" class="col-2">
                                            <h6>할인율</h6>
                                            <h5 id="orderProductCnt">${percentage}%</h5>
                                        </div>
                                        <div id="options" class="col-2">
                                            <h6>수량</h6>
                                            <h5 id="orderProductCnt">${prodCnt}개</h5>
                                        </div>
                                        <div id="options" class="col-2">
                                            <h6>금액</h6>
                                            <h5 id="orderProductPrice">${prodPrice}원</h5>
                                        </div>
                                    </div><hr>`;
                $('#orderProductList').append(productHTML);
        }
        $('#totalPrice').html(totalPrice.toLocaleString() + '원')
        $('#discountPrice').html(discountPrice.toLocaleString() + '원')
        $('#payPrice').html(payPrice.toLocaleString() + '원')
        $('#totalProdPrice').val(payPrice.toLocaleString().split(".")[0])
        $('#totalPayPrice').val(payPrice.toLocaleString().split(".")[0])
        $('#totalPay').html(payPrice.toLocaleString().split(".")[0] + '원')
        $('#savePoint').val((payPrice/100).toLocaleString().split(".")[0])
}
    // 회원 정보 가져오기
    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: backURL + 'user/info',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            success: function (jsonObj) {
                let userInfo = jsonObj;

            // 주문자 정보 보여주기
            let name = userInfo['name'];
            let tel = userInfo['tel'];
            let email = userInfo['email'];
            let addr = userInfo['addr'];

            $('#orderName').val(name)
            $('#orderTel').val(tel)
            $('#orderEmail').val(email)
            $('#addrDetail').val(addr)
        }, error: function (xhr) {
    }
})
}


    // 수령일 나타내기 -> 최소 4일 후
    function getDateList() {

        document.getElementById('receiveDate').value = new Date().toISOString().substring(0, 10);

        // // let today = new Date().toISOString().split('T')[0];
        // let date3m = new Date();
        // date3m.setDate(date3m.getDate() + 3);
        // date3m = date3m.toISOString().split('T')[0];
        // // document.getElementsById("receiveDate")[0].setAttribute('min', today);
        // document.getElementById('receiveDate')[0].setAttribute('max', date3m)

        // for(let i = 1; i<= 10; i++) {
        //     if($("#receiveDate").index.val() == i){
        //         $("#receiveDate").html(dateStr + i)
        //     }
        // }
    }


    getUserInfo()
    getOrderProdInfo()
    getDateList()

})


//----------------------------------------- 쿠폰 ----------------------------------------------
window.couponModal = () => {
    userId = 'user2'
    getCouponList(userId)
}

// 내 쿠폰 목록 조회하기
function getCouponList() {
    $('div.couponParent').empty();
    let couponNum = localStorage.getItem('coupon')

    $.ajax({
        method: 'GET',
        url: backURL + 'mypage/couponList',
        data: {},
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        success: function (jsonObj) {
            let couponList = jsonObj;
            console.log(couponList)
            // couponList(list)

            for (let i = 0; i < couponList.length; i++) {
                let num = couponList[i]['couponNum'];
                // let userId = coupon['USER_ID'];
                let sort = couponList[i]['sort'];
                let percentage = couponList[i]['percentage'];
                let createdDate = couponList[i]['createdDate'];
                let usedDate = couponList[i]['usedDate'];
                let expiredDate = moment(createdDate, 'YYYYMMDD').add("7","d").format("YYYY-MM-DD")
                let couponName;
                switch(sort) {
                    case 0 :
                        couponName = '회원가입 쿠폰';
                        break;
                    case 1 :
                        couponName = '등급업 쿠폰 (골드)';
                        break;
                    case 2 :
                        couponName = '등급업 쿠폰 (플래티넘)';
                        break;
                    case 3 :
                        couponName = '등급업 쿠폰 (다이아몬드)';
                        break;
                }
                if(usedDate == null) {
                let couponHTML = `<div id="couponList">
                                    <span class="col-2"><input type="radio" class="form-check-input" name="radio" id=${num} onclick="couponApply(${num}, ${percentage})" unchecked></span>
                                    <span class="col-4" id="couponName">${couponName}</span>
                                    <span class="col-2" id="couponPercentage">${percentage}%</span>
                                    <span class="col-2" id="couponDate">${expiredDate}</span>
                                </div>`;
                $('div.couponParent').append(couponHTML);
            }
                if( couponNum != 0) {$(`input[id=${couponNum}]`).attr("checked", true)}
        }},
        error: function (xhr) {
            console.log(xhr.status);
        }
    });
}

// 어떤 쿠폰을 사용했는지 num 가져오기
window.couponApply = (num, percentage) => {
    if("input[type=radio][name=radio]:checked") {
        localStorage.setItem('coupon', num);
        couponApplyAmount(percentage)
    } else {
        localStorage.setItem('coupon', 0);
    }
}
// 쿠폰 할인액 보여주기
function couponApplyAmount(percentage) {
    let price = $('#totalProdPrice').val().replace(',', '')
    let amount = price * percentage/100
    let point = $('#usedPoint').val().replace(',', '')
    $('#couponAmount').html(amount.toLocaleString().split(".")[0]+'원')
    let total = (price - amount - point)
    if(total < 100) {
        alert('최소 결제금액은 100원 입니다.')
        localStorage.setItem('coupon', 0);
        $('#couponAmount').html('')
    } else {
        $('#totalPayPrice').val(total.toLocaleString().split(".")[0])
        $('#savePoint').val(((price - amount - point) / 100).toLocaleString().split(".")[0])
        $('#totalPay').html(total.toLocaleString().split(".")[0]+'원')
    }
}

// 쿠폰 조회 모달에서 적용취소를 눌렀을 경우 checked를 풀기
window.couponCancel = () => {
	localStorage.setItem('coupon', 0);
};

//----------------------------------------- 포인트 ----------------------------------------------
// 포인트 조회
function getTotalPoint() {
    $.ajax({
        method: 'GET',
        url: backURL + 'point',
        data: {},
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        success: function (jsonObj) {
            let point = jsonObj;
            console.log(point)

            let totalPoint = point['totalPoint'];
            $('#usedPoint').val(totalPoint.toLocaleString().split(".")[0])

        },
        error: function (xhr) {
            console.log(xhr.status);
        }
    });
}

// 포인트 적용 금액 -> 가진 포인트보다 작은금액이면 0원, 그만큼만 쓰이도록
function pointApplyAmount() {
    let price = $('#totalProdPrice').val().replace(',', '')
    let coupon = $('#couponAmount').val().replace(',', '')
    let point = $('#usedPoint').val().replace(',', '')
    let afterUsedPointTotal = (price - coupon - point)
    let total = 0
    if(afterUsedPointTotal < 100) {
        point = price - coupon - 100
        $('#usedPoint').val(point)
        total = 100;
        alert('최소 결제 금액은 100원 입니다.')
    } else {
        total = afterUsedPointTotal
    }
    $('#totalPayPrice').val(total.toLocaleString().split(".")[0])
    $('#savePoint').val(Math.round(total / 100).split(".")[0].toLocaleString())
    $('#totalPay').html(total.toLocaleString().split(".")[0]+'원')
}

// ----------------------------------- 주문 -----------------------------------
// 결제하기 버튼누르면 실행
function createOrder() {
    console.log('createOrder들어옴')
    // 수신자 정보
    let msg = $('input[id=orderMsg]').val();
    // 할인혜택
    let couponNum = localStorage.getItem('coupon');
    let usedPoint = $('input[id=usedPoint]').val().replace(',', '');
    if(usedPoint == '') {usedPoint = 0} // 빼고 기본을 0으로 두기
    let totalPrice = $('input[id=totalPayPrice]').val().replace(',', '');
    let savePoint = $('input[id=savePoint]').val().replace(',', '');

    // 상품 정보
    let orderDetails = JSON.parse(localStorage.getItem('orderList'));
    console.log(orderDetails)
    // 배송정보
    let name = $('input[id=name]').val();
    let tel = $('input[id=tel]').val();
    let addr = $('input[id=postcode]').val() + $('input[id=roadAddress]').val() + $('input[id=extraAddress]').val();
    let deliveryMsg = $('input[id=deliveryMsg]').val();
    let receiveDate = $('input[id=receiveDate]').val();


    // if (receiverName == '') { alert('받는 사람 닉네임을 입력해주세요!');return;}
    // if (postNum == '') {alert('우편번호를 선택해주세요!');return;}
    // if (addr == '') {alert('주소를 입력해주세요!');return;}
    // if (addrDetail == '') {alert('상세 주소를 입력해주세요!');return;}
    // if (tel == '') {alert('수신자 핸드폰 번호를 입력해주세요!');return;}
    // if (receiveDate == '') {alert('수령일을 선택해주세요!');return;}

    let data = { 'msg': msg, 'couponNum': couponNum, 'usedPoint': usedPoint,
    'totalPrice': totalPrice, 'savePoint': savePoint, "orderDetails": orderDetails,
        "delivery": {"name" : name, "tel" : tel, "addr" : addr, "deliveryMsg" : deliveryMsg,
        "receiveDate" : receiveDate}};


    console.log(data)
    $.ajax({
        type: 'POST',
        url: backURL + 'order',
        data: JSON.stringify(data),
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        success: function (response) {
            console.log(response);
            alert('주문 완료!');
            localStorage.setItem('coupon', 0);
            payment(response) // 주문 번호
        },
        error: function (xhr) {
            alert('입력 항목을 확인해주세요!');
            console.log(xhr.status);
        }
    });
}


//---------------------------------------- 아임포트 결제 -------------------------------------------------
function payment(orderNum) {
    console.log('payment 들어왔다')
    let data = {
        orderNum : orderNum,
        name : $('input[id=orderName]').val(),
        email : $('input[id=orderEmail]').val(),
        tel : $('input[id=tel]').val(),
        totalPrice : $('input[id=totalPayPrice]').val().replace(',', ''),
        postNum : $('input[id=postcode]').val(),
        addr : $('input[id=roadAddress]').val() + " " + $('input[id=extraAddress]').val(),
    }
    paymentCard(data)
}

// 카드 결제
function paymentCard(data) {
    console.log('카드결제 들어왔다')
    console.log('주문 번호 : ' + data.orderNum)
    var IMP = window.IMP;

	IMP.init("imp48531312");  // 가맹점 식별 코드

	IMP.request_pay({ // param
        pg: "kakaopay.TC0ONETIME",
        pay_method: "card",
        merchant_uid: 'orderNum_' + data.orderNum,
        name: 'Myomi(묘미)', // 상호명
        amount: data.totalPrice,
        buyer_name: data.name,
        buyer_email: data.email,
        buyer_tel: data.tel,
        buyer_postcode: data.postNum,
        buyer_addr: data.addr,
        vat_amount: 9, // 부가세
        customer_uid : 'orderNum_' + data.orderNum // 0원 결제시 필요
        // m_redirect_url: "/payment",
},
	function (rsp) { // callback
        alert('성공?')
		if (rsp.success) {
         // 결제 성공 시 로직,
        data.impUid = rsp.imp_uid; // 고유 id
        data.merchant_uid = rsp.merchant_uid; // 상점 거래 id
        // data.totalPrice = rsp.paid_amount // 결제 금액
        data.payCreatedDate = rsp.paid_at // 1677823984
        alert(data.payCreatedDate)
        alert(data.payCreatedDate)
        paymentComplete(data);

		} else {
          // 결제 실패 시 로직,
            var msg = '결제에 실패하였습니다.';
            msg += '에러내용 : ' + rsp.error_msg
            alert(msg);
		}
	});
}

// 계산 완료
function paymentComplete(data) {
    alert('결제완료 들어왔다')
    $.ajax({
        url: backURL + "payment",
        method: "PUT",
        data: JSON.stringify(data),
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
    })
    .done(function(result) {
        // if(rsp.paid_amount == data.response.amount)
        // messageSend();
        // swal({
        //     text: result,
        //     closeOnClickOutside : false
        // })
        // .then(function(){
            alert('결제 완료')
            // location.replace("/orderList");
            localStorage.removeItem('cartList');
            localStorage.removeItem('orderList');
            localStorage.removeItem('coupon');
        // })
    }) // done
    .fail(function() {
        alert("에러"); // --> 아임포트에서 결제 취소되도록
        // location.replace("/");
    })
}