let token = Cookies.get('token')

// window.buyProduct = () => {
//     let prodCnt = $('#result').html()
//     let cartList = localStorage.getItem('cartList');
//     var prodInfo = JSON.parse(localStorage.getItem('cartList'));
//     prodInfo.push('prodCnt', prodCnt);
//     localStorage.setItem('cartList', JSON.Stringify(prodInfo));

//     location.replace('../order/payment.html')
// }

window.getMyPoint = () => {
    getTotalPoint()
}

window.applyPoint = () => {
    pointApplyAmount()
}

window.createOrderButton = () => {
    confirmPayment()
}

// 전화번호 하이픈(-)
const telHyphen = (target) => {
    target.value = target.value
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
}

function confirmPayment() {
    if (window.confirm("결제 하시겠습니까?")) {
        createOrder(); // 주문서 작성
    } else {
        alert("결제를 취소하였습니다.");
    }
}
$(()=>{
    localStorage.setItem('coupon', 0);
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
                let prodImg = orderList[i].productImgUrl;
                let prodPrice = ((originPrice - originPrice*(percentage/100))*prodCnt).toLocaleString().split(".")[0];

                // 상품 목록 아래에 나올 금액들
                totalPrice += (originPrice * prodCnt)
                discountPrice += originPrice * (percentage/100) * prodCnt
                payPrice += (originPrice - originPrice*(percentage/100)) * prodCnt
                let productHTML = `<div id="orderProduct">
                                        <img src="${prodImg}" class="rounded" id="img">
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
        $('#totalPrice').html(totalPrice.toLocaleString().split(".")[0] + '원')
        $('#discountPrice').html(discountPrice.toLocaleString().split(".")[0] + '원')
        $('#payPrice').html(payPrice.toLocaleString().split(".")[0] + '원')
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
            xhrFields: {
                withCredentials: true
            },
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

    getUserInfo()
    getOrderProdInfo()
    getDateList()

})

 // 수령일 나타내기 -> 최소 5일 전에 주문 가능
function getDateList() {

    let today = new Date()//.toISOString().substring(0, 10);
    let minDate = new Date(today);

    let days = ['일','월','화','수','목','금','토'];

$("#selectRecieveDate").each(function() {
    for(i=0; i<= 9; i++) {
        minDate.setDate(today.getDate() + 5 + i) // 일자
        let dayName = days[minDate.getDay()]; // 요일

        const year = minDate.getFullYear();
        const month = minDate.getMonth() + 1;
        const date = minDate.getDate();

        // yyyy-mm-dd 형식으로 변환
        let receiveDate = `${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`;
        $(`#selectRecieveDate option:eq(${i})`).replaceWith(`<option>${receiveDate} (${dayName})</option>`);
    }
})
}


//----------------------------------------- 쿠폰 ----------------------------------------------
window.couponModal = () => {
    getCouponList()
}

// 내 쿠폰 목록 조회하기
function getCouponList() {
    $('div.couponParent').empty();
    let couponNum = localStorage.getItem('coupon')

    $.ajax({
        method: 'GET',
        url: backURL + 'mypage/couponList',
        data: {},
        xhrFields: {
            withCredentials: true
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        success: function (jsonObj) {
            let couponList = jsonObj;

            if(couponList.length == 0) {
                let emptyHTML = `<div class="emptyCoupon">
                                    <h6>사용가능한 쿠폰이 없습니다.</h5>
                                </div>`;
                // $('div.cart-box-detail').first().hide();
                $('div.couponParent').append(emptyHTML);
            }

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
                        couponName = '회원가입 축하 할인쿠폰!';
                        break;
                    case 1 :
                        couponName = '골드 레벨 달성 축하 할인쿠폰!';
                        break;
                    case 2 :
                        couponName = '플래티넘 레벨 달성 축하 할인쿠폰!';
                        break;
                    case 3 :
                        couponName = '다이아몬드 레벨 달성 축하 할인쿠폰!';
                        break;
                }
                if(usedDate == null) {
                let couponHTML = `<ul id="couponList">
                                    <li><input type="radio" class="form-check-input" name="radio" id=${num} onclick="couponApply(${num}, ${percentage})" unchecked></span>
                                    <li id="couponName">${couponName}</li>
                                    <li id="couponPercentage">${percentage}%</li>
                                    <li id="couponDate">${expiredDate}</li>
                                </ul>`;
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
let myPoint = 0;
function getTotalPoint() {
    $.ajax({
        method: 'GET',
        url: backURL + 'point',
        data: {},
        xhrFields: {
            withCredentials: true
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        success: function (jsonObj) {
            let point = jsonObj;

            let totalPoint = point['totalPoint'];
            $('#usedPoint').css('display', 'flex');
            $('#usedPoint').val(totalPoint.toLocaleString().split(".")[0])
            myPoint = totalPoint; // 최대 사용 포인트 설정 위함

        },
        error: function (xhr) {
            console.log(xhr.status);
        }
    });
}

function maxPointCheck(object){
    if(object.value > myPoint) {

    } else if(object.value > myPoint){
        alert(myPoint +'원 이하로 사용 가능합니다.')
        $('#usedPoint').val(myPoint.toLocaleString().split(".")[0])
    }
}


// 포인트 적용 금액 -> 가진 포인트보다 작은금액이면 0원, 그만큼만 쓰이도록
function pointApplyAmount() {
    let price = $('#totalProdPrice').val().replace(',', '')
    let coupon = $('#couponAmount').val().replace(',', '')
    let point = $('#usedPoint').val().replace(',', '')
    let afterUsedPointTotal = (price - coupon - point)
    let total = 0
    if(point < 0) {
        point = 0
        alert('최소 포인트 사용 금액은 0원 입니다.')
    }

    if(afterUsedPointTotal < 100) {
        point = price - coupon - 100
        $('#usedPoint').val(point)
        total = 100;
        alert('최소 결제 금액은 100원 입니다.')
    } else {
        total = afterUsedPointTotal
    }
    $('#totalPayPrice').val(total.toLocaleString().split(".")[0])
    $('#savePoint').val((total / 100).toLocaleString().split(".")[0])
    $('#totalPay').html(total.toLocaleString().split(".")[0]+'원')
}

// ----------------------------------- 주문 -----------------------------------
// 결제하기 버튼누르면 실행
function createOrder() {
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

    // 배송정보
    let name = $('input[id=name]').val();
    let tel = $('input[id=tel]').val();
    let addr = '[' + $('input[id=postcode]').val() + ']' + ' ' + $('input[id=roadAddress]').val() + ' ' + $('input[id=extraAddress]').val();
    let deliveryMsg = $('input[id=deliveryMsg]').val();
    let receiveDate = $('#selectRecieveDate option:selected').text();


    if (name == '') { alert('받는 사람 이름을 입력해주세요!');return;}
    if (tel == '') {alert('수신자 핸드폰 번호를 입력해주세요!');return;}
    if (addr == '') {alert('주소를 입력해주세요!');return;}
    if (receiveDate == '') {alert('수령일을 선택해주세요!');return;}

    let data = { 'msg': msg, 'couponNum': couponNum, 'usedPoint': usedPoint,
    'totalPrice': totalPrice, 'savePoint': savePoint, "orderDetails": orderDetails,
        "delivery": {"name" : name, "tel" : tel, "addr" : addr, "deliveryMsg" : deliveryMsg,
        "receiveDate" : receiveDate}};

    $.ajax({
        type: 'POST',
        url: backURL + 'order',
        data: JSON.stringify(data),
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        success: function (response) {
            localStorage.setItem('coupon', 0);
            console.log(response)
            payment(response.data) // 주문 번호
        },
        error: function (xhr) {
            console.log(xhr.responseJSON);
            if(xhr.responseJSON.status == 401) {
                alert(xhr.responseJSON.details)
            }
        }
    });
}


//---------------------------------------- 아임포트 결제 -------------------------------------------------
function payment(orderNum) {
    console.log(orderNum)
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
    console.log(data)
    var IMP = window.IMP;

	IMP.init("imp48531312");  // 가맹점 식별 코드

	IMP.request_pay({ // param
        pg: "html5_inicis.INIpayTest", //"kakaopay.TC0ONETIME", //
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
        m_redirect_url: '../order/payment.html'
},
	function (rsp) { // callback
        console.log(rsp)
		if (rsp.success) {
         // 결제 성공 시 로직,
        data.impUid = rsp.imp_uid; // 고유 id
        data.merchant_uid = rsp.merchant_uid; // 상점 거래 id
        data.payCreatedDate = rsp.paid_at
        // location.replace('../order/payment.html')
        paymentComplete(data);

		} else {
          // 결제 실패 시 로직,
            var msg = '결제에 실패하였습니다.';
            msg += '에러내용 : ' + rsp.error_msg
		}
	});
}

// 계산 완료
function paymentComplete(data) {
    $.ajax({
        url: backURL + "payments",
        method: "PUT",
        data: JSON.stringify(data),
        xhrFields: {
            withCredentials: true
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
    })
    .done(function(result) {
        console.log(result)
            localStorage.removeItem('cartList');
            localStorage.removeItem('orderList');
            localStorage.removeItem('coupon');
            localStorage.setItem('orderNum', result.data)

            location.replace('../order/payment.html')
            Afterpayment(result)
    }) // done
    .fail(function(xhr) {
        console.log(xhr)
        alert("에러");
    })
}