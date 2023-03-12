$(() => {
    $('.empty-review').hide();
    let token = Cookies.get('token')
    function showList() {
        let $origin = $("tr#review-my-org").first();
        $("tr#review-my-org").not(":first-child").remove();
        $origin.show();
        $.ajax({
            url: backURL + "mypage/review",
            method: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            success: function (jsonObj) {

                let list = jsonObj;
                let $origin = $("tr#review-my-org").first();
                let $parent = $("tbody#review-my-parent");
                $(list).each(p => {
                    let prodname = list[p]['prodName'];
                    let num = list[p]['reviewNum'];
                    let title = list[p]['title'];
                    let date = list[p]['createdDate'];
                    let stars = list[p]['stars'];
                    let $copy = $origin.clone();

                    $copy.find("td#review-num").html(num);
                    $copy.find("td#review-prod-name").html(prodname);
                    $copy.find("td#review-title").html(title);
                    $copy.find("td#review-created-date").html(date);
                    $copy.find("td#review-star-rating").html(" &#11088;" + stars + "점");
                    $parent.append($copy);
                });
                $origin.hide();
            },
            // 응답이 실패했을 때의 콜백함수
            error: function (xhr) {
                if (xhr.responseJSON.details == 'REVIEW_NOT_FOUND') {
                    $origin.hide();
                    $('.empty-review').show();
                }
            },
        });
    } showList();

    //-- 리뷰목록 요청 end --

    //--글 클릭시 START--
    $('tbody#review-my-parent').on('click', 'tr#review-my-org', (e) => {
        let reviewNum = $(e.target).parents("tr#review-my-org").find("td#review-num").html();
        location.href = './reviewdetail.html?reviewNum=' + reviewNum
    })
    //--글 클릭시 END--



});