$(() => {
    let token = Cookies.get('token')
    let notice = JSON.parse(localStorage.getItem("notice"));
    let noticeNum = notice["noticeNum"];
    let title = notice["title"];
    let content = notice["content"];

    $('input[name=notice-title]').attr('value', title);
    $('textarea#notice-content').val(content);

    $('div.submit>#submit').click(function () {
        title = $('input[name=notice-title]').val();
        content = $('textarea#notice-content').val();
        if (title == "") {
            alert("제목을 입력하세요.");

            return;
        }
        if (content == "") {
            alert("내용을 입력하세요.");

            return;
        }

        let data = {
            "title": title,
            "content": content
        }
        $.ajax({
            type: "put",
            url: backURL + "notice/" + noticeNum,
            data: JSON.stringify(data),
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            success: function (response) {
                window.location.href = "./noticedetail.html?" + noticeNum
            },
            error: function (xhr) {
            },
        });
    });
    $("#notice-content").keyup(function (e) {
        var noticeContent = $(this).val();
        $("#textLengthCheck").text("(" + noticeContent.length + " / 500)"); //실시간 글자수 카운팅
        if (noticeContent.length > 500) {
            alert("최대 500자까지 입력 가능합니다.");
            $(this).val(noticeContent.substring(0, 500));
            $('#textLengthCheck').text("(500 / 500)");
        }
    });
})
