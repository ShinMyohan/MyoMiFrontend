$(()=>{
// 수정모달창 열기
$(document).on('click', '.mpdt-edit', function (e) {
    console.log("click event");
    $('.modal-qna-edit').addClass('show');
  
  });
  
// 수정모달창 닫기
  $(document).on('click', '#close-btn', function (e) {
    console.log("click event");
    $('.modal-qna-edit').removeClass('show');
  
  });





})