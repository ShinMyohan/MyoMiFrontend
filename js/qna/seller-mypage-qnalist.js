$(()=>{
    // 수정모달창 열기
    $(document).on('click', '.qna-title2', function (e) {
        console.log("click event");
        $('.qna-answer-modal').addClass('show');
      
      });
      
    // 수정모달창 닫기
      $(document).on('click', '#close-btn', function (e) {
        console.log("click event");
        $('.qna-answer-modal').removeClass('show');
      
      });
    
    
    
    
    
    })