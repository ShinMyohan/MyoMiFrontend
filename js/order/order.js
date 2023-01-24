let backURL = 'http://192.168.35.27:8080/MyoMiBackend/'
let frontURL = 'http://192.168.35.27:5500/html/'


window.couponModal = () => {
    userId = 'user2'
    getCouponList(userId)
}

// 어떤 쿠폰을 사용했는지 num 가져오기
window.couponApply = (num) => {
    if("input[type=radio][name=radio]:checked") {
        localStorage.setItem('coupon', num);
    } else {
        localStorage.setItem('coupon', 0);
    }
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
    let msg = $('input[name=msg]').val();
    // 할인혜택
    let couponNum = localStorage.getItem('coupon');
    let usedPoint = $('input[name=usedPoint]').val();
    // if(usedPoint = '') {usedPoint = 0}
    let totalPrice = $('input[name=totalPrice]').val();
    let savePoint = $('input[name=savePoint]').val();

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
                console.log('couponNum 왜안돼 : ' + couponNum)

                let couponHTML = `<div id="couponList">
                                    <span class="col"><input type="radio" class="form-check-input" name="radio" id=${num} onclick="couponApply(${num})" unchecked></span>
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
