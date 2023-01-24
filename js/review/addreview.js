$(() => {
  $("div.bt_wrap>#btn-write").click(function () {
    let title = $("#title").val();
    let order_num = $("#order_num").val();
    let id = $("#id").val();
    let sort = $("#sort option:checked").val();
    let star = $('input[name="reviewStar"]:checked').val();
    let content = $("div.cont>#content").val();

    if (title == "") {
      alert("제목이 입력되지 않았습니다");
      return;
    }
    if (id == "") {
      alert("아이디가 입력되지 않았습니다");
      return;
    }

    if (order_num == "") {
      alert("주문번호가 입력되지 않았습니다");
      return;
    }

    if (star == "") {
      alert("평점이 선택되지 않았습니다");
      return;
    }

    if (content == "") {
      alert("제목이 입력되지 않았습니다");
      return;
    }

    let data = {
      "num": order_num,
      "id": id,
      "sort": sort,
      "stars": star,
      "title": title,
      "content": content,
    }
    console.log(data);
    $.ajax({
      type: "POST",
      url: url,
      data: JSON.stringify(data),
      success: function () {
        console.log(data);
        alert("리뷰작성이 완료되었습니다!");
        window.location.href = "";
      },
      error: function (response) {
        alert("리뷰작성 실패!");
      },
    });
  });
});

let url = backURL + "/review/addreview";
