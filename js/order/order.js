// let backURL = 'http://192.168.35.27:8080/MyoMiBackend/'
// let frontURL = 'http://192.168.35.27:5500/html/'

window.getOrderPage = () => {
    let orderNum = 1;
    getProductInfo(orderNum)
}

// 주문에 들어온 상품 정보 불러오기
function getProductInfo(orderNum) {
    $('#orderProductList').empty();
    let totalPrice = 0;
    let discountPrice = 0;
    let payPrice = 0;

    $.ajax({
        method: 'GET',
        url: backURL + 'order/?orderNum=' + orderNum,
        data: {},
        // beforeSend: function (xhr) {
        //     xhr.setRequestHeader('Content-type', 'application/json');
        //     xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        // },
        success: function (jsonObj) {
            let orderInfo = jsonObj;
            console.log(orderInfo)

            // let userId = orderInfo[0]['ID'];
            let name = orderInfo[0]['NAME'];
            let tel = orderInfo[0]['TEL'];
            let email = orderInfo[0]['EMAIL'];
            let addr = orderInfo[0]['ADDR'];

            $('#orderName').val(name)
            $('#orderTel').val(tel)
            $('#orderEmail').val(email)
            // $('#orderAddr').val(addr)


            for (let i = 0; i < orderInfo.length; i++) {
                let orderNum = orderInfo[i]['NUM'];
                // let userId = coupon['USER_ID'];
                let prodNum = orderInfo[i]['PROD_NUM'];
                let prodCnt = orderInfo[i]['PROD_CNT'];
                let prodName = orderInfo[i]['PROD_NAME'];
                let originPrice = orderInfo[i]['ORIGIN_PRICE'];
                let percentage = orderInfo[i]['PERCENTAGE'];
                let prodPrice = ((originPrice - originPrice*(percentage/100))*prodCnt).toLocaleString();
                let week = orderInfo[i]['WEEK'];



                // 상품 목록 아래에 나올 금액들
                totalPrice += originPrice * prodCnt
                discountPrice += originPrice*(percentage/100)*prodCnt
                payPrice += (originPrice - originPrice*(percentage/100))*prodCnt
                console.log('totalPrice1 : ' + totalPrice)
                let productHTML = `<div id="orderProduct">
                                        <img src="../../images/shin.png" class="rounded" id="img">
                                        <div id="productDetail" class="col">
                                            <h5 id="orderProductName">${prodName}</h5>
                                        </div>
                                        <div id="options" class="col">
                                            <h5>수량</h5>
                                            <h6 id="orderProductCnt">${prodCnt}개</h6>
                                        </div>
                                        <div id="options" class="col">
                                            <h5>금액</h5>
                                            <h6 id="orderProductPrice">${prodPrice}원</h6>
                                        </div>
                                    </div><hr>`;
                $('#orderProductList').append(productHTML);
        }
        $('#totalPrice').html(totalPrice.toLocaleString())
        console.log('totalPrice2 : ' + totalPrice)
        $('#discountPrice').html(discountPrice.toLocaleString())
        $('#payPrice').html(payPrice.toLocaleString())
        $('#totalProdPrice').val(payPrice)
        $('#totalPayPrice').val(payPrice)
        $('#totalPay').html(payPrice)
        $('#savePoint').val((payPrice/100))
    },
        error: function (xhr) {
            console.log(xhr.status);
        }
    });
}


window.couponModal = () => {
    userId = 'user2'
    getCouponList(userId)
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
    let price = $('#totalProdPrice').val()
    let amount = price * percentage/100
    $('#couponAmount').html(amount)
    let total = (price - amount)
    $('#totalPayPrice').val(total.toLocaleString())
    $('#savePoint').val(((price-amount) / 100).toLocaleString().split(".")[0])
    $('#totalPay').html(total.toLocaleString()+'원')
}

// 쿠폰 조회 모달에서 적용취소를 눌렀을 경우 checked를 풀기
window.couponCancle = () => {
	localStorage.setItem('coupon', 0);
};

// 결제 하시겠습니까 confirm 하면 실행
function createPayment(orderNum) {
    console.log('createPayment들어옴')
    // 수신자 정보
    let num = orderNum;
    let msg = $('input[id=orderMsg]').val();
    // 할인혜택
    let couponNum = localStorage.getItem('coupon');
    let usedPoint = $('input[id=usedPoint]').val();
    if(usedPoint == '') {usedPoint = 0}
    let totalPrice = $('input[id=totalPayPrice]').val();
    let savePoint = $('input[id=savePoint]').val();

    console.log("couponNum : " + couponNum)
    console.log('usedPoint : ' + usedPoint)
    console.log('num : ' + num)


    // if (receiverName == '') { alert('받는 사람 닉네임을 입력해주세요!');return;}
    // if (postNum == '') {alert('우편번호를 선택해주세요!');return;}
    // if (addr == '') {alert('주소를 입력해주세요!');return;}
    // if (addrDetail == '') {alert('상세 주소를 입력해주세요!');return;}
    // if (tel == '') {alert('수신자 핸드폰 번호를 입력해주세요!');return;}
    // if (receiveDate == '') {alert('수령일을 선택해주세요!');return;}

    let data = { 'num': num, 'msg': msg,
    'couponNum': couponNum, 'usedPoint': usedPoint, 'totalPrice': totalPrice, 'savePoint': savePoint};

    console.log(data)
    $.ajax({
        type: 'POST',
        url: backURL + 'order/payment',
        data: JSON.stringify(data),
        success: function (response) {
            console.log(response);
            alert('결제 완료!');
            localStorage.setItem('coupon', 0);
        },
        error: function (xhr) {
            alert('입력 항목을 확인해주세요!');
            console.log(xhr.status);
        }
    });
}


// 내 쿠폰 목록 조회하기
function getCouponList(userId) {
    $('div.couponParent').empty();
    let couponNum = localStorage.getItem('coupon')

    $.ajax({
        method: 'GET',
        url: backURL + 'coupon/list?user=' + userId,
        data: {},
        // beforeSend: function (xhr) {
        //     xhr.setRequestHeader('Content-type', 'application/json');
        //     xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        // },
        success: function (jsonObj) {
            let couponList = jsonObj;
            console.log(couponList)
            // couponList(list)

            for (let i = 0; i < couponList.length; i++) {
                let num = couponList[i]['NUM'];
                // let userId = coupon['USER_ID'];
                let sort = couponList[i]['SORT'];
                let percentage = couponList[i]['PERCENTAGE'];
                let createdDate = couponList[i]['CREATED_DATE'];
                let ExpiredDate = moment(createdDate).add("7","d").format("YYYY-MM-DD")
                let couponName;
                switch(sort) {
                    case 0 :
                        couponName = '회원가입 쿠폰';
                        break;
                    case 1 :
                        couponName = '등급업 쿠폰(골드)';
                        break;
                    case 2 :
                        couponName = '등급업 쿠폰(플래티넘)';
                        break;
                    case 3 :
                        couponName = '등급업 쿠폰(다이아몬드)';
                        break;
                }

                let couponHTML = `<div id="couponList">
                                    <span class="col"><input type="radio" class="form-check-input" name="radio" id=${num} onclick="couponApply(${num}, ${percentage})" unchecked></span>
                                    <span class="col" id="couponName">${couponName}</span>
                                    <span class="col" id="couponPercentage">${percentage}%</span>
                                    <span class="col" id="couponDate">${ExpiredDate}</span>
                                </div>`;
                $('div.couponParent').append(couponHTML);
                if( couponNum != 0) {$(`input[id=${couponNum}]`).attr("checked", true)}
        }},
        error: function (xhr) {
            console.log(xhr.status);
        }
    });
}

// function couponList(list){
//     console.log(list)
//     let $origin = $('#couponList');
//     let $parent = $('div.couponParent');
//     $parent.empty()
//     // $('couponList').remove();
//     list.forEach(coupon=>{
//         let num = coupon['NUM'];
//         // let userId = coupon['USER_ID'];
//         let sort = coupon['SORT'];
//         let percentage = coupon['PERCENTAGE'];
//         let createdDate = coupon['CREATED_DATE'];

//         console.log(createdDate)
//         // let status = coupon['STATUS'];
//         let $copy = $origin.clone()
//         switch(sort) {
//             case 0 :
//                 $copy.find('#couponName').html('회원가입 쿠폰');
//                 break;
//             case 1 :
//                 $copy.find('#couponName').html('등급업 쿠폰(골드)');
//                 break;
//             case 2 :
//                 $copy.find('#couponName').html('등급업 쿠폰(플래티넘)');
//                 break;
//             case 3 :
//                 $copy.find('#couponName').html('등급업 쿠폰(다이아몬드)');
//                 break;
//         }
//         $copy.show()
//         $copy.find('#couponName').val(num)
//         $copy.find('#couponPercentage').html(percentage + "%")
//         // var options = { year: "numeric", month: "numeric", day: "numeric" };
//         $copy.find('#couponDate').html(moment(createdDate).add("7","d").format("YYYY-MM-DD"))
//         // .toLocaleDateString("ko-KR", options)
//         $parent.append($copy);
//     })
// }
