$(() =>{
    let url = backURL;
// ------글 상세내용 START------
    let data = location.search.substring(1)
    console.log(data)
  
       $.ajax({
         method: "get",
         url: url +'board/detail',
         data: data,
         
         success : function(jsonObj){
            let list = jsonObj;
           // console.log(jsonObj[0]);
            
              let hits = list[0]["HITS"];
              let createdDate = list[0]["CREATED_DATE"];
              let num = list[0]["NUM"];
              let title = list[0]["TITLE"];
              let cont = list[0]["CONTENT"];
              let name = list[0]["NAME"];
             
               $("div.num").html(num);
               $("div.cont").html(cont);
               $("div.title").html(title);
               $("div.createdDate").html("작성일 | "+moment(createdDate).format("YYYY-MM-DD"));
               $("div.writer").html("작성자 | "+ name);
               $("div.hits").html("조회수 | "+ hits);
         },
         error: function (xhr) {
             alert(xhr.status);
           },
          
         })
    //-------글 상세 END------
    
    //---------글 삭제 START----------
       $("div.del").click(function(){
        let data = location.search.substring(1)
    
          $.ajax({
           method:"get",
           url: backURL+'board/delete',
           data: data,
           success: function(){
            alert('삭제되었습니다.')
           window.location.href = './boardList.html';
     
         },
          error: function (xhr) {
          alert(xhr.status);
       }
    })
   //---------글 삭제 END----------
})
   
  //--------목록으로 START----------
    $("div.back").click(() => {
        location.href ="./boardlist.html"
       });
  //--------목록으로 END----------
});