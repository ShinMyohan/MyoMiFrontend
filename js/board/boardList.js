$(() => {
  $('div.empty-list').hide();
  //-----------------글 리스트 출력하기 START----------------
  function showList(url, page) {
    // let url = backURL + 'board/list'
    let $origin = $("div.list").first();
    $("div.list").not(":first-child").remove();
    $origin.show();

    $.ajax({
      url: url + 'board/list?currentPage=' + page,
      method: "get",

      success: function (jsonObj) {
        let list = jsonObj.list;
        let $origin = $("div.list").first();
        let $parent = $("div.boardlist");

        let totalPage = jsonObj.totalPage;
        let currentPage = jsonObj.currentPage;
        let startPage = jsonObj.startPage;
        let endPage = jsonObj.endPage;
        let totalCnt = jsonObj.totalCnt;
        // console.log(jsonObj)
        cnt = 0;
        if (list == 0) {
          $('div.empty-list').show();
        } else {
          $(list).each((p) => {
            // console.log(list[p])
            let num = list[p]["boardNum"];
            let category = list[p]["category"];
            let title = list[p]["title"];
            let createdDate = list[p]["created_date"];
            let name = list[p]["userName"];
            let userName = name.replace(/(?<=.{1})./gi, "*")
            let hits = list[p]["hits"];
            let $copy = $origin.clone();

            $copy.find("div.bnum").html(num);
            let arrNum = totalCnt - ((page - 1) * 10) - cnt
            $copy.find("div.board-num").html(arrNum);
            cnt += 1
            if (cnt == 10) { cnt = 0 };

            $copy.find("div.bcategory").html(category);
            $copy.find("div.btitle").html(title);
            $copy.find("div.bdate").html(moment(createdDate).format("YYYY-MM-DD"));
            $copy.find("div.bwriter").html(userName);
            $copy.find("div.bhits").html(hits);

            $parent.append($copy);
          });
        }
        $origin.hide();
        let $pageGroup = $("div.pagenation");
        let pageGroupStr = "";
        if (startPage > 1) {
          pageGroupStr += '<span class="' + (startPage - 1) + '">[PREV]</span>';
        }
        if (endPage > totalPage) {
          endPage = totalPage;
        }

        for (let i = startPage; i <= endPage; i++) {
          if (i == currentPage) {
            pageGroupStr +=
              '<span class="current ' + i + '">[' + i + "]</span>";
          } else {
            pageGroupStr += '<span class="' + i + '">[' + i + "]</sapn>";
          }
        }
        if (endPage < totalPage) {
          pageGroupStr += '<span class="' + (endPage + 1) + '">[NEXT]<span>';
        }
        $pageGroup.html(pageGroupStr);
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
  }
  //-----------------글 리스트 출력하기 END----------------

  function searchList(page) {
    // $('#submit').click(function () {
    let category = $('div.searchselect>#searchselect option:checked').val();
    let title = $('#searchbox').val();

    if (category == '--카테고리를 선택하세요.--') {
      alert("카테고리를 선택하세요.");
      return;
    }

    let $origin = $("div.list").first();
    $("div.list").not(":first-child").remove();
    $origin.show();

    let url = backURL + 'board/list/'

    let data = {
      "category": category,
      "title": title,
    }
    // console.log(data);

    $.ajax({
      method: "get",
      url: url + category + '/' + title + '?currentPage=' + page,
      data: data,

      success: function (jsonObj) {
        let list = jsonObj.list;
        let $origin = $("div.list").first();
        let $parent = $("div.boardlist");

        let totalPage = jsonObj.totalPage;
        let currentPage = jsonObj.currentPage;
        let startPage = jsonObj.startPage;
        let endPage = jsonObj.endPage;
        let totalCnt = list.length;
        cnt=0;
        // console.log(list.length)
        if (list.length == 0) {
          $('div.empty-list').show();
          $('div.empty-list').html('검색 결과가 없습니다.');
          $('div.pagenation').hide();
        } else {
          $(list).each((p) => {
            $('div.empty-list').hide();
            let num = list[p]["boardNum"];
            let category = list[p]["category"];
            let title = list[p]["title"];
            let createdDate = list[p]["created_date"];
            let name = list[p]["userName"];
            let userName = name.replace(/(?<=.{1})./gi, "*")
            let hits = list[p]["hits"];
            let $copy = $origin.clone();

            $copy.find("div.bnum").html(num);
            let arrNum = totalCnt - ((page - 1) * 10) - cnt
            $copy.find("div.board-num").html(arrNum);
            cnt += 1
            if (cnt == 10) { cnt = 0 };
            $copy.find("div.bcategory").html(category);
            $copy.find("div.btitle").html(title);
            $copy.find("div.bdate").html(moment(createdDate).format("YYYY-MM-DD"));
            $copy.find("div.bwriter").html(userName);
            $copy.find("div.bhits").html(hits);

            $parent.append($copy);
          })
        }
        $origin.hide();
        $('div.empty-search-list').hide();
        let $pageGroup = $("div.pagenation");
        let pageGroupStr = "";
        if (startPage > 1) {
          pageGroupStr += '<span class="' + (startPage - 1) + '">[PREV]</span>';
        }
        if (endPage > totalPage) {
          endPage = totalPage;
        }

        for (let i = startPage; i <= endPage; i++) {
          if (i == currentPage) {
            pageGroupStr +=
              '<span class="current ' + i + '">[' + i + "]</span>";
          } else {
            pageGroupStr += '<span class="' + i + '">[' + i + "]</span>";
          }
        }
        if (endPage < totalPage) {
          pageGroupStr += '<span class="' + (endPage + 1) + '">[NEXT]<span>';
        }
        $pageGroup.html(pageGroupStr);
      },
      error: function (xhr) {
        alert(xhr.status);
      },

    })
  };

  //-----------------검색END-----------------

  let url = backURL;
  //-- 상품목록 요청START--
  showList(url, 1)

  //--글작성 클릭시 START --
  $("div.add").click(() => {
    let token = Cookies.get('token')
    if (token == null) {
      if (confirm('로그인 한 사용자만 이용 가능합니다. 로그인 하시겠습니까?')) {
        location.href = "../user/login.html"
      } else {
        location.href = "./boardList.html"
      }
    }
    if (token != null) {
      location.href = "./boardadd.html"
    }
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
  $('div.pagenation').on('click', 'span:not(.current)', (e) => {
    let page = $(e.target).attr('class')
    // console.log(page)
    showList(url, page)
  })
  //--페이지번호가 클릭되었을 때 할 일 END--
  $('#submit').click(() => {
    searchList(1)
  })


});