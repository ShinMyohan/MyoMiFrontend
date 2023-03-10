$(() => {
  let token = Cookies.get('token')
  $('.notice-edit').hide();

  // $('.re-hidden-rep-btn').hide();

  function viewNotice() {
    let url = backURL;
    // ------글 상세내용 START------
    let data = location.search.substring(1);
    console.log(data)
      // 숫자만 뽑고싶다면, 
    let regex = /[^0-9]/g; 
    //숫자를 제외한 정규식(즉, 영어,한글,특수문자 등등...)
    let noticeNum = data.replace(regex,"");
    console.log(noticeNum);
    //let noticeNum = data.split('=');
    //console.log(noticeNum[0]);
    $.ajax({
      method: "get",
      url: url + "notice/"+noticeNum,
      data: data,

      success: function (jsonObj) {
        let notice = jsonObj;
        let id = notice['adminId'];
        let content = notice["content"];
        let date = notice["createdDate"];
        let num = notice["noticeNum"];
        let title = notice["title"];

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
  
  
});