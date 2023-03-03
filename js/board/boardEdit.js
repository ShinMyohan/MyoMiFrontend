$(() => {
  
    let list = JSON.parse(localStorage.getItem("list"));
    // console.log(list);
  
    let num = list["boardNum"];
    let title = list["title"];
    let writer = list["userName"];
    let content = list["content"];
    let category = list["category"];

    $('input[name=board-num]').attr('value',num)
    $('input[name=board-title]').attr('value', title);
    $('input[name=board-writer]').attr('value', writer);
    $('#select').val(category).prop("selected",true);
    $('#exampleFormControlTextarea1').val(content);
    console.log("1번 : " +num,title,writer,category,content)
    
    // console.log(num)
    $('div.submit>#submit').click(function(){
      num = $('input[name=board-num]').val();
      console.log(num)
      title = $('input[name=board-title]').val();
      writer = $('input[name=board-writer]').val();
      category = $('#select').val();
      content = $('#exampleFormControlTextarea1').val();
      console.log("2번 : " +num,title,writer,category,content)
   
      
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

      let data = {
        //"name": writer,
        "boardNum":num,
        "category": category,
        "title": title,
        "content": content
      }
      
      console.log('ajax' + num,title,writer,category,content)
      // console.log(data);
      // let boardNum = location.search.substring(1);
      $.ajax({
        type: "put",
        url: url +num,
        data: JSON.stringify(data),
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Content-type', 'application/json');
          xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        success: function (response) {
          alert("글 수정이 완료되었습니다.");
          window.location.href = "./detail.html?" + num
        },
        error: function (xhr) {
          // alert(xhr.status);
        },
      });
    });
  })
    
    let url = backURL+'board/';
    