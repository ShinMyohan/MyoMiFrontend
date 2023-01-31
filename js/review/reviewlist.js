$(() => {
  // alert('js first');

  function showList(url) {
    let $origin = $("div.spr-review").first();

    //부모 기준에서는 empty()를 쓸 수 있지만 자식에서는 .remove()를 써야한다.
    $("div.spr-review").not(":first-child").remove();
    $origin.show();
    $.ajax({
      url: url,
      method: "get",
      // 응답이 성공했을 때의 콜백함수
      success: function (jsonObj) {
        // jsonObj 는 자바 객체
        let list = jsonObj;
        // console.log(jsonObj);

        let $origin = $("div.spr-review").first();
        let $parent = $("div.spr-reviews");
        $(list).each((p) => {
          //list를 하나씩 조회하는 반복문!
          console.log(p);
          // console.log(list[p]["NAME"]);
          let id = list[p]["USER_ID"];
          let date = list[p]["CREATED_DATE"];
          let starRating = list[p]["STARS"];
          let prodName = list[p]["NAME"];
          let title = list[p]["TITLE"];
          let content = list[p]["CONTENT"];

          let $copy = $origin.clone();

          $copy.find("div.id").html(id);
          $copy.find("div.date").html(moment(date).format("YYYY-MM-DD"));
          $copy.find("div.starRating").html("평점: " + starRating + "점");
          $copy.find("div.prodName").html(prodName);
          $copy.find("h3.title").html(title);
          $copy.find("div.content").html(content);
          $parent.append($copy);
        });
        $origin.hide(); //원래 기본형 지우기
      },
      // 응답이 실패했을 때의 콜백함수
      // 응답코드가 200번이 아니면 즉 에러 404, 500, CORS 에러 등을 마주하면 여기로 빠진다.
      error: function (xhr) {
        alert(xhr.status);
      },
    });
  }
  let url = backURL + "/review/listallreview?num=4";

  //-- 리뷰목록 요청 start --
  showList(url, 1);
  //-- 리뷰목록 요청 end --

  //-- 페이지번호가 클릭되었을 때 할 일 START --
 //-- 페이지번호가 클릭되었을 때 할 일 END --

});
