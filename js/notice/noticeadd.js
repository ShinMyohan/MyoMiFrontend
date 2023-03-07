$(()=>{
   
    $('div.submit>#submit').click(function () {

        let title = $('#notice-title').val();
        let content = $('div.mb-3>#notice-content').val();
    
        if (title == '') {
            alert('제목을 입력하세요.');

            return;
        }

        if (content == '') {
            alert('내용을 입력하세요.');

            return;
        }

        let data = {
        
            "title": title,
            "content": content
        };
        console.log(data);
    
        $.ajax({
            url: backURL + 'notice/add',
            method: "POST",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            data: JSON.stringify(data),

            success: function (response) {
                alert('글 작성이 완료되었습니다.');
                window.location.href = './noticelist.html';
            },
            error: function (xhr) {
                alert(xhr.status + "작성실패");
            },
         
        });
    });

  
//--취소 클릭시 START --
$('div.cancel>#write-cancel').click(() => {
    location.href ="./noticelist.html"
   });
//--취소 클릭시 END --

});