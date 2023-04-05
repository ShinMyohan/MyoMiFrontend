$(() => {
  let token = Cookies.get('token')

  let list = JSON.parse(localStorage.getItem("list"));

  let num = list["boardNum"];
  let title = list["title"];
  let writer = list["userName"];
  let content = list["content"];
  let category = list["category"];
  let image = list["boardImgUrl"];

  $('input[name=board-num]').attr('value', num)
  $('input[name=board-title]').attr('value', title);
  $('input[name=board-writer]').attr('value', writer);
  $('#select').val(category).prop("selected", true);
  $('#exampleFormControlTextarea1').val(content);
  $('input[name=boardFile]').attr('src', image)

  $('div.submit>#submit').click(function () {
    if (token == null) {
      if (confirm('로그인이 필요한 서비스입니다. 로그인 하시겠습니까?')) {
        location.href = "../user/login.html"
      } else {
        location.href = "./boardList.html"
      }
    }
    num = $('input[name=board-num]').val();
    title = $('input[name=board-title]').val();
    category = $('#select').val();
    content = $('#exampleFormControlTextarea1').val();
    image = $('input[name="boardFile"]').get(0).files[0];
    let maxSize = 5 * 1024 * 1024;

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

    if (image != null) {
      if (image.size > maxSize) {
        alert('파일은 5MB까지 첨부 가능합니다.');

        return;
      }
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
        if (xhr.responseJSON.status == 500) {
          alert("잘못된 접근입니다.")
        } else {
          alert(xhr.responseJSON.details);
        }
      },
    });
  });

  $('div.cancle>button').click(() => {
    history.back();
  })

  //글 작성 본문 글자수초과시 alert / 글자수 세기 
     $('#exampleFormControlTextarea1').keyup(function (e) {
      var content = $(this).val();
      $('#textarea-length').text("( " + content.length + " / 1000 )")

      if (content.length > 1000) {
          alert("최대 1000자까지 입력 가능합니다.")
          $(this).val(content.substring(0, 1000))
          $('#taxtarea-length').text("( 1000 / 1000 )");
      }
  });
})



let url = backURL + 'board/';
