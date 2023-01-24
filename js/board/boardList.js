$(() => {
  
//  alert('js first');
//-----------------글 리스트 출력하기 START----------------
  function showList(url) {
   // let url = backURL + 'board/list'
    let $origin = $("div.list").first();
    $("div.list").not(":first-child").remove();
    $origin.show();
    $.ajax({
      url: url+'board/list',
      method: "get",
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
          let name = list[p]["NAME"];
          let hits = list[p]["HITS"];
          let $copy = $origin.clone();
          
          $copy.find("div.bnum").html(num);
          $copy.find("div.bcategory").html(category);
          $copy.find("div.btitle").html(title);
          $copy.find("div.bdate").html(moment(createdDate).format("YYYY-MM-DD"));
          $copy.find("div.bwriter").html(name);
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
              let name = list[p]["NAME"];
              let hits = list[p]["HITS"];
              let $copy = $origin.clone();
              
              $copy.find("div.bnum").html(num);
              $copy.find("div.bcategory").html(category);
              $copy.find("div.btitle").html(title);
              $copy.find("div.bdate").html( moment(createdDate).format("YYYY-MM-DD"));
              $copy.find("div.bwriter").html(name);
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
 
  let url = backURL;
  //-- 상품목록 요청START--
  showList(url, 1)
 

//--글작성 클릭시 START --
$("div.add").click(() => {
    location.href ="./boardadd.html"
   });
//--글작성 클릭시 END --

//--글 클릭시 START--

$("div.boardlist").on('click','div.list',(e)=>{
  let num = $(e.target).parents('div.list').find('div.bnum').html();
  location.href='./detail.html?num='+num;
})

//--글 클릭시 END--
  });