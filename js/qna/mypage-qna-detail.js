$(()=>{  
//--수정모달창 닫기 START--
  $(document).on('click', '#close-btn', function (e) {
    $('.modal-qna-edit').removeClass('show');
  
  });

  //--문의상세 보여주기 START--
  let url = backURL + "mypage/qna/detail/";
  let data = location.search.substring(1);
  $.ajax({
    url : url+data,
    method:"get",
    data: data,
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    },
    success: function(jsonObj){
      // console.log(jsonObj);
      $("div.mpdt-qna-title").html(jsonObj.queTitle);
      $("div.mpdt-user-name").html(jsonObj.userName);
      $("div.mpdt-qna-date").html(jsonObj.queCreatedDate);
      $("div.seller-name").html(jsonObj.companyName);
      $("div.prod-name").html(jsonObj.pname);
      $("#price").html(jsonObj.originPrice.toLocaleString()+"원");
      $("div.mpdt-q-content").html(jsonObj.queContent);
      $("#seller-name").html(jsonObj.companyName);
      $("div.mpdt-answer-date").html(jsonObj.ansCreatedDate);
      $("div.mpdt-answer-content").html(jsonObj.ansContent);
      $("#modal-qna-writer").html(jsonObj.id)
      $("input[name=modal-qna-title]").val(jsonObj.queTitle)
      $("#modal-qna-content").html(jsonObj.queContent)
      $("#qnaMainImg").attr('src',jsonObj.file)

    if(jsonObj.ansContent == null){
      $('div.mpdt-qna-a').hide();
    }

    if(jsonObj.ansContent != null){
      $('#edit-button').hide();
      $('#del-button').hide();
    }

    if(jsonObj.file == null){
      $("#qnaMainImg").hide();
    }
    },
    error: function(xhr){
      alert(xhr.status);
    }
  });
  //--문의상세 보여주기 END--

  //--수정버튼을 눌렀을 때 할일 START--
$(document).on('click', '.mpdt-edit', function (e) {
    console.log("click event");
    $('.modal-qna-edit').addClass('show');
  });
//--수정버튼을 눌렀을 때 할일 END--

//--모달수정버튼 눌렀을 때 할일 START--
$(document).on('click','.modal-submit', function(e){
  let qnaTitle = $('input[name=modal-qna-title]').val();
  let qnaContent = $('#modal-qna-content').val();
  // console.log(qnaTitle,qnaContent)

  if(qnaTitle == ''){
    alert("제목이 입력되지 않았습니다.");
    return;
  }

  if(qnaContent == ''){
    alert("내용이 입력되지 않았습니다.");
    return;
  }

  let data = {
    "queTitle": qnaTitle,
    "queContent": qnaContent,
  }

  // console.log(data);
  let url = backURL + "mypage/qna/detail/";
  let num = location.search.substring(1);

  $.ajax({
    type: "PUT",
    url: url+num,
    data: JSON.stringify(data),
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    },
    success: function (response) {
      alert("수정이 완료되었습니다.");
      window.location.href = "./mypage-qna.html";
    },
    error: function (xhr) {
      alert(xhr.status);
    },
  });
}
)
//--모달수정버튼 눌렀을 때 할일 END--

//--삭제버튼 눌렀을 때 할일 START--
$(document).on('click','#del-button',function(e){
  console.log("click event");
  let url = backURL + "mypage/qna/detail/";
  let data = location.search.substring(1);

  $.ajax({
    type: "Delete",
    url: url+data,
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    },
    success: function(response){
      alert("삭제가 완료되었습니다.");
      window.location.href = "./mypage-qna.html";
    }

  })

})
//--삭제버튼 눌렀을 때 할일 END--

})