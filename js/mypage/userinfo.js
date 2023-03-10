$(()=>{
  let token = Cookies.get('token')
  
    //유저 적립금, 쿠폰, 팔로우 정보  
    function  myPageHeaderInfo() {
       $.ajax({
        method : "GET",
        url : backURL + "headerinfo",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
          },

          success : function(data){
           //console.log(data)
            let totalPoint = data["totalPoint"];
            let coupon = data["couponCount"]
            let follow = data["followCount"]
            let userName = data["userName"]
            let membership = data["membership"]
            switch (membership){
              case 0:
                membership = "일반"
                break;
              case 1:
                membership = "골드"
                break;
              case 2: 
                membership = "플래티넘"
                break;
              case 3: 
                membership = "다이아몬드"
                break;
            }
        
            $("span.mp-user-point").html(totalPoint.toLocaleString()+" 원");
            $("span.mp-user-coupon").html(coupon+" 장");
            $("span.mp-user-follow").html(follow+" 명");
            $("span.mp-user-name").html(userName+" 님");
            $("span.mp-user-level").html("회원등급은 "+membership+" 입니다");
          },
          error:function(xhr){
            alert(xhr.status);
          }
       })
    }
    myPageHeaderInfo()
    
  })




