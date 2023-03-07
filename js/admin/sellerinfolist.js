$(() => {
    function showList() {
        let $origin = $("tr#admin-seller-org").first();
        $("tr#admin-seller-org").not(":first-child").remove();
        $origin.show();
        $.ajax({
            url: backURL + "admin/seller",
            method: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            // 응답이 성공했을 때의 콜백함수
            success: function (jsonObj) {
                
                console.log("jsonObj:" + jsonObj);
                let list = jsonObj;
                localStorage.setItem("list", JSON.stringify(list));
                console.log("list:" + list);
                let $origin = $("tr#admin-seller-org").first();
                let $parent = $("tbody#admin-seller-parent");
                $(list).each(p => {
                    console.log(p);
                    console.log(list[p]["companyName"]);
                    let companyName = list[p]['companyName'];
                    let sellerId = list[p]['sellerId'];
                    let signoutDate = list[p]['signoutDate'];
                    let status = list[p]['status'];


                    if (status == 0) {
                        status = "승인대기";
                    }
                    else if (status == 1) {
                        status = "승인완료";
                    } else if (status == 2) {
                        status = "승인거절";
                    } else {
                        status = "탈퇴";
                    }
                    if (signoutDate == null) {
                        signoutDate = "없음";
                    } else {
                        signoutDate = list[p]['signoutDate'];
                    }
                    let $copy = $origin.clone();

                    $copy.find("td.seller-id").html(sellerId);
                    $copy.find("td.store-name").html(companyName);
                    $copy.find("td.seller-status").html(status);
                    $copy.find("td.signout-date").html(signoutDate);
                    $parent.append($copy);
                });
                $origin.hide(); 
            },
            // 응답이 실패했을 때의 콜백함수
            // 응답코드가 200번이 아니면 즉 에러 404, 500, CORS 에러 등을 마주하면 여기로 빠진다.
            error: function (xhr) {
                alert(xhr.status);
            },
        });
    } showList();

    //-- 리뷰목록 요청 end --

    //--글 클릭시 START--
    $('tbody#admin-seller-parent').on('click', 'tr#admin-seller-org', (e) => {
        let sellerid = $(e.target).parents("tr#admin-seller-org").find("td.seller-id").html();
        location.href = './sellerdetail.html?sellerid=' + sellerid
    })
    //--글 클릭시 END--



});