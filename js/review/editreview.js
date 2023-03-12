$(() => {
    let token = Cookies.get('token')
    let review = JSON.parse(localStorage.getItem("review"));
    let reviewNum = review["reviewNum"];
    let title = review["title"];
    let content = review["content"];
    let prodName = review["prodName"];

    $('input[name=review-title]').attr('value', title);
    $('input[name=review-prod]').attr('value', prodName);
    $('textarea#content').val(content);

    $('div.submit>#submit').click(function () {
        title = $('input[name=review-title]').val();
        content = $('textarea#content').val();
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
            url: backURL + "mypage/review/" + reviewNum,
            data: JSON.stringify(data),
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            success: function (response) {
                alert("리뷰 수정이 완료되었습니다.");
                window.location.href = "./reviewdetail.html?" + reviewNum
            },
            error: function (xhr) {
                alert(xhr.responseJSON.data)
            },
        });
    });
    // ---------- 리뷰 글자수 제한 ----------
    $("#content").keyup(function (e) {
        var reviewContent = $(this).val();
        $("#textLengthCheck").text("(" + reviewContent.length + " / 200)"); //실시간 글자수 카운팅
        if (reviewContent.length > 200) {
            alert("최대 200자까지 입력 가능합니다.");
            $(this).val(reviewContent.substring(0, 200));
            $('#textLengthCheck').text("(200 / 200)");
        }
    });
})


