$(() => {
//  alert('js first');
//-----------------글 리스트 출력하기 START----------------
  function showList(url) {
   // let url = backURL + 'board/list'
    let $origin = $("div.list").first();
    $("div.list").not(":first-child").remove();
    $origin.show();
    $.ajax({
      url: url  + 'board/list',
      method: "get",
      //data:JSON,
      //데이터 보낼때 '=' 양옆에공백이 있으면 안됨/
      //배열형태로 list변수에 담아서 반복문 돌려 꺼냄
      //copy에다 origin 복제해서 반복문으로 꺼낸 것들 담은 다음 parent에 추가해줌
      // data: "currentPage=" + page,
      success: function (jsonObj) {
        let list = jsonObj;
        let $origin = $("div.list").first();
        let $parent = $("div.boardlist");
       // console.log(jsonObj);
        $(list).each((p) => {
          //console.log(list[p]["num"]);
          let num = list[p]["NUM"];
          let category = list[p]["CATEGORY"];
          let title = list[p]["TITLE"];
          let createdDate = list[p]["CREATED_DATE"];
          let user_id = list[p]["USER_ID"];
          let hits = list[p]["HITS"];
          let $copy = $origin.clone();
          
          $copy.find("div.bnum").html(num);
          $copy.find("div.bcategory").html(category);
          $copy.find("div.btitle").html(title);
          $copy.find("div.bdate").html(createdDate);
          $copy.find("div.bwriter").html(user_id);
          $copy.find("div.bhits").html(hits);
          $parent.append($copy);
        });
        $origin.hide();
        
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
  }
  //-----------------글 리스트 출력하기 END----------------
  
  //-----------------검색START-----------------
 

  $('#submit').click(function(){
       let category = $('div.searchselect>#searchselect option:checked').val();
       let title = $('#searchbox').val();

    

       let $origin = $("div.list").first();
       $("div.list").not(":first-child").remove();
       $origin.show();
       let data = {
        "category":category,
        "title":title,
       }
       console.log(data);

      $.ajax({
        method: "POST",
        url: url +'board/category?category='+category+'&title='+title,
        data: data,

        success : function(jsonObj){
          let list = jsonObj;
        let $origin = $("div.list").first();
        let $parent = $("div.boardlist");
         
          //  alert ('검색결과.');
          
            $(list).each((p) => {
              //console.log(list[p]["num"]);
              let num = list[p]["NUM"];
              category = list[p]["CATEGORY"];
              title = list[p]["TITLE"];
              let createdDate = list[p]["CREATED_DATE"];
              let user_id = list[p]["USER_ID"];
              let hits = list[p]["HITS"];
              let $copy = $origin.clone();
              
              $copy.find("div.bnum").html(num);
              $copy.find("div.bcategory").html(category);
              $copy.find("div.btitle").html(title);
              $copy.find("div.bdate").html(createdDate);
              $copy.find("div.bwriter").html(user_id);
              $copy.find("div.bhits").html(hits);
               $parent.append($copy);
            });
           $origin.hide();
            
        },
        error: function (xhr) {
            alert(xhr.status);
          },
         
        })
  });

 //-----------------검색END-----------------
  let url = backURL
  //-- 상품목록 요청START--
  showList(url, 1)
 

//--글작성 클릭시 START --
$("div.add").click(() => {
    location.href ="./boardadd.html"
   });
//--글작성 클릭시 END --
  });