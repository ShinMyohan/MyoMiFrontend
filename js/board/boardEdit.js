$(() => {
  
    let list = JSON.parse(localStorage.getItem("list"));
    console.log(list);
    // console.log(list[0]["CONTENT"]);

    let num = list[0]["NUM"];
    let title = list[0]["TITLE"];
    let writer = list[0]["NAME"];
    let content = list[0]["CONTENT"];
    let category = list[0]["CATEGORY"];
    // console.log(title, content, category, writer);

    $('input[name=board-num').attr('value', num);
    $('input[name=board-title]').attr('value', title);
    $('input[name=board-writer]').attr('value', writer);
    $('#select').val(category).prop("selected",true);
    $('textarea#content').html(content);
})

function updateBoard() {
    let num = $('input[name=board-num').val();
    let title = $('input[name=board-title]').val();
    let writer = $('input[name=board-writer]').val();
    let category = $('#select').val();
    let content = $('textarea#content').val();
    console.log(title,writer,category,content)

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

    // let 
    let data = {
      //"name": writer,
      "num":num,
      "category": category,
      "title": title,
      "content": content
    }
    // console.log(data);

    $.ajax({
      type: "POST",
      url: url + "board/modify",
      data: JSON.stringify(data),

      success: function (response) {
        alert("글 수정이 완료되었습니다.");
        window.location.href = "./boardList.html";
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
  };

  let url = backURL;
