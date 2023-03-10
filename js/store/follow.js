$(()=>{
    let token = Cookies.get('token')
    
    let data = location.search.substring(1)
    let regex = 'seller=';

    let sellerId = data.replace(regex,'');

    let $origin = $('.prod-sellerstore-cont .card');
    let $parent = $('div.productlist');

    let seller = data.replace(regex,'');
    $('.follow-btn').show();
    $('.unfollow-btn').hide();
    //--스토어 셀러 정보 START--
        $.ajax({
            url: backURL+'store/info/'+seller,
            method:'GET',
            success: function(jsonObj){
            console.log(jsonObj);
            $("div.store-name").html(jsonObj.companyName);
            $("div.follow-cnt").html(jsonObj.followCnt);
            },
            error: function(xhr){
                alert(xhr.status);
            }
        });

    //10초마다 실시간 상태확인 //협의 후 적용하거나, 삭제 예정!
    // timer = setInterval( function (){
    //     $.ajax({
    //         url: backURL+'store/info/'+seller,
    //         method:'GET',
    //         success: function(jsonObj){
    //         console.log(jsonObj);
    //         $("div.store-name").html(jsonObj.companyName);
    //         $("div.follow-cnt").html(jsonObj.followCnt);
    //         },
    //         error: function(xhr){
    //             alert(xhr.status);
    //         }
    //     });
    // },10000);
    //--스토어 셀러 정보 END--

    //--팔로잉 상태확인START--
    $(document).ready(function(){
        $.ajax({
            url:backURL+'store/follow/'+seller,
            method:'GET',
            beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        success:function(response){
            console.log(response);
            if(response == 0){
                $('.follow-btn').show();
                $('.unfollow-btn').hide();

            } else if(response == 1){
                $('.unfollow-btn').show();
                $('.follow-btn').hide();
            }
        },
        error: function(xhr){
            console.log(xhr);
        }
        });
    });
    //--팔로잉 상태확인END--

    //--팔로우 하기START--
    $(document).on('click', '.follow-btn', function (e) {
        console.log("click event");
        $.ajax({
          url:backURL+'store/follow/'+seller,
          method:'POST',
          beforeSend: function (xhr) {
          xhr.setRequestHeader('Content-type', 'application/json');
          xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        success:function(xhr){
           console.log("팔로우 성공");
           $('.unfollow-btn').show();
           $('.follow-btn').hide();
        },
        error: function(xhr){
            alert("로그인 후 이용이 가능합니다.");
        }
        });
      });
    //--팔로우 하기END--

    // --언팔로우 하기START--
    $(document).on('click','.unfollow-btn',function (e) {
        console.log("click event");
        $.ajax({
            url:backURL+'store/follow/'+seller,
            method:'DELETE',
            beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            success:function(){
                console.log("언팔로우 성공");
                $('.unfollow-btn').hide();
                $('.follow-btn').show();
            },
            error: function(xhr){
                alert("로그인 후 이용이 가능합니다.");
            }
        });
    });
    // --언팔로우 하기END--


    $.ajax({
        url: backURL + 'product/list/seller/' + sellerId,
        method: 'get',
        success: function(jsonObj){
            let list = jsonObj;
            // console.log(list);

            list.forEach(item => {
                console.log(item)
                let prodNum = item["prodNum"];
                let prodName = item["week"] + "주 " + item["name"];
                let originPrice = item["originPrice"];
                let percentage = item["percentage"];
                let prodPrice = originPrice - originPrice*(percentage/100);
                let roundPrice = Math.round(prodPrice)
                let image = item["productImgUrl"];
                let reviewCnt = item["reviewCnt"];
                let stars = item["stars"];

                let $copy = $origin.clone()
                $copy.show()
                $copy.find('div.card div.prodNum').html(prodNum)
                $copy.find('div.prodName').html(prodName)
                $copy.find('div.percentage').html(percentage + "%")
                $copy.find('div.prodPrice').html(roundPrice.toLocaleString() + '원')
                $copy.find('div.originPrice').html(originPrice.toLocaleString() + '원')
                $copy.find('#productMainImg').attr('src', image)

                if(reviewCnt == null) {
                    $copy.find('div.card-footer small.review-cnt').html(0)
                } else {
                    $copy.find('div.card-footer small.review-cnt').html(reviewCnt)
                }

                if(stars == null) {
                    $copy.find('div.card-footer small.prod-stars').html(0)

                }
                $copy.find('div.card-footer small.prod-stars').html(stars)

                $parent.append($copy);
            });
        },
        error: function(xhr){
            alert(xhr.status)
        }
    })
})