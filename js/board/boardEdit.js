$(() => {
  let token = Cookies.get('token')
  
  let list = JSON.parse(localStorage.getItem("list"));
  // console.log(list);

  let num = list["boardNum"];
  let title = list["title"];
  let writer = list["userName"];
  let content = list["content"];
  let category = list["category"];
  let image = list["boardImgUrl"];
  
  // console.log(">>>>>>"+image)

  $('input[name=board-num]').attr('value', num)
  $('input[name=board-title]').attr('value', title);
  $('input[name=board-writer]').attr('value', writer);
  $('#select').val(category).prop("selected", true);
  $('#exampleFormControlTextarea1').val(content);
  $('input[name=boardFile]').attr('src',image)

  $('div.submit>#submit').click(function () {
    num = $('input[name=board-num]').val();
    title = $('input[name=board-title]').val();
    // writer = $('input[name=board-writer]').val();
    category = $('#select').val();
    content = $('#exampleFormControlTextarea1').val();
    image = $('input[name="boardFile"]').get(0).files[0];

    if (title == "") {
      alert("제목을 입력하세요.");

      return;
    }

    if (category == "--카테고리를 선택하세요.--") {
      alert("카테고리를 선택하세요");

      return;
    }

    if (content == "") {
      alert("내용을 입력하세요.");

      return;
    }
    
    let formData = new FormData();

    // formData.append('id', writer);
    formData.append('boardNum', num);
    formData.append('category', category);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('file', image)

    // console.log(formData)

    $.ajax({
      type: "PUT",
      url: url + num,
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      contentType: false,
      processData: false,
      enctype: 'multipart/form-data',
      data: formData,
      success: function (response) {
        alert("글 수정이 완료되었습니다.");
        window.location.href = "./detail.html?" + num
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
  });

  $('div.cancle>button').click(()=>{
    history.back();
  })
})

let url = backURL + 'board/';
