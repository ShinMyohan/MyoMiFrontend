$(()=>{
  let url = backURL+'product/qna/'
//--모달 닫기
$(document).on('click', '#close-btn', function (e) {
$('.qna-write').removeClass('show');

});

//--상품별 문의보기 START--
function showList(){
  let $origin = $("div.qna-list").first();
  $("div.qna-list").not(":first-child").remove();
  $origin.show();
  $.ajax({
      url:url+1,  //임시 상품번호
      method:"get",
      beforeSend: function (xhr) {
          xhr.setRequestHeader('Content-type', 'application/json');
          xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      success: function(jsonObj){
          let list = jsonObj;
          // console.log(list)
          let $origin = $("div.qna-list").first();
          let $parent = $("div.qna-parent-list");
          $(list).each(p=>{
              let num = list[p]["qnaNum"];
              let createdDate = list[p]["queCreatedDate"];
              let title2 = list[p]["queTitle"];
              let writer = list[p]["userId"]
              let status = list[p]["ansCreatedDate"];
              let title = list[p]["queTitle"];
              let queContent = list[p]["queContent"];
              let ansName = list[p]["companyName"];
              let prodName = list[p]["pname"]
              let ansContent = list[p]["ansContent"];
              let user = list[p]["userId"];
              let $copy = $origin.clone();  
              $copy.find("div.qna-num").html(num);
              $copy.find("div.qna-user-name").html(writer);
              $copy.find("div.qna-date").html(createdDate);
              $copy.find("div.qna-title2").html(title2);
              if(status == null){
                  $copy.find("div.qna-status").html('미답변');
                  $copy.find("div.qna-answer").hide();
              }else{
                  $copy.find("div.qna-status").html('답변완료');
              }
              $copy.find("div.qna-title").html(title);
              $copy.find("div.qna-content").html(queContent);
              $copy.find("div.answer-title").html(ansName);
              $copy.find("div.answer-content").html(ansContent);
              
              $parent.append($copy);
              //모달창 기본 정보
              $("div.seller-name").html(ansName);
              $("div.prod-name").html(prodName);
              $("#user-id").html(user);

          });
          $origin.hide();
          
          $(".qna-row").on('click',function(){
            $(this).next(".qna-detail").slideToggle(100)
          })
      },
      error: function (xhr) {
          alert(xhr.status);
      },
  });


} showList()
//--상품별 문의보기 END--

//--모달 열기 
$(document).on('click', '.qna-add-button', function (e) {
  $('.qna-write').addClass('show');
  });
  
  //--모달창 등록버튼 눌렀을 때 할 일 START--
  $(document).on('click','.modal-submit', function(e){
    let qnaTitle = $('input[name=modal-qna-title]').val();
    let qnaContent = $('#modal-qna-content').val();
    let imgFile = $('input[name="qnafile"]').get(0).files[0];
    // console.log(qnaTitle,qnaContent)
  
    if(qnaTitle == ''){
      alert("제목이 입력되지 않았습니다.");
      return;
    }
  
    if(qnaContent == ''){
      alert("내용이 입력되지 않았습니다.");
      return;
    }

    let formData = new FormData();
    formData.append('queTitle', qnaTitle);
    formData.append('queContent', qnaContent);
    formData.append('file', imgFile)
    // console.log(formData)

    $.ajax({
      type: "POST",
      url: url+1, //임시 상품번호
      data: formData,
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      contentType: false,
      processData: false,
      enctype: 'multipart/form-data',
      data: formData,
      success: function (response) {
        alert("등록이 완료되었습니다.");
        window.location.href = "./qnalist.html";
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
  }
  )
  //--모달창 등록버튼 눌렀을 때 할 일 END--

})


