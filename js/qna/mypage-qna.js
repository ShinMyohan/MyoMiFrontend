$(() => {
    let token = Cookies.get('token')

    $("div.mpqna-list-empty").hide();

    //--상품문의목록 가져오기 START-
    function showList(url, page) {
        let $origin = $("div.qna-list-row").first();
        $("div.qna-list-row").not(":first-child").remove();
        $origin.show();
        $.ajax({
            url: url,
            method: "get",
            data: "currentPage=" + page,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            success: function (jsonObj) {
                let list = jsonObj.list;
                let endPage = jsonObj.endPage;
                let currentPage = jsonObj.currentPage;
                let totalPage = jsonObj.totalPage;
                let startPage = jsonObj.startPage;
                let totalCnt = list.length;

                console.log(jsonObj);
                console.log(totalCnt);
                console.log(list);

                cnt = 0;
                let $origin = $("div.qna-list-row").first();
                let $parent = $("div.qna-list-body");

                if (list ==null) {
                    $("div.mpqna-list-empty").show();
                } else {
                    $(list).each(p => {
                        let num = list[p]["qnaNum"];
                        let createdDate = list[p]["queCreatedDate"];
                        let storeName = list[p]["pname"];
                        let title = list[p]["queTitle"];
                        let status = list[p]["ansContent"];
                        let $copy = $origin.clone();

                        $copy.find("div.qna-real-num").html(num);
                        let arrNum = totalCnt - ((page - 1) * 10) - cnt
                        $copy.find("div.qna-num").html(arrNum);
                        cnt += 1
                        if (cnt == 10) { cnt = 0 };
                        $copy.find("div.qna-date").html(createdDate);
                        $copy.find("div.qna-store-name").html(storeName);
                        $copy.find("div.qna-title2").html(title);
                        if (status == null) {
                            $copy.find("div.qna-status").html('미답변');
                        } else {
                            $copy.find("div.qna-status").html('답변완료');
                        }
                        $parent.append($copy);
                    });

                }
                $origin.hide();

                let $pageGroup = $("div.pagegroup");
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
    let url = backURL + 'mypage/qna/list';
    showList(url, 1)
    //--상품문의목록 가져오기 END--

    //--페이지번호가 클릭되었을 때 할일 START--
    $("div.pagegroup").on("click", "span:not(.current)", (e) => {
        // alert("클릭됨");
        let page = $(e.target).attr("class");
        showList(url, page);
    });
    //--페이지번호가 클릭되었을 때 할일 END--

    //--문의가 클릭되었을 때 할일 START--
    $("div.qna-list-body").on("click", "div.qna-title2", (e) => {
        let qnaNum = $(e.target).parent("div.qna-list-row").find("div.qna-num").html();
        location.href = "./my-qnadetail.html?" + qnaNum
    })
    //--문의가 클릭되었을 때 할일 END--


})
