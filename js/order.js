let backURL = 'http://192.168.35.27:8080/MyoMiBackend/'
let frontURL = 'http://192.168.35.27:5500/html/'

function createPayment(orderNum) {
    console.log('createPayment들어옴')
    // 수신자 정보
    let num = orderNum;
    let msg = $('input[name=msg]').val();
    // 할인혜택
    let couponNum = 1
    // let couponNum = $('input[name=couponNum]').val();
    // if(couponNum = '') {couponNum == 0}
    let usedPoint = $('input[name=usedPoint]').val();
    // if(usedPoint = '') {usedPoint = 0}
    let totalPrice = $('input[name=totalPrice]').val();
    let savePoint = $('input[name=savePoint]').val();

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
        // beforeSend: function (xhr) {
        //     xhr.setRequestHeader('Content-type', 'application/json');
        // },
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





