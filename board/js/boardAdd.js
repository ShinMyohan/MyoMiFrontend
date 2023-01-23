$(()=>{
   
  $('div.submit>#submit').click(function(){

    let title = $('#title').val();
    let writer = $('#writer').val();
    let category = $('div.select>#select option:checked').val();
    let content = $('div.form-floating>#content').val();
    
    if (title == '') {
        alert('제목을 입력하세요.');

        return;
    }

    if (writer == '') {
        alert('작성자를 입력하세요.');

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

    let data = {
        
        "id":writer,
        "category":category,
        "title":title,
        "content":content
    };
    console.log(data);
    
    $.ajax({
        method: "POST",
        url: url,
        data: JSON.stringify(data),

        success : function(response){
            alert ('글 작성이 완료되었습니다.');
            window.location.href = './boardList.html';
        },
        error: function (xhr) {
            alert(xhr.status);
          },
         
        })
});

  let url= backURL +'board/add'

// //--작성 클릭시 START --
// $("div.submit").click(() => {
//     location.href ="./board_detail.html"
//    });
// //--작성 클릭시 END --


//--취소 클릭시 START --
$("div.cancle").click(() => {
    location.href ="./boardlist.html"
   });
//--취소 클릭시 END --

});