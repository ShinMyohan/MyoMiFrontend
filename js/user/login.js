// let url = backURL + 'user/login'
// import $ from 'jquery';
import Cookies from 'js-cookie';

window.enterKey = () => {
    if(window.event.keyCode == 13) {
        requestLogin();
    }
}

function login(id, pwd) {
    $.ajax({
        // xhrFields: { //CORS 문제 해결, 호스트가 다른 url로 요청해도 Cookie를 유지시킬 수 있다. 세션을 유지시켜준다! 백엔드 로그인컨트롤러에도 response.addHeader 추가
        //     withCredentials: true
        // },
        type: 'POST',
        url: backURL + '/user/login',
        contentType : 'application/json',
        data: JSON.stringify({
            userId : id,
            password : pwd
        }),
        success: function (response) {
            let data = new Data();
            data.setTime(data.getTime()+360000);
            Cookies.set('token', response['token'], { expires: date });
            // localStorage.setItem("jwt",token.accessToken);
            window.location.reload();
        },
        error: function (xhr) {
            alert(xhr.status)
        }
    })
}
// $(()=>{
window.requestLogin = () => {
    let id = $('#loginId').val();
    let pwd = $('#loginPwd').val();

    if(id == '') {
        $('#loginId').addClass('is-invalid');

        return;
    }

    $('#loginId').removeClass('is-invalid');

    if(pwd == '') {
        $('#loginPwd').addClass('is-invalid');

        return;
    }

    $('#loginPwd').removeClass('is-invalid');

    login(id,pwd);
    alert(id);
}
// })