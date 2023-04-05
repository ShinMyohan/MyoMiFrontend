let token = Cookies.get('token')
$(() => {
  $('.empty-review').hide();
  $('#review-select').hide();
  function viewSellerReview() {
    let $origin = $("div.pr-review").first();
    $("div.pr-review").not(":first-child").remove();
    $origin.show();
    // ------판매자 상품별 리뷰 목록 START------
    let data = location.search.substring(1);
    let regex = /[^0-9]/g;
    //숫자를 제외한 정규식(즉, 영어,한글,특수문자 등등...)
    let prodNum = data.replace(regex, "");

    $.ajax({
      method: "get",
      url: backURL + "sellerpage/review/" + prodNum,
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      success: function (jsonObj) {
        let list = jsonObj;
        let $origin = $("div.pr-review").first();
        let $parent = $("div.pr-reviews");
        if (list == 0) {
          $('.empty-review').show();
        } else {
          $(list).each(p => {
            let id = list[p]['userName'];
            let userName = id.replace(/(?<=.{1})./gi, "*")
            let prodname = list[p]['prodName'];
            let num = list[p]["reviewNum"];
            let content = list[p]["content"];
            let title = list[p]["title"];
            let date = list[p]["createdDate"];
            let stars = list[p]["stars"];
            let sort = list[p]["sort"];
            let reviewImg = list[p]["file"]
            if (reviewImg == null) {
              $("#review-img").hide();
            } else {
              $("#review-img").show();
            }
            if (sort == 4) {
              $('#review-select').show();
            } else if (sort == 3) {
              $('#review-select').hide();
            }
            let $copy = $origin.clone();
            $copy.find("div.review-id").html(userName + " |");
            $copy.find("div.prod-name").html(prodname);
            $copy.find("div.review-num").html(num);
            $copy.find("div.review-content").html(content);
            $copy.find("div.review-title").html(title);
            $copy.find("div.date").html(date);
            $copy.find("div.star-rating").html(" &#11088;" + stars + "점");
            $copy.find("div.review-sort").html(sort);
            $copy.find("#review-img").attr('src', reviewImg);
            $parent.append($copy);
          });
        }
        $origin.hide();
      },
      error: function (xhr) {
      },
    });
    //-------판매자 상품별 리뷰 목록 END------
  }

  viewSellerReview();

  //-------리뷰 선정 버튼 클릭 START-----
  $('div.pr-reviews').on('click', '#review-select', (e) => {
    let reviewNum = $(e.target).parents("div.pr-review").find("div.review-num").html();
    let data = {
      "reviewNum": reviewNum
    }

    $.ajax({
      method: "post",
      url: backURL + "sellerpage/review/select/" + reviewNum,
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      success: function (response) {
        alert("베스트리뷰 선정이 완료되었습니다!");
        $(e.target).parents("div.pr-review").find('#review-select').attr('disabled', 'disabled');
      },
      error: function (xhr) {
        if (xhr.responseJSON.data == '이미 베스트리뷰입니다.') {
          alert(xhr.responseJSON.data)
          $(e.target).parents("div.pr-review").find('#review-select').attr('disabled', 'disabled');
        }


      },
    });
  })
});