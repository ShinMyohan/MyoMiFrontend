$(()=>{
    $('#loginBtn').click((e)=>{
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

        $.ajax({
            xhrFields: { //CORS 문제 해결, 호스트가 다른 url로 요청해도 Cookie를 유지시킬 수 있다. 세션을 유지시켜준다! 백엔드 로그인컨트롤러에도 response.addHeader 추가
                withCredentials: true
            },
            type: 'POST',
            url: backURL + 'user/login',
            contentType : 'application/json',
            data: JSON.stringify({
                userId : id,
                password : pwd
            }),
            success: function (response) {
                let date = new Date();
                date.setTime(date.getTime()+360000);
                alert('로그인성공!')
                Cookies.set('token', response['accessToken'], { expires: date });

                location.href=frontURL
            },
            error: function (xhr) {
                alert(xhr.status)
            }
        })
    })

    //비번 입력후 enter시 버튼 눌리게.
    $('#loginPwd').keyup(function(event) {
        if(event.which === 13) {
            $('#loginBtn').click()
        }
    })
})