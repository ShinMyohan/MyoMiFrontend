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
                if (xhr.responseJSON.details == 'NOT_FOUND_ADMIN') {
                    alert('글 작성 권한이 없습니다.')
                }
            },
        });
    });
})
