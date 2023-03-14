$(() => {
  let token = Cookies.get('token')
  let userRole = Cookies.get('role');
  // $('.re-hidden-rep-btn').hide();
  $('#notice-edit').hide();
  $('#notice-delete').hide();
  function viewNotice() {
    let url = backURL;
    // ------글 상세내용 START------
    let data = location.search.substring(1);
    // 숫자만 뽑고싶다면, 
    let regex = /[^0-9]/g;
    //숫자를 제외한 정규식(즉, 영어,한글,특수문자 등등...)
    let noticeNum = data.replace(regex, "");

    $.ajax({
      method: "get",
      url: url + "notice/" + noticeNum,
      data: data,

      success: function (jsonObj) {
        let notice = jsonObj;
        localStorage.setItem("notice", JSON.stringify(notice));
        let id = notice['adminId'];
        let content = notice["content"];
        let date = notice["createdDate"];
        let num = notice["noticeNum"];
        let title = notice["title"];
        if (userRole == 2) {
          $('#notice-edit').show();
          $('#notice-delete').show();
        }
        $("div.notice-num").html(num);
        $("div.notice-cont").html(content);
        $("div.notice-title").html(title);
        $("div.notice-date").html("작성일 | " + date);
        $("div.notice-id").html("작성자 | " + id);
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
    //-------글 상세 END------
  }

  viewNotice()

  //---------------글 목록으로 돌아가기 START ----------------
  $('div.notice-list').click(() => {
    location.href = "./noticelist.html"
  })

  //-------------글 목록으로 돌아가기 END ----------------------


  //-------수정폼으로 이동 START--------
  $("div.notice-edit").click((e) => {
    let noticeNum = $(e.target).parents("div.notice-view").find("div.notice-num").html();
    location.href = "./notice-edit.html?noticenum=" + noticeNum;
  });

  //-------수정폼으로 이동 END--------

  //글 삭제
  $('#notice-delete').click(function () {
    let data = location.search.substring(1);
    let regex = /[^0-9]/g;
    let noticeNum = data.replace(regex, "");
    $.ajax({
      method: "DELETE",
      url: backURL + "notice/" + noticeNum,
      data: noticeNum,
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      success: function () {
        alert("삭제되었습니다.");
        window.location.href = "./noticelist.html"
      },
      error: function (xhr) {
        if (xhr.responseJSON.details == 'NOT_FOUND_ADMIN') {
          alert('삭제 권한이 없습니다.')
        }
      },

    });
  })

});