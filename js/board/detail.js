$(() => {
  let token = Cookies.get('token')
  $('.hidden-rep-btn').hide();
  // $('.re-rep-write').hide();
  $('div.empty-list').hide();
  // $('.re-hidden-rep-btn').hide();

  function viewBoard() {
    let url = backURL;
    // ------글 상세내용 START------
    let data = location.search.substring(1);
    // console.log(data)
    $.ajax({
      method: "get",
      url: url + 'board/detail/' + data,
      data: data,
      beforeSend: function (xhr) {
        //  xhr.setRequestHeader('Content-type', 'application/json');
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },

      success: function (jsonObj) {
        let list = jsonObj;
        localStorage.setItem("list", JSON.stringify(list));
        // console.log(list);

        let hits = list["hits"];
        let createdDate = list["created_date"];
        let num = list["boardNum"];
        let title = list["title"];
        let cont = list["content"];
        let name = list["userName"];
        let userName = name.replace(/(?<=.{1})./gi, "*")
        let comments = list["comments"];
        let image = list["boardImgUrl"]
        let enableUpdate = list["enableUpdate"]
        let enableDelete = list["enableDelete"]

        $("div.num").html(num);
        $("div.content").html(cont);
        $("div.title").html(title);
        $("div.createdDate").html("작성일 | " + moment(createdDate).format("YYYY-MM-DD"));
        $("div.writer").html("작성자 | " + userName);
        $("div.hits").html("조회수 | " + hits);
        if (image == null) {
          $('.imgArea').hide();
        } else {
          $("#boardImg").attr('src', image)
        }

        if (enableUpdate == false) {
          $('#edit').attr('div.edit', 'button').hide();
        }
        if (enableDelete == false) {
          $('#del').attr('div.del', 'button').hide();
        }

        //---------------------------------------------

        let $origin = $("div.parent-clone").first();
        $("div.parent-div").not(":first-child").remove();
        $origin.show();
        let $parent = $("div.board-rep-list")

        if (comments.length == 0) {
          $('div.empty-list').show();
        } else {
          $(comments).each((p) => {
            // console.log(comments)
            let parent = comments[p]["parent"]
            let rnum = comments[p]["commentNum"]
            let rwriter = comments[p]["userName"]
            let userName = rwriter.replace(/(?<=.{1})./gi, "*")
            let rdate = comments[p]["createdDate"]
            let rcontent = comments[p]["content"]
            let enableUpdate = comments[p]["enableUpdate"]
            let enableDelete = comments[p]["enableDelete"]

            let $copy = $origin.clone();

            if (parent == 0) {
              $copy.find("div.prnum").html(rnum);
              $copy.find("div.prwriter").html(userName);
              $copy.find("div.prdate").html(rdate);
              $copy.find("input[name=prep-content").val(rcontent);
              $parent.append($copy);
            }
            if (enableUpdate == false) {
              $('li.rep-edit-btn').attr('div.dropdown-menu', 'li').hide();
            }
            if (enableDelete == false) {
              $('li.rep-del-btn').attr('div.dropdown-menu', 'li').hide();
            }
          });
        }
        $origin.hide();

        let length = $('div.parent-clone').length;
        $('div.board-rep-count>i').html(length - 1);
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
    //------글 상세 END------
  }
  viewBoard()

  //글 삭제 
  $('div.del').click(function () {
    if (confirm('정말 삭제하시겠습니까?')) {
      let data = location.search.substring(1);

      $.ajax({
        method: "DELETE",
        url: backURL + "board/" + data,
        data: data,
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Content-type', 'application/json');
          xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        success: function () {
          alert("삭제되었습니다.");
          window.location.href = "./boardlist.html"
        },
        error: function (xhr) {
          alert(xhr.status);
        },

      });
    } else {
      alert("취소되었습니다.")
    }
  })
  //--------목록으로 START----------
  $("div.back").click(() => {
    location.href = "./boardlist.html";
  });
  //--------목록으로 END----------

  //-------수정폼으로 이동 START--------
  $("div.edit").click((e) => {
    let boardNum = $(e.target).parents('div.list').find('div.bnum').html();
    location.href = "./boardedit.html";
  });

  $("div.edit").on("click", "div.board_view", (e) => {
    let num = $(e.target).parents("div.list").find("div.bnum").html();
    location.href = "./detail.html?num=" + num;
  });
  //-------수정폼으로 이동 END--------


  //댓글----------------------------------------------------
  //댓글 작성
  $('div.rep-add>#rep-add').click(function () {

    let token = Cookies.get('token')
    if (token == null) {
      if (confirm('로그인 한 사용자만 이용 가능합니다. 로그인 하시겠습니까?')) {
        location.href = "../user/login.html"
      } else {
        location.reload();
      }
    }
    let num = $('div.num').html();
    // console.log(num)
    let content = $('#content').val();
    if (content == '') {
      alert('내용을 입력하세요.');

      return;
    }
    $.ajax({
      method: "POST",
      url: backURL + "comment/" + num,
      data: JSON.stringify({ "content": content }),
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      success: function (response) {
        alert("댓글 작성이 완료되었습니다.")
        window.location.href = "./detail.html?" + num
      },
      error: function (xhr) {
        alert(xhr.status + "만원");
      },
    })
  })


  //댓글 수정
  function editComment(content, commentNum) {
    let boardNum = $('div.num').html();

    if (content == "") {
      alert("내용을 입력하세요.");

      return;
    }
    $.ajax({
      type: "put",
      url: backURL + "comment/" + boardNum + '/' + commentNum,
      data: JSON.stringify({ "content": content }),
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      success: function (response) {
        alert('수정이 완료되었습니다.');
        window.location.href = "./detail.html?" + boardNum
      },
      error: function (xhr) {
        alert(xhr.status + "만원");
      },
    })
  }

  //댓글 삭제
  function delComment(commentNum) {
    if (confirm('정말 삭제하시겠습니까?')) {
      let data = location.search.substring(1);
      let boardNum = $('div.num').html();
      $.ajax({
        method: "delete",
        url: backURL + "comment/" + boardNum + '/' + commentNum,
        data: data,
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Content-type', 'application/json');
          xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        success: function () {
          alert("삭제되었습니다.");
          window.location.href = "./detail.html?" + boardNum
        },
        error: function (xhr) {
          alert(xhr.status);
        },
      });
    } else {
      alert("취소되었습니다.")
    }
  };

  //댓글 작성 글자수초과시 alert
  $('#content').keyup(function () {
    let content = $('#content').val();
    if (content.length > 250) {
      alert("최대 250자까지 입력 가능합니다.")
    }
  });

  //댓글 수정 버튼 클릭 
  $('div.board-rep-list').on('click', 'div.parent-clone>div.rep-menu>ul.dropdown-menu>li.rep-edit-btn', (e) => {
    $(e.target).parents('div.parent-clone').find('div.hidden-rep-btn').show()
    $(e.target).parents('div.rep-menu').hide();
    $(e.target).parents('div.parent-clone').find('div.prcontent>input[name="prep-content"]').attr('readonly', false);
    $(e.target).parents('div.parent-clone').find('div.prcontent>input[name="prep-content"]').css("border", "1px solid lightgrey");
  })

  //댓글 수정폼에서 취소버튼 눌렀을 때
  $('div.board-rep-list').on('click', 'div.parent-clone>div.hidden-rep-btn>#hid-cancle-btn', (e) => {
    $(e.target).parents('div.parent-clone').find('div.hidden-rep-btn').hide();
    $(e.target).parents('div.parent-clone').find('div.rep-menu').show();
    $(e.target).parents('div.parent-clone').find('div.prcontent>input[name="prep-content"]').attr('readonly', true);
    $(e.target).parents('div.parent-clone').find('div.prcontent>input[name="prep-content"]').css("border", "0");
  })

  //댓글 수정 콜 
  $('div.board-rep-list').on('click', 'div.parent-clone>div.hidden-rep-btn>#hid-edit-btn', (e) => {
    let content = $(e.target).parents('div.parent-clone').find('div.prcontent>input[name="prep-content"]').val();
    let commentNum = $(e.target).parents('div.parent-clone').find('div.prnum').html();
    // console.log("내용" + content, commentNum)
    editComment(content, commentNum);
  })

  //댓글 삭제 콜 
  $('div.board-rep-list').on('click', 'div.rep-menu>ul.dropdown-menu>li.rep-del-btn', (e) => {
    let commentNum = $(e.target).parents('div.parent-clone').find('div.prnum').html();
    // console.log(commentNum)
    delComment(commentNum);
  })

});
