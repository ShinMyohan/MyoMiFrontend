$(()=>{
    $('div.my-rep-list').hide();

    //내가 쓴 글 
 function showList() {
   let $origin = $('div.list-body').first();
   $("div.list.body").not(":first-child").remove();
    $origin.show();

    $.ajax({
        url : backURL +'mypage/boardList',
        method : 'get',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
          },
        success : function(jsonObj){
            let list = jsonObj;

            let $origin = $('div.list-body').first();
            let $parent = $('div.my-board-list');
            $(list).each((p)=>{
                // console.log(list);
                let num = list[p]["boardNum"];
                let category = list[p]["category"];
                let title = list[p]["title"];
                let date = list[p]["createdDate"];
                let hits = list[p]["hits"];

                let $copy = $origin.clone();

                $copy.find("div.my-board-body-num").html(num);
                $copy.find("div.my-board-body-category").html(category);
                $copy.find("div.my-board-body-title").html(title);
                $copy.find("div.my-board-body-created-date").html(date);
                $copy.find("div.my-board-body-hits").html(hits);
                

                $parent.append($copy);
            })
            $origin.hide();
        },
        error : function(xhr) {
            alert(xhr.status+"만원");
        }
    });
 }
showList();

    //---게시글 탭 클릭시---
    $('#home-tab').click(()=>{
        $('#home-tab').css('border-top','3px solid #00af85');
        $('#my-reps-tab').css('border-top','0');
        $('div.my-rep-list').hide();
        $('div.my-board-list').show();
    })

    //---댓글 탭 클릭시---
    $('#my-reps-tab').click(()=>{
        $('#my-reps-tab').css('border-top','3px solid #00af85');
        $('#home-tab').css('border-top','0');
        $('div.my-rep-list').show();
        $('div.my-board-list').hide();
    })

   

    //게시글리스트 - 제목 클릭시 
    $('div.my-board-list').on('click','div.my-board-body-title',(e)=>{
        let boardNum = $(e.target).parents('div.list-body').find('div.my-board-body-num').html();
        // console.log(boardNum)
        location.href = "../board/detail.html?"+boardNum;
    })

    //댓글리스트 - 댓글내용클릭시 원글로 이동 
     $('div.my-rep-list').on('click','div.my-rep-body-content',(e)=>{
        let boardNum = $(e.target).parent('div.list-rep-body').find('div.my-rep-body-num').html();
        location.href = "../board/detail.html?"+boardNum;
     })

})

//댓글 목록 
function showCommentList() {
    let $origin = $('div.list-rep-body').first();
     $("div.list-rep-body").not(":first-child").remove();
     $origin.show();
     $.ajax({
         url : backURL +'mypage/commentList',
         method : 'get',
         beforeSend: function (xhr) {
             xhr.setRequestHeader('Content-type', 'application/json');
             xhr.setRequestHeader('Authorization', 'Bearer ' + token);
           },
         success : function(jsonObj){
             let list = jsonObj;
             let $origin = $('div.list-rep-body').first();
             let $parent = $('div.my-rep-list');
             $(list).each((p)=>{
                 let num = list[p]["boardNum"];
                 let category = list[p]["category"];
                 let title = list[p]["title"];
                 let content = list[p]["content"];
                 let date = list[p]["createdDate"];
 
                 let $copy = $origin.clone();
 
                 $copy.find("div.my-rep-body-num").html(num);
                 $copy.find("div.my-rep-body-category").html(category);
                 $copy.find("div.my-rep-body-title").html(title);
                 $copy.find("div.my-rep-body-content").html(content);
                 $copy.find("div.my-rep-body-created-date").html(date);
 
                 $parent.append($copy);
             })
              $origin.hide();
         },
         error : function(xhr) {
             alert(xhr.status+"만원");
         }
     });
  }
  showCommentList()
  
  $(document).ready(function(){
    $(function() {
        $('input[name="daterange"]').daterangepicker({
            "startDate": "2023/02/10",
            "endDate": "2023/02/26",
            opens: 'center',
            locale: {
            format: 'YYYY/MM/DD'
            }
        });
    });
});