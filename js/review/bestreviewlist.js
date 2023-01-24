$(() => {
  // alert('js first');

  function showList(url) {
    let $origin = $("div.spr-review").first();
    // let $parent = $('div.productlist')
    // $parent.find('div.product').not($origin).remove()

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
          // 상품 번호로 이미지 가져올거임
          // let imgStr = '<img src="../images/' + prodNo + '.jpeg">'
          // $copy.find('div.img').html(imgStr);

          // 태그용 JQuery 객체 만든것
          // let $imgObj = $('<img>')
          //속성 추가
          //$imgObj.attr('src','../images/' + prodNum + '.jpeg')
          //.empty()를 쓴 이유는 태그에 '이미지'라는 글자를 비우고 이미지 객체를 appned 하기 위해서
          //$copy.find('div.img').empty().append($imgObj)

          $copy.find("div.id").html(id);
          $copy.find("div.date").html(moment(date).format("YYYY-MM-DD"));
          $copy.find("div.starRating").html("평점: " + starRating + "점");
          $copy.find("div.prodName").html(prodName);
          $copy.find("h3.title").html(title);
          $copy.find("div.content").html(content);
          $parent.append($copy);
        });
        $origin.hide(); //원래 기본형 지우기~
      },
      // 응답이 실패했을 때의 콜백함수
      // 응답코드가 200번이 아니면 즉 에러 404, 500, CORS 에러 등을 마주하면 여기로 빠진다.
      error: function (xhr) {
        alert(xhr.status);
      },
    });
  }
  //let url = 'http://localhost:8088/myback/product/list' //백엔드랑 맞춰줘야함~ list인지 info인지~
  // let url = 'http://내ip 주소 넣어도됨:8088/myback/productlist'
  // let url = 'http://192.168.0.17:8088/myback/product/list'
  let url = backURL + "/review/listbestreview?num=4";

  //-- 상품목록 요청 start --
  //showList(1)을 하면 ..?
  showList(url, 1);
  //-- 상품목록 요청 end --

  //-- 페이지번호가 클릭되었을 때 할 일 START --
  //스팬객체는 돔트리가 처음 만들었을때부터 만들어져있는 객체인가? NO! 최초에 돔트리에 존재하지 않으므로 click 함수 이벤트 처리 불가
  //따라서 최초의 돔트리가 생성되었을 때부터 존재하는 객체에만 함수이벤트 사용가능
  // $('div.pagegroup.span').click(()=>{
  //     alert('click!')
});
