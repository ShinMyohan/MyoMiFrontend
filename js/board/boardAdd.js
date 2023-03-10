$(() => {
    let token = Cookies.get('token')

    $('div.submit>#submit').click(function () {
        let title = $('#title').val();
        // let writer = $('#writer').val();
        let category = $('div.select>#select option:checked').val();
        let content = $('#content').val();
        let imgFile = $('input[name="boardFile"]').get(0).files[0];

        if (title == '') {
            alert('제목을 입력하세요.');

            return;
        }

        if (category == '--카테고리를 선택하세요.--') {
            alert('카테고리를 선택하세요');

            return;
        }

        if (content == '') {
            alert('내용을 입력하세요.');

            return;
        }

        let formData = new FormData();

        formData.append('category', category);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('file', imgFile)

        $.ajax({
            method: "POST",
            url: url,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            contentType: false,
            processData: false,
            enctype: 'multipart/form-data',
            data: formData,

            success: function (response) {
                alert('글 작성이 완료되었습니다.');
                window.location.href = './boardList.html';
            },
            error: function (xhr) {
                alert(xhr.status);
            },
        })
    });

    //글 제목 글자수 초과시 alert
    $('#title').keyup(function () {
        let title = $('#title').val();
        if (title.length > 50) {
            alert("최대 50자까지 입력 가능합니다.")
        }
    })

    //글 작성 본문 글자수초과시 alert / 글자수 세기 
    $('#content').keyup(function (e) {
        var content = $(this).val();
        $('#textarea-length').text("( " + content.length + " / 1000 )")

        if (content.length > 1000) {
            alert("최대 1000자까지 입력 가능합니다.")
            $(this).val(content.substring(0, 1000))
            $('#taxtarea-length').text("( 1000 / 1000 )");
        }
    });

    let url = backURL + 'board/add'

    //--취소 클릭시 START --
    $("div.cancle").click(() => {
        location.href = "./boardlist.html"
    });
    //--취소 클릭시 END --
});

