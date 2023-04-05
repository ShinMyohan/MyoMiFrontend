$(() => {
  let token = Cookies.get('token')
  // $('.re-hidden-rep-btn').hide();
  function viewReview() {
    let url = backURL;
    // ------글 상세내용 START------
    let data = location.search.substring(1);
    //console.log(data)
    let regex = /[^0-9]/g;
    let reviewNum = data.replace(regex, "");
    //console.log(reviewNum);
    $.ajax({
      method: "get",
      url: url + "mypage/review/" + reviewNum,
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      data: data,

      success: function (jsonObj) {
        let review = jsonObj;
        localStorage.setItem("review", JSON.stringify(review));
        let id = review['userName'];
        let prodname = review['prodName'];
        let num = review["reviewNum"];
        let content = review["content"];
        let title = review["title"];
        let date = review["createdDate"];
        let stars = review["stars"];
        let reviewImg = review["file"]
        if (reviewImg == null) {
          $("#review-img").hide();
        }
        $("div.id").html("작성자 | " + id);
        $("div.prodname").html("상품명 | " + prodname);
        $("div.num").html(num);
        $("div.content").html(content);
        $("div.title").html("제목 |" + title);
        $("div.date").html("작성일 | " + date);
        $("div.star-rating").html("&#11088;" + stars + "점");
        $("#review-img").attr('src', reviewImg);
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
    //-------글 상세 END------
  }

  viewReview()

  //---------------글 목록으로 돌아가기 START ----------------
  $('div.review-list').click(() => {
    location.href = "./reviewmypage.html"
  })

  //-------------글 목록으로 돌아가기 END ----------------------

  //-------수정폼으로 이동 START--------
  $("div.review-edit").click((e) => {
    let reviewNum = $(e.target).parents("div.review-view").find("div.num").html();
    location.href = "./reviewedit.html?reviewnum=" + reviewNum;
  });

  //-------수정폼으로 이동 END--------

});