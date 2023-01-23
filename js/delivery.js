window.createDeliveryButton = () => {
    let orderNum = 1;
    createDelivery(orderNum);
    confirmPayment(orderNum);
}

function createDelivery(orderNum) {
    console.log('createPayment들어옴')
    // 수신자 정보
    let num = orderNum;
    let name = $('input[name=name]').val();
    let tel = $('input[name=tel]').val();

    let postNum = $('input[name=postNum]').val();
    let addr = $('input[name=addr]').val();
    let addrDetail = $('input[name=addrDetail]').val();
    addr += '+' + postNum + '+' + addrDetail;
    // 배송정보
    let receiveDate = $('#receiveDate option:selected').val();
    let deliveryMsg = $('input[name=deliveryMsg]').val();
    // 할인혜택

    console.log('name : ' + name)
    console.log('addr : ' + addr)


    // if (receiverName == '') { alert('받는 사람 닉네임을 입력해주세요!');return;}
    // if (postNum == '') {alert('우편번호를 선택해주세요!');return;}
    // if (addr == '') {alert('주소를 입력해주세요!');return;}
    // if (addrDetail == '') {alert('상세 주소를 입력해주세요!');return;}
    // if (tel == '') {alert('수신자 핸드폰 번호를 입력해주세요!');return;}
    // if (receiveDate == '') {alert('수령일을 선택해주세요!');return;}


    let data = { 'num': num, 'name': name, 'tel': tel,'addr': addr,
    'deliveryMsg': deliveryMsg, 'receiveDate': receiveDate};

    console.log(data)
    $.ajax({
        type: 'POST',
        url: backURL + 'order/delivery',
        // beforeSend: function (xhr) {
        //     xhr.setRequestHeader('Content-type', 'application/json');
        // },
        data: JSON.stringify(data),
        success: function (response) {
            console.log(response)
        },
        error: function (xhr) {
            console.log(xhr.status);
        }
    });
}

function confirmPayment(orderNum) {
    if (window.confirm("결제 하시겠습니까?")) {
        createPayment(orderNum);
    } else {
        console.log("결제를 취소하였습니다.");
    }
}





