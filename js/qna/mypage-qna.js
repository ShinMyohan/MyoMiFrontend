$(()=>{
    //--상품목록 가져오기 START-
function showList(){
    let $origin = $("div.qna-list-row").first();
    $("div.qna-list-row").not(":first-child").remove();
    $origin.show();
    $.ajax({
        url: backURL+'mypage/qna/list',
        method:"get",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        success: function(jsonObj){
            let list = jsonObj;
            // console.log(list)
            let $origin = $("div.qna-list-row").first();
            let $parent = $("div.qna-list-body");
            $(list).each(p=>{
                let num = list[p]["qnaNum"];
                let createdDate = list[p]["queCreatedDate"];
                let storeName = list[p]["pname"];
                let title = list[p]["queTitle"];
                let status = list[p]["ansCreatedDate"];
                let $copy = $origin.clone();

                $copy.find("div.qna-num").html(num);
                $copy.find("div.qna-date").html(createdDate);
                $copy.find("div.qna-store-name").html(storeName); 
                $copy.find("div.qna-title2").html('문의드립니다');
                if(status == null){
                    $copy.find("div.qna-status").html('미답변');
                }else{
                    $copy.find("div.qna-status").html('답변완료');
                }
                $parent.append($copy);
            });
            $origin.hide();
        },
        error: function (xhr) {
            alert(xhr.status);
        },
    });
} showList()
//--상품목록 가져오기 END--

//--상품이 클릭되었을 때 할일 START--
$("div.qna-list-body").on("click","div.qna-title2",(e) => {
    let qnaNum = $(e.target).parent("div.qna-list-row").find("div.qna-num").html();
    location.href ="./my-qnadetail.html?"+qnaNum
})
//--상품이 클릭되었을 때 할일 END--




})
