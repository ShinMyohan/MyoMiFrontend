$(() => {
  $('.hidden-rep-btn').hide();
  $('.re-rep-write').hide();
  // $('.re-hidden-rep-btn').hide();

  function viewBoard() {
    let url = backURL;
  // ------글 상세내용 START------
  let data = location.search.substring(1);
  //console.log(data)

  $.ajax({
    method: "get",
    url: url + "board/detail",
    data: data,

    success: function (jsonObj) {
      let list = jsonObj;
      localStorage.setItem("list", JSON.stringify(list));
      console.log(list);
      console.log("viewBoard() 불려와짐");
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
      $("div.createdDate").html(
        "작성일 | " + moment(createdDate).format("YYYY-MM-DD")
      );
      $("div.writer").html("작성자 | " + name);
      $("div.hits").html("조회수 | " + hits);
    },
    error: function (xhr) {
      alert(xhr.status);
    },
  });
  //-------글 상세 END------
  }
  
  viewBoard()

  //---------글 삭제 START----------
  $("div.del").click(function () {
    let data = location.search.substring(1);

    $.ajax({
      method: "get",
      url: backURL + "board/delete",
      data: data,
      success: function () {
        alert("삭제되었습니다.");
        window.location.href = "./boardList.html";
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
    //---------글 삭제 END----------
  });

  //--------목록으로 START----------
  $("div.back").click(() => {
    location.href = "./boardlist.html";
  });
  //--------목록으로 END----------

  //-------수정폼으로 이동 START--------
  $("div.edit").click(() => {
    // viewBoard();
    location.href = "./boardedit.html";
  });

  $("div.edit").on("click", "div.board_view", (e) => {
    let num = $(e.target).parents("div.list").find("div.bnum").html();
    location.href = "./detail.html?num=" + num;
  });
  //-------수정폼으로 이동 END--------


  //===================원댓글======================
  //------댓글 수정버튼 눌렀을 때 START-----
  function showMenuEditRep() {
   $('.hidden-rep-btn').show();
   $('.rep-menu').hide();
  }
  //-----댓글 수정버튼 눌렀을 떄 END--------

  //-----수정버튼 누른 후 취소버튼 눌렀을때
  function showMenuCancle() {
    $('.hidden-rep-btn').hide();
    $('.rep-menu').show();
   }


  //-------------댓글 수정 START-------------
   $('.rep-edit-btn').click(()=>{
     //alert('수정버튼 클릭됨');
     $('#rep-content').attr('readonly', false);
     $('#rep-content').css("border","1px solid green")
     showMenuEditRep();
   })
  //-------------댓글 수정 END-------------

  $('#hid-cancle-btn').click(()=>{
    $('#rep-content').attr('readonly', true);
    $('#rep-content').css("border","0")
    showMenuCancle();
  })

  $('.rep-second-btn').click (()=>{
    $('.re-rep-write').show();
  })


  $('#re-rep-cancle-btn').click (()=>{
    $('.re-rep-write').hide();
  })
  
//====================원댓글END=========================

//===================리댓글========================
//------댓글 수정버튼 눌렀을 때 START-----
// function showMenuEditRep() {
//   $('.re-hidden-rep-btn').show();
//   $('.re-rep-menu').hide();
//  }
//  //-----댓글 수정버튼 눌렀을 떄 END--------

//  //-----수정버튼 누른 후 취소버튼 눌렀을때
//  function showMenuCancle() {
//    $('.re-hidden-rep-btn').hide();
//    $('.re-rep-menu').show();
//   }


//  //-------------댓글 수정 START-------------
//   $('.re-rep-edit-btn').click(()=>{
//     //alert('수정버튼 클릭됨');
//     $('#re-rep-content').attr('readonly', false);
//     $('#re-rep-content').css("border","1px solid green")
//     showMenuEditRep();
//   })
//  //-------------댓글 수정 END-------------

//  $('#re-hid-cancle-btn').click(()=>{
//    $('#re-rep-content').attr('readonly', true);
//    $('#re-rep-content').css("border","0")
//    showMenuCancle();
//  })
  
 //===================리댓END=======================
});
