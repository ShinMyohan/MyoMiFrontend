
// var basicmail = $('#userEmailBasic option:selected').val();
// $('#userEmailAddr').val(basicmail);

//@뒤 메일 선택시 바로 input 박스에 넣어주기
// $(function(){
//     $('#userEmailBasic').change(function(){
//         var basicmail = $('#userEmailBasic option:selected').val();
//         $('#userEmailAddr').val(basicmail);
//     })
// })
// function getTel(){
//     let id = $('#signupId').val();
//     let pwd = $('#signupPwd').val();
//     let checkpwd = $('#checkPwd').val();
//     let name = $('#signupName').val();
    
//     let tel1 = $('#signupTel1 option:selected').val();
//     let tel2 = $('#signupTel2').val();
//     let tel3 = $('#signupTel3').val();
//     let tel = tel1 + '-' + tel2 + '-' + tel3;

//     let email1 = $('#signupEmail').val();
//     let email2 = $('#userEmailBasic option:selected').val();
//     let email = email1 + '@' + email2;
//     alert(email);
// }

$(()=>{
    $('#userEmailBasic').change(function(){
        var basicmail = $('#userEmailBasic option:selected').val();
        $('#userEmailAddr').val(basicmail);
    })

    $("#signupId").keyup(function(e) {
        var content = $(this).val();
        if(content != '') {
            $('#signupId').removeClass('is-invalid');
        }
    });

    $("#signupPwd").keyup(function(e) {
        var content = $(this).val();
        if(content != '') {
            $('#signupPwd').removeClass('is-invalid');
        }
    });

    $("#checkPwd").keyup(function(e) {
        var content = $(this).val();
        if(content != '') {
            $('#checkPwd').removeClass('is-invalid');
        }
    });

    $("#signupName").keyup(function(e) {
        var content = $(this).val();
        if(content != '') {
            $('#signupName').removeClass('is-invalid');
        }
    });

    // 전체동의 클릭시 모두 동의됨, 전체동의 재클릭시 모두 동의 체크 해제됨
    $("#agreementAll").click(function(e){
        if($('#agreementAll').is(':checked') == true) {
            $('#agreementTnc').prop("checked", true);
            $('#agreementPersonal').prop("checked", true);
        } else {
            $('#agreementTnc').prop("checked", false);
            $('#agreementPersonal').prop("checked", false);
        }
    })

})


function getTel(){
    let id = $('#signupId').val();
    let pwd = $('#signupPwd').val();
    let checkpwd = $('#checkPwd').val();
    let name = $('#signupName').val();
    let tel1 = $('#signupTel1 option:selected').val();
    let tel2 = $('#signupTel2').val();
    let tel3 = $('#signupTel3').val();
    let tel = tel1 + '-' + tel2 + '-' + tel3;

    let email1 = $('#signupEmail').val();
    let email2 = $('#userEmailBasic option:selected').val();
    let email = email1 + '@' + email2;
    // alert(email);

    if(id == '') {
        $('#signupId').addClass('is-invalid');
        $('#signupId').focus();
        $('#signupId').attr('placeholder','아이디를 입력해주세요.');
    }

    if(pwd == '') {
        $('#signupPwd').addClass('is-invalid');
        $('#signupPwd').focus();
        $('#signupPwd').attr('placeholder','비밀번호를 입력해주세요.');
    }

    if(checkpwd == '') {
        $('#checkPwd').addClass('is-invalid');
        $('#checkPwd').focus();
        $('#checkPwd').attr('placeholder','비밀번호 체크를 위해 입력해주세요.');
    }

    if(name == '') {
        $('#signupName').addClass('is-invalid');
        $('#signupName').focus();
        $('#signupName').attr('placeholder','이름을 입력해주세요.');
    }

    if($('#agreementAll').is(':checked') == false || $('#agreementTnc').is(':checked') == false || $('#agreementPersonal').is(':checked') == false) {
        $('#agreementModal').modal("show");
    }
}

//이메일 규칙
// function isEmail(asValue) {
//     const regExp = /^(?=.*[a-zA-Z0-9]*@[a-zA-Z0-9]*.[a-zA-Z0-9])[0-9a-zA-Z@.]{10,30}$/;
//     return regExp.test(asValue);
// }

// // 비밀번호 규칙
// // a~z 특수문자, 8~20자
// function isPassword(asValue) {
//     const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,20}$/;
//     return regExp.test(asValue);
// }

