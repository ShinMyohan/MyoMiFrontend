$(() => {
       //-- 공지사항목록 요청 start --
    function showList() {
        let $origin = $("tr#notice-org").first();

        $("tr#notice-org").not(":first-child").remove();
        $origin.show();
        $.ajax({
            method: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-type', 'application/json');
            },
            url:backURL+ "notice/list",
            method: "GET",
            // 응답이 성공했을 때의 콜백함수
            success: function (jsonObj) {
                let list = jsonObj;
                 console.log(jsonObj);

                let $origin = $("tr#notice-org").first();
                let $parent = $("tbody#notice-parent");
                $(list).each((p) => {
                   // console.log(p);
                    // console.log(list[p]["createdDate"]);
                    let id = list[p]["adminId"];
                    let content = list[p]["content"];
                    let date = list[p]["createdDate"];
                    let num = list[p]["noticeNum"];
                    let title = list[p]["title"];
                    let $copy = $origin.clone();

                    $copy.find("#notice-writer").html(id);
                    $copy.find("#notice-num").html(num);
                    $copy.find("#notice-created-date").html(date);
                    $copy.find("#notice-title").html(title);
                    $parent.append($copy);
                });
                $origin.hide(); //원래 기본형 지우기
            },
            // 응답이 실패했을 때의 콜백함수
            // 응답코드가 200번이 아니면 즉 에러 404, 500, CORS 에러 등을 마주하면 여기로 빠진다.
            error: function (xhr) {
                alert(xhr.status);
            },
        });
    } showList()
   
 
    //-- 공지목록 요청 end --

    //--글 클릭시 START--
    $('tbody#notice-parent').on('click', 'tr#notice-org', (e) => {
        let noticeNum = $(e.target).parents("tr#notice-org").find("#notice-num").html();
        location.href = './noticedetail.html?noticeNum=' + noticeNum
    })
     //--글 클릭시 END--
    
    //--글 작성버튼 클릭시 START--
    $("div.bt-write").click(() => {
    location.href ="./noticeadd.html"
   });
    //------------검색START----------------
    $('#submit').click(function () {
        let title = $('#searchbox').val();
        
        let $origin = $("tbody.notice-origin").first();
        $("tbody.notice-origin").not(":first-child").remove();
        $origin.show();
        let data = {
            "title": title,
        }
        $.ajax({
            method: "POST",
            url: url + 'notice/title/' + title,
            data: data,

            success: function (jsonObj) {
                let list = jsonObj;
                let $origin = $("tbody.notice-origin").first();
                let $parent = $("div.notice-parent");      
          
                $(list).each(p => {
                    //console.log(list[p]["num"]);
                    let id = list[p]["adminId"];
                    let content = list[p]["content"];
                    let date = list[p]["createdDate"];
                    let num = list[p]["noticeNum"];
                    let title = list[p]["title"];
                    let $copy = $origin.clone();

                    $copy.find("td#notice-writer").html(id);
                    $copy.find("td#notice-num").html(num);
                    $copy.find("td#notice-created-date").html(moment(date).format("|" + "YYYY-MM-DD"));
                    $copy.find("td#notice-title").html(title);
                    $parent.append($copy);
                });
                $origin.hide();
            
            },
            error: function (xhr) {
                alert(xhr.status);
            },
         
        })
    });
});


