$(() => {
    function pointList(page) {
        let $origin = $('div.list-body').first();
        $("div.list.body").not(":first-child").remove();
        $origin.show();


        $.ajax({
            url: backURL + 'mypage/pointDetail',
            method: 'get',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            success: function (jsonObj) {
                let list = jsonObj;
                let $origin = $('div.list-body').first();
                let $parent = $('div.point-list');
                let size = list.length
                let arr =  new Array(size)  //  잔여 적립금용 배열 생성. 배열의 길이 
                arr.fill(0) //0으로 초기화
                arr[size-1] = list[size-1]["amount"] //마지막배열의 잔여 적립금은 amount로 대입
                
                for(let i= list.length-2; i >=0; i--){ //각 배열의 현재잔여 적립금은 현재 amount + 이전 잔여적립금로 계산 
                    arr[i] = list[i]["amount"] + arr[i+1] 
                }

                $(list).each((p) => {
                    let date = list[p]["createdDate"];
                    let sort = list[p]["sort"];
                    let amount = list[p]["amount"];
                    let detail;
                
                    switch (sort) {
                        case 0:
                            sort = "회원가입",
                                detail = "회원가입 감사 적립금입니다."
                            break;
                        case 1:
                            sort = "구매적립",
                                detail = "구매 적립금입니다."
                            break;
                        case 2:
                            sort = "결제차감",
                                detail = "주문시 사용하신 적립금입니다."
                            break;
                        case 3:
                            sort = "리뷰작성",
                                detail = "리뷰 작성 적립금입니다."
                            break;
                        case 4:
                            sort = "포토리뷰 작성",
                                detail = "포토리뷰 작성 적립금입니다."
                            break;
                        case 5:
                            sort = "베스트리뷰 선정",
                                detail = "베스트리뷰 선정 축하 적립금입니다."
                            break;
                        case 6:
                            sort = "등급업 적립금",
                                detail = "회원 등급업 감사 적립금입니다."
                            break;
                    }

                    let $copy = $origin.clone();

                    $copy.find("div.p-date").html(date);
                    $copy.find("div.p-sort").html(sort);
                    $copy.find("div.p-content").html(detail);
                    $copy.find("div.p-amount").html(amount.toLocaleString());
                    $copy.find("div.p-total").html(arr[p].toLocaleString());
                   
                    $parent.append($copy);
                    
                })
                $origin.hide();

                let length = $('div.list-body').length;
                $('div.point-list-header>i').html(length - 1);
            },
            error: function (xhr) {
                alert(xhr.status);
            }
        });
    }
    pointList()
})
//  --페이지번호가 클릭되었을 때 할 일 START--
$('div.pagegroup span').click(() => {
    alert('클릭됨')
})
$('div.pagegroup').on('click', 'span:not(.current)', (e) => {
    let page = $(e.target).attr('class')
    showList(page)
})
//   --페이지번호가 클릭되었을 때 할 일 END--

$(document).ready(function () {
    $(function () {
        $('input[name="daterange"]').daterangepicker({
            "startDate": "2023/02/10",
            "endDate": "2023/02/26",
            opens: 'center',
            locale: {
                format: 'YYYY/MM/DD'
            }
        });
    });
});