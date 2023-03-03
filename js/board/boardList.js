$(() => {

  //  alert('js first');
  //-----------------글 리스트 출력하기 START----------------
  function showList(url) {
    // let url = backURL + 'board/list'
    let $origin = $("div.list").first();
    $("div.list").not(":first-child").remove();
    $origin.show();
   
   
    $.ajax({
      url: url + 'board/list',
      method: "get",
    
      success: function (jsonObj) {
        let list = jsonObj;
        // let totalPage = jsonObj.pageSize;
        // let currentPage = jsonObj.number;
        // let startPage = jsonObj.startPage;
        // let endPage = jsonObj.endPage;


        let $origin = $("div.list").first();
        let $parent = $("div.boardlist");
        // console.log(jsonObj);
        $(list).each((p) => {
          //console.log(list[p]["num"]);
          let num = list[p]["boardNum"];
          let category = list[p]["category"];
          let title = list[p]["title"];
          let createdDate = list[p]["created_date"];
          let name = list[p]["userName"];
          let hits = list[p]["hits"];
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

        // let $pageGroup = $('div.pagegroup')
        // let pageGroupStr = ''
        // if(startPage > 1){
        //     pageGroupStr += '<span class="'+(startPage-1)+'">[PREV]</span>'
        // }
        // if(endPage > totalPage){
        //     endPage = totalPage;
        // }
        // for(let i=startPage; i<=endPage; i++){
        //     if(i == currentPage){
        //         pageGroupStr += '<span class="current '+i+'">[' + i +']</span>'
        //     }else{
        //         pageGroupStr += '<span class="'+i+'">[' + i +']</span>'
        //     }
        // }
        // if(endPage < totalPage){
        //     pageGroupStr += '<span class="'+(endPage+1)+'">[NEXT]</span>'
        // }
        // $pageGroup.val(pageGroupStr)

      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });

  }
  //-----------------글 리스트 출력하기 END----------------

  //-----------------검색START-----------------
  $('#submit').click(function () {
    let category = $('div.searchselect>#searchselect option:checked').val();
    let title = $('#searchbox').val();

    let $origin = $("div.list").first();
    $("div.list").not(":first-child").remove();
    $origin.show();

    let data = {
      "category": category,
      "title": title,
    }
    console.log(data);

    $.ajax({
      method: "get",
      url: url + 'board/list/' + category + '/' + title,
      data: data,

      success: function (jsonObj) {
        let list = jsonObj;
        let $origin = $("div.list").first();
        let $parent = $("div.boardlist");

        //  alert ('검색결과.');

        $(list).each((p) => {
          //console.log(list[p]["num"]);
          let num = list[p]["boardNum"];
          category = list[p]["category"];
          title = list[p]["title"];
          let createdDate = list[p]["created_date"];
          let name = list[p]["userName"];
          let hits = list[p]["hits"];
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

    })
  });

  //-----------------검색END-----------------

  let url = backURL;
  //-- 상품목록 요청START--
  showList(url, 1)


  //--글작성 클릭시 START --
  $("div.add").click(() => {
    location.href = "./boardadd.html"
  });
  //--글작성 클릭시 END --

  //--글 클릭시 START--

  $("div.boardlist").on('click', 'div.list', (e) => {
    let boardNum = $(e.target).parents('div.list').find('div.bnum').html();
    location.href = './detail.html?' + boardNum;
  })

  //--글 클릭시 END--

  $('div.board-title').click(() => {
    location.href = "./boardlist.html"
  })

  //--페이지번호가 클릭되었을 때 할 일 START--
    //$('div.pagegroup span').click(()=>{
    //    alert('클릭됨')
    //})
  //   $('div.pagegroup').on('click', 'span:not(.current)', (e)=>{
  //     let page = $(e.target).attr('class')
  //     showList(url, page)
  // })
  //--페이지번호가 클릭되었을 때 할 일 END--

});