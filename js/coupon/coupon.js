$(() => {
    let token = Cookies.get('token')
    $('div.expired-coupon-list').hide();
    $('div.empty-list').hide();
    $('div.exp-empty-list').hide();
    
    function couponList() {
        let $origin = $('div.list-body');
        $("div.list.body").not(":first-child").remove();
        $origin.show();

        $.ajax({
            url: backURL + "mypage/couponList",
            method: 'get',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            success: function (jsonObj) {
                let list = jsonObj;
                let $origin = $('div.list-body').first();
                let $parent = $('div.coupon-list');
                
                $(list).each((p)=>{
                    let cdate = list[p]["createdDate"];
                    let date = new Date('20'+cdate); 
                    //db에서 받아오는 날짜포맷은 yy-MM-dd 이고 Date 함수의 포맷은 yyyy-MM-dd라서 
                    //앞에 '20'을 붙여주어 동일한 포맷으로 만들어 줌
                    let expdate = date.setDate(date.getDate() + 30);
                    let sort = list[p]["sort"]; //발급 유형 - 쿠폰명
                    let status = list[p]["status"]; //사용여부 
                    let benefit; //혜택
                    let condition; //사용조건 
                    let limit; //제한조건
                    
                    if (status == 0) {
                        switch (sort) {
                            case 0:
                                sort = "회원가입 축하 5% 할인쿠폰!"
                                benefit = "5% 상품 할인 쿠폰"
                                condition = "2만원 이상 주문시 사용가능"
                                limit = "일부 품목 제외"
                                break;
                            case 1:
                                sort = "골드 레벨 달성 축하 3% 할인쿠폰!"
                                benefit = "3% 상품 할인 쿠폰"
                                condition = "2만원 이상 주문시 사용가능"
                                limit = "일부 품목 제외"
                                break;
                            case 2:
                                sort = "플래티넘 레벨 달성 축하 5% 할인쿠폰!"
                                benefit = "5% 상품 할인 쿠폰"
                                condition = "2만원 이상 주문시 사용가능"
                                limit = "일부 품목 제외"
                                break;
                            case 3:
                                sort = "다이아몬드 레벨 달성 축하 7% 할인쿠폰!"
                                benefit = "7% 상품 할인 쿠폰"
                                condition = "2만원 이상 주문시 사용가능"
                                limit = "일부 품목 제외"
                                break;
                        }
                    let $copy = $origin.clone();

                    $copy.find('div.c-name').html('<img src="../../images/coupon/coupon.png"> <br />'+sort);
                    $copy.find('div.c-benefit').html(benefit);
                    $copy.find('div.c-condition').html(condition);
                    $copy.find('div.c-limit').html(limit);
                    $copy.find('div.c-avaliable').html("20"+cdate+" ~ <br />"+moment(expdate).format("YYYY-MM-DD")
                    +'<span class="c-notice">사용가능</span>');
                    $copy.find('div.c-date').html("20"+cdate);

                    $parent.append($copy);

                }else{
                    $('div.empty-list').show();
                }
                })
                $origin.hide();
            },
            error: function (xhr) {
                alert(xhr.status + "만원");
            }
        })
    }
    couponList()

   //만료, 사용된 쿠폰 (합치고싶었으나 실패..)
    function expCouponList() {
        let $origin = $('div.expired-list-body');
        $("div.expired-list.body").not(":first-child").remove();
        $origin.show();

        $.ajax({
            url: backURL + "mypage/couponList",
            method: 'get',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            success: function (jsonObj) {
                let list = jsonObj;
                let $origin = $('div.expired-list-body').first();
                let $parent = $('div.expired-coupon-list');
                
                $(list).each((p)=>{
                    // console.log(list);
                  
                    let cdate = list[p]["createdDate"];
                    let date = new Date('20'+cdate); 
                    //db에서 받아오는 날짜포맷은 yy-MM-dd 이고 Date 함수의 포맷은 yyyy-MM-dd라서 
                    //앞에 '20'을 붙여주어 동일한 포맷으로 만들어 줌
                    let expdate = date.setDate(date.getDate() + 30);
                    let sort = list[p]["sort"]; //발급 유형 - 쿠폰명
                    let status = list[p]["status"]; //사용여부 
                    let benefit; //혜택
                    let condition; //사용조건 
                    let limit; //제한조건6
                    
                    if (status != 0) {
                        switch (sort) {
                            case 0:
                                sort = "회원가입 축하 5% 할인쿠폰!"
                                benefit = "5% 상품 할인 쿠폰"
                                condition = "2만원 이상 주문시 사용가능"
                                limit = "일부 품목 제외"
                                break;
                            case 1:
                                sort = "골드레벨 달성 축하 3% 할인쿠폰!"
                                benefit = "3% 상품 할인 쿠폰"
                                condition = "2만원 이상 주문시 사용가능"
                                limit = "일부 품목 제외"
                                break;
                            case 2:
                                sort = "플래티넘레벨 달성 축하 5% 할인쿠폰!"
                                benefit = "5% 상품 할인 쿠폰"
                                condition = "2만원 이상 주문시 사용가능"
                                limit = "일부 품목 제외"
                                break;
                            case 3:
                                sort = "다이아몬드레벨 달성 축하 7% 할인쿠폰!"
                                benefit = "7% 상품 할인 쿠폰"
                                condition = "2만원 이상 주문시 사용가능"
                                limit = "일부 품목 제외"
                                break;
                        }
                    let $copy = $origin.clone();

                    $copy.find('div.exp-c-name').html('<img src="../../images/coupon/exp_coupon.png"> <br />'+sort);
                    $copy.find('div.exp-c-benefit').html(benefit);
                    $copy.find('div.exp-c-condition').html(condition);
                    $copy.find('div.exp-c-limit').html(limit);
                    $copy.find('div.exp-c-avaliable').html("20"+cdate +" ~ <br />"+moment(expdate).format("YYYY-MM-DD")
                    +'<span class="exp-c-notice">사용불가</span>');
                    $copy.find('div.exp-c-date').html("20"+cdate);

                    $parent.append($copy);

                    }else{
                        $('div.exp-empty-list').show();
                    }
                })
                $origin.hide();
            },
            error: function (xhr) {
                alert(xhr.status + "만원");
            }
        })
    }
    expCouponList()

    //---사용가능 탭 클릭시---
    $('#home-tab').click(() => {
        $('#home-tab').css('border-top', '3px solid #00af85');
        $('#expired-tab').css('border-top', '0');
        $('div.expired-coupon-list').hide();
        $('div.coupon-list').show();
    })

    //---사용불가 탭 클릭시---
    $('#expired-tab').click(() => {
        //alert('사용불가버튼 클릭')
        $('#expired-tab').css('border-top', '3px solid #00af85');
        $('#home-tab').css('border-top', '0');
        $('div.expired-coupon-list').show();
        $('div.coupon-list').hide();
    })

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
})