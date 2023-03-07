$(()=>{
    //--주문상세보기 START--
    function showList(){
        let $origin = $("div.order-list-row").first();
        $("div.order-list-row").not(":first-child").remove();
        $origin.show();
        $.ajax({
            url: backURL + 'sellerpage/orderlist',
            methoe:"get",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            success: function(jsonObj){
                let list = jsonObj;
                // console.log(list)
                let $origin = $("div.order-list-row").first();
                let $parent = $("div.order-list-body");
                $(list).each(p=>{
                    let orderNum = list[p]["orderNum"];
                    let orderDate = list[p]["createdDate"];
                    let prodNum = list[p]["prodNum"];
                    let prodName = list[p]["name"];
                    let prodCnt = list[p]["prodCnt"];
                    let userId = list[p]["user"];
                    let $copy = $origin.clone();

                    $copy.find("div.order-num").html(orderNum);
                    $copy.find("div.order-date").html(orderDate);
                    $copy.find("div.order-prodNum").html(prodNum);
                    $copy.find("div.order-prodname").html(prodName);
                    $copy.find("div.order-prodcnt").html(prodCnt);
                    $copy.find("div.order-user").html(userId);
                    $parent.append($copy);
                });
                $origin.hide();
            },
            error: function(xhr){
                alert(xhr.status);
            },

        });
    } showList()
    //--주문상세보기 END--

    // 상세모달창 열기
    $('div.order-list-body').on('click', '.order-prodname', function (e) {
        $('.sl-order-modal').addClass('show');
        let odNum = $(e.target).parent("#seller-order").find("div.order-num").html();
        let pdNum = $(e.target).parent("#seller-order").find("div.order-prodNum").html();

        let url = backURL + "sellerpage/order/detail/"
        $.ajax({
          url : url+odNum+"/"+pdNum,
          method:"GET",
          beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
          },
          success: function(jsonObj){
            // console.log(jsonObj);
            $("#prod-name").html(jsonObj.name);
            $("#modal-user-name").html(jsonObj.user);
            $("#modal-prod-num").html(jsonObj.orderNum);
            $("#modal-prod-cnt").html(jsonObj.prodCnt);
            $("#modal-created-date").html(jsonObj.createdDate);
            $("#modal-total-price").html(jsonObj.totalPrice);
            $("#modal-msg").html(jsonObj.msg);
            $("#modal-week").html(jsonObj.week);
            $("#modal-d-date").html(jsonObj.receiveDate);
            $("#modal-d-msg").html(jsonObj.deliveryMsg);
            $("#modal-d-name").html(jsonObj.deliveryName);
            $("#modal-d-tel").html(jsonObj.deliveryTel);
            $("#modal-d-addr").html(jsonObj.deliveryAddr);
          },
          error: function(xhr){
            alert(xhr.status);
          }
        });
      
      });
    
    // 상세모달창 닫기
      $(document).on('click', '.modal-submit', function (e) {
        $('.sl-order-modal').removeClass('show');
      
      });
    
    })