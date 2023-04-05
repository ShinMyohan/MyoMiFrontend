function maxLengthCheck(object){
    if (object.value.length > object.maxLength){
      object.value = object.value.slice(0, object.maxLength);
    }    
  }

let isNumChecked = false;
  
$(()=>{
    let token = Cookies.get('token')

    //--사업자등록증 검증START-- 
    $('div.sl-num-btn>#sl-num-button').click(function(){
        let slNumber = $('#input-sl-number').val();
        
        let slData={
            "companyNum" : slNumber
        }

        if(slNumber == ''){
            alert("사업자 등록번호를 입력하세요");
            return;
        }

        if(slNumber < 1000000000){
            alert("사업자등록번호는 10자리 입니다.");
            return;
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
                    $('#num-check').css('color','#079c3b')
                    $("#num-check").text("인증완료!");
                    isNumChecked = true;
                }
            },
            error:function(xhr){
                alert("이미 등록된 사업자번호 입니다.")
                isNumChecked = false;
            },
        })
    });
    //--사업자등록증 검증 END--
    
   $('div.submit>#signup-button').click(function(){
    let slNumber = $('#input-sl-number').val();
    let ceoName = $('#input-sl-ceo-name').val();
    let storeName = $('#input-sl-store-name').val();
    let addr = '[' + $('input[id=postcode]').val() + ']' + ' ' + $('input[id=roadAddress]').val() + ' ' + $('input[id=input-sl-store-addr-3]').val();
    let intNum = $('#int-num-1').val() + '-' + $('#int-num-2').val() + '-' + $('#int-num-1').val();
    let manager = $('#input-sl-manager').val();
    let bankName = document.getElementById('input-sl-bank');
    let bankUname = $('#input-account-uname').val();
    let bankNum = $('#input-account-num').val();
    let imgFile1 = $('#detail-formfile1').get(0).files[0];
    let imgFile2 = $('#detail-formfile2').get(0).files[0];

    if(slNumber == ''){
        alert("사업자 등록번호를 입력하세요");
        return;
    }

    if(isNumChecked == false) {
        alert("사업자등록번호 중복확인을 해주세요")
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
        return;
    }

    if(imgFile1 == null){
        alert("사업자등록증 사본이 등록되지 않았습니다.");
        return;
    }

    if(imgFile2 == null){
        alert("통신판매업신고증 사본이 등록되지 않았습니다.");
        return;
    }


    let formData = new FormData();
    formData.append('companyNum',slNumber);
    formData.append('companyName',storeName);
    formData.append('addr',addr);
    formData.append('internetNum',intNum);
    formData.append('manager',manager);
    formData.append('bankAccount',bankName.options[bankName.selectedIndex].text+'/'+bankUname+'/'+bankNum);
    formData.append('companyImgUrl',imgFile1);
    formData.append('internetImgUrl',imgFile2);

    $.ajax({
        method:"POST",
        url: backURL + 'mypage/partner',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        contentType: false,
        processData: false,
        enctype: 'multipart/form-data',
        data: formData,
        success : function(response){
            alert ('판매자신청이 완료되었습니다.');
            window.location.href = './seller-signup.html';
        },
        error: function (xhr) {
            alert(xhr.status);
          },
    })
   });
    //--판매자 신청하기 END--
})