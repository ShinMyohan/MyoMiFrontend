$(() => {
     
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

        // console.log(formData)

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

    let url = backURL + 'board/add'


    //--취소 클릭시 START --
    $("div.cancle").click(() => {
        location.href = "./boardlist.html"
    });
    //--취소 클릭시 END --

});