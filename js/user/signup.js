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

// 회원가입 ajax
function signup(data) {
    $.ajax({
        url: backURL + 'user/signup',
        type: 'POST',
        contentType : 'application/json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-type', 'application/json');
        },
        data: JSON.stringify(data),
        success: function (response) {
            alert('회원가입성공!')

            location.href=frontURL
        },
        error: function (xhr) {
            alert(xhr.status)
        }
    })
}

let isTelChecked = false;
let isIdChecked = false;

// 회원가입 버튼 눌렀을 때 먼저 체크해야할 필수 입력 사항들
window.getSignupInfo = () => {
// function getSignupInfo() {
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

    let postCode = $('#postcode').val();
    let roadAddress = $('#roadAddress').val();
    // let jibunAddress = $('#jibunAddress').val();
    let detailAddress = $('#detailAddress').val();
    let extraAddress = $('#extraAddress').val();
    let address = postCode + '/' + roadAddress + '/' + detailAddress + '/' + extraAddress;

    let data = {
        "addr": address,
        "email": email,
        "id": id,
        "name": name,
        "pwd": pwd,
        "tel": tel
    }

    if(id == '') {
        $('#signupId').addClass('is-invalid');
        $('#signupId').focus();
        $('#signupId').attr('placeholder','아이디를 입력해주세요.');

        return;
    }

    if(isIdChecked == false) {
        $('#information p').html('아이디 중복확인을 해주세요.')
        $('#agreementModal').modal("show");

        return;
    }

    if(isIdChecked == true) {
        $('#userIdDupCheck').css('color','#079c3b')
    }

    if(pwd == '' || !isPassword(pwd)) {
        $('#signupPwd').addClass('is-invalid');
        $('#signupPwd').focus();
        $('#signupPwd').attr('placeholder','비밀번호를 입력해주세요.');

        return;
    }

    if(checkpwd == '') {
        $('#checkPwd').addClass('is-invalid');
        $('#checkPwd').focus();
        $('#checkPwd').attr('placeholder','비밀번호 체크를 위해 입력해주세요.');

        return;
    }

    if(pwd != checkpwd) {
        $('#checkPwd').addClass('is-invalid');
        alert('비밀번호를 다시 확인해주세요')
        $('#checkPwd').focus();

        return;
    }

    if(name == '') {
        $('#signupName').addClass('is-invalid');
        $('#signupName').focus();
        $('#signupName').attr('placeholder','이름을 입력해주세요.');

        return;
    }

    if($('#agreementAll').is(':checked') == false || $('#agreementTnc').is(':checked') == false || $('#agreementPersonal').is(':checked') == false) {
        $('#information p').html('약관을 읽어보시고 동의해주세요.')
        $('#agreementModal').modal("show");

        return;
    }

    signup(data);
}
// 이메일 규칙
function isEmail(asValue) {
    const regExp = /^(?=.*[a-zA-Z0-9]*@[a-zA-Z0-9]*.[a-zA-Z0-9])[0-9a-zA-Z@.]{10,30}$/;
    return regExp.test(asValue);
}

// 비밀번호 규칙
// a~z 특수문자, 8~20자
function isPassword(asValue) {
    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,16}$/;
    return regExp.test(asValue);
}

// 회원아이디 중복체크
function idDupCheck(){
// window.idDupCheck = () => {
    let id = $('#signupId').val();
    $.ajax({
        url: backURL + 'user/signup/check/'+id,
        type: 'POST',
        contentType : 'application/json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-type', 'application/json');
        },
        data: JSON.stringify(id),
        success: function (response) {
            // alert('아이디 중복체크!')
            if(response == true) {
                alert('중복된 아이디 있음')
                $('#signupId').addClass('is-invalid');
                $('#signupId').focus();
                $('#signupId').attr('placeholder','중복된 아이디가 존재합니다.');
                isIdChecked = false
                return;
            }
            $('#signupId').removeClass('is-invalid');
            $('#signupId').focus();
            $('#IdCheckDupModal').modal('show');
            isIdChecked = true;
        },
        error: function (xhr) {
            alert(xhr.status)
        }
    })
}
