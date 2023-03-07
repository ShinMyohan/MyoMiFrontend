$(() => {
  $('div.submit>#submit').click(function () {
    
  //내 주문목록 페이지랑 합치고 나서 product,regex,order,orderNum 쓸 예정  
  //let product = location.search.substring(1);
   // let regex = /[^0-9]/g;
    //let order = location.search.substring(2);
   // let orderNum = order.replace(regex, "");
    let title = $("#title").val();
    let star = $('input[name="review-star"]:checked').val();
    let content = $("div.cont>#content").val();
    let imgfile = $('input[name="f2"]').get(0).files[0];
    
    if (title == "") {
      alert("제목이 입력되지 않았습니다");
      return;
    }
    if (content == "") {
      alert("내용이 입력되지 않았습니다");
      return;
    }
    if (star == "") {
      alert("평점이 선택되지 않았습니다");
      return;
    }
    let formData = new FormData();
    
    formData.append('content', content)
    formData.append('orderNum',7)
    formData.append('prodNum',1)
    formData.append('stars',star)
    formData.append('title',title)
    formData.append('file', imgfile)
    //console.log(formData);
    $.ajax({
      type: "POST",
      url: backURL + "mypage/review/add",
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      contentType: false,
      processData: false,
      enctype: 'multipart/form-data',
      data: formData,
      success: function () {
        alert("리뷰작성이 완료되었습니다!");
        window.location.href = './reviewmypage.html';
      },
      error: function (response) {
        alert("리뷰작성 실패!");
      },
    });
  });
  //--취소 클릭시 START --
  $('div.cancel>#review-write-cancel').click(() => {
    window.location.href = './reviewmypage.html';
  });
//--취소 클릭시 END --
  
});
