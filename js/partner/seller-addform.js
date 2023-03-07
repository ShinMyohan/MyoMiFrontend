function maxLengthCheck(object){
    if (object.value.length > object.maxLength){
      object.value = object.value.slice(0, object.maxLength);
    }    
  }
$(()=>{
    $('div.sl-num-btn>#sl-num-button').click(function(){
        let slNumber = $('#input-sl-number').val();
        let slData={
            "companyNum" : slNumber
        }
        $.ajax({
            method:"POST",
            url:backURL + 'mypage/partner/check',
            data:JSON.stringify(slData),
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            success: function(response){
                if(response == 1){
                    alert("등록 가능한 사업자번호 입니다.")
                }
            },
            error:function(xhr){
                alert("이미 등록된 사업자번호 입니다.")
            },
        })
    });

   $('div.submit>#signup-button').click(function(){
    let slNumber = $('#input-sl-number').val();
    let ceoName = $('#input-sl-ceo-name').val();
    let storeName = $('#input-sl-store-name').val();
    let storeAddr = $('#input-sl-store-addr').val();
    let intNum = $('#input-sl-itn-num').val();
    let manager = $('#input-sl-manager').val();
    let bankName = document.getElementById('input-sl-bank');
    let bankUname = $('#input-account-uname').val();
    let bankNum = $('#input-account-num').val();


    if(slNumber == ''){
        alert("사업자 등록번호를 입력하세요");
        return;
    }

    if(ceoName == ''){
        alert("대표자명을 입력하세요");
        return;
    }

    if(storeName == ''){
        alert("상호명을 입력하세요");
        return;
    }

    if(storeAddr == ''){
        alert("사업장 주소지를 입력하세요");
        return;
    }

    if(intNum ==''){
        alert("통신판매업신고번호를 입력하세요");
        return;
    }

    if(manager ==''){
        alert("입점담당자명을 입력하세요");
        return;
    }

    if(bankName == ''){
        alert("은행을 선택하세요");
        return;
    }

    if(bankUname == ''){
        alert("예금주를 입력하세요");
        return;
    }

    if(bankNum == ''){
        alert("정산계좌를 입력하세요");
    }

    let data ={
        "companyName":storeName,
        "companyNum":slNumber,
        "internetNum":intNum,
        "addr":storeAddr,
        "manager":manager,
        "bankAccount":bankName.options[bankName.selectedIndex].text+'/'+bankUname+'/'+bankNum
    };

    // console.log(data);

    $.ajax({
        method:"POST",
        url: backURL + 'mypage/partner',
        data:JSON.stringify(data),
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        success : function(response){
            alert ('판매자신청이 완료되었습니다.');
            window.location.href = './mypage-seller-signup/.html';
        },
        error: function (xhr) {
            alert(xhr.status);
          },
    })

   });
    //--판매자 신청하기 END--
})