$(() => {
    let token = Cookies.get('token')

    //--셀러 상태Bar 확인 START--
    $(document).ready(function () {
        $.ajax({
            url: backURL + 'sellerpage/info',
            method: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            success: function (jsonObj) {
                $(".mp-user-name").html(jsonObj.companyName);
                $(".mp-user-order").html(jsonObj.orderCnt);
                $(".mp-user-qna").html(jsonObj.qnaCnt);
                $(".mp-user-follow").html(jsonObj.followCnt);
            },
            error: function (xhr) {
                alert(xhr);
            }
        });
    });
    //--셀러 상태Bar 확인 END--

})