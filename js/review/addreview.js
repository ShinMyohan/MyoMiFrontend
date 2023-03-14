let token = Cookies.get('token')
$(() => {
  $('div.submit>#submit').click(function () {

    let string = location.href.split('?');
    //console.log(string[1])
    let params = string[1].split('&');
    //console.log(params[0])
    let regex = /[^0-9]/g;
    let orderNum = params[0].replace(regex, "");
    let prodNum = params[1].replace(regex, "");


    let title = $('input[name="title"]').val();
    let star = $('#my-star option:checked').val();
    let content = $("#content").val();
    let imgfile = $('input[name="f2"]').get(0).files[0];
    if (imgfile == null) {
      sort = 3;
    } else {
      sort = 4;
    }

    if (title == '') {
      alert('제목을 입력하세요.');
      return;
    }
    if (star == '1~5점') {
      alert('평점을 선택하세요.')
      return;
    }
    if (content == '') {
      alert('내용을 입력하세요.');
      return;
    }


    let formData = new FormData();

    formData.append('content', content)
    formData.append('orderNum', orderNum)
    formData.append('prodNum', prodNum)
    formData.append('sort', sort)
    formData.append('stars', star)
    formData.append('title', title)
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
      success: function (response) {
        alert("리뷰작성이 완료되었습니다!");
        window.location.href = '../../html/mypage/reviewmypage.html';
      },
      error: function (xhr) {
      },
    });
  });
  // ---------- 리뷰 글자수 제한 ----------
  $("#content").keyup(function (e) {
    var reviewContent = $(this).val();
    $("#textLengthCheck").text("(" + reviewContent.length + " / 500)"); //실시간 글자수 카운팅
    if (reviewContent.length > 500) {
      alert("최대 500자까지 입력 가능합니다.");
      $(this).val(reviewContent.substring(0, 500));
      $('#textLengthCheck').text("(500 / 500)");
    }
  });

  //--취소 클릭시 START --
  $('div.cancel>#review-write-cancel').click(() => {
    window.location.href = '../../html/mypage/myorderlist.html';

  });
  //--취소 클릭시 END --

});
