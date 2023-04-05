$(()=>{   
  let token = Cookies.get('token')

  $("div.qna-list-empty").hide();
  
    // 답변모달창 닫기
      $(document).on('click', '#close-btn', function (e) {
        $('.qna-answer-modal').removeClass('show');
      
      });
      
      //--판매자 문의목록 보기 START--
      function showList(){
        let $origin = $("div.qna-list-row").first();
        $("div.qna-list-row").not(":first-child").remove();
        $origin.show();
        $.ajax({
            url: backURL+'sellerpage/qna/list',
            method:"get",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            success: function(jsonObj){
                let list = jsonObj;
                let $origin = $("div.qna-list-row").first();
                let $parent = $("div.qna-list-body");
                $(list).each(p=>{
                    let num = list[p]["qnaNum"];
                    let createdDate = list[p]["queCreatedDate"];
                    let title2 = list[p]["queTitle"];
                    let writer = list[p]["userName"]
                    let userName = writer.replace(/(?<=.{1})./gi,"*");
                    let status = list[p]["ansCreatedDate"];
                    let $copy = $origin.clone();    
                    $copy.find("div.qna-num").html(num);
                    $copy.find("div.qna-date").html(createdDate);
                    $copy.find("div.qna-title2").html(title2); 
                    $copy.find("div.qna-writer").html(userName);

                    if(status == null){
                        $copy.find("div.qna-status").html('미답변');
                    }else{
                        $copy.find("div.qna-status").html('답변완료');
                    }
                    $parent.append($copy);

                });
                if(list == ''){
                  $("div.qna-list-empty").show();
                }

                $origin.hide();
            },
            error: function (xhr) {
                alert(xhr.status);
            },
        });
    } showList()
    //--판매자 문의목록 보기 END--

    //--답변모달창 열기 START--
    $(document).on('click', '.qna-title2', function (e) {
      $('.qna-answer-modal').addClass('show');
      let qnaNum = $(e.target).parent("#sellerqna").find("div.qna-num").html();
      let url = backURL + "sellerpage/qna/detail/"
      $("#qnaMainImg").hide();
      $.ajax({
        url : url+qnaNum,
        method:"get",
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Content-type', 'application/json');
          xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        success: function(jsonObj){
          $("div.qna-num-modal").html(jsonObj.qnaNum);
          $("div.prod-name").html(jsonObj.pname);
          $("div.user-name-modal").html(jsonObj.userName.replace(/(?<=.{1})./gi,"*"));
          $("div.qna-date-modal").html(jsonObj.queCreatedDate);
          $("#qnaMainImg").attr('src',jsonObj.file)
          $("div.qna-title-user-modal").html(jsonObj.queTitle);
          $("div.qna-content-user-modal").html(jsonObj.queContent);
          $("#seller-answer-content").html(jsonObj.ansContent);
          $("#qnaProdImg").attr('src',jsonObj.prodImg)
          if(jsonObj.file != null){
            $("#qnaMainImg").show();
          }
          if(jsonObj.ansContent != null){
            $("#seller-answer-content").attr("readonly",true);
          }else{
            $("#seller-answer-content").removeAttr("readonly"); 
          }

        },
        error: function(xhr){
          alert(xhr.status);
        }
      });
    });
    //--답변모달창 열기 END--
    
    // --판매자 문의답변 모달 START--
    $(document).on('click','.modal-submit', function(e){
      let ansContent = $('#seller-answer-content').val();
      let num = document.getElementById('title-num').innerText;

      if(ansContent == ''){
        alert("내용이 입력되지 않았습니다.");
        return;
      }
      let data = {
        "ansContent": ansContent
      }
    
      let url = backURL + "sellerpage/qna/detail/";
    
      $.ajax({
        type: "PUT",
        url: url+num,
        data: JSON.stringify(data),
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Content-type', 'application/json');
          xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        success: function (response) {
          alert("답변이 완료되었습니다.");
          window.location.href = "./sellerpage-qnalist.html";
        },
        error: function (xhr) {
          alert(xhr.status);
        },
      });
    }
    )
    // --판매자 문의목록 모달 END--

  })