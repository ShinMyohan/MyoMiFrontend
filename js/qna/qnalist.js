$(()=>{
  //문의 상세 보여주기
  $(".qna-row").on('click',function(){
      $(this).next(".qna-detail").slideToggle(100)
    })

    // //파일명 보여주기
    // $("#file").on('change',function(){
    //   var fileName = $("#file").val();
    //   $(".upload-name").val(fileName);
    // });

    // 모달 열기
$(document).on('click', '.qna-add-button', function (e) {
console.log("click event");
$('.qna-write').addClass('show');

});

// 모달 닫기
$(document).on('click', '#close-btn', function (e) {
console.log("click event");
$('.qna-write').removeClass('show');

});





})


