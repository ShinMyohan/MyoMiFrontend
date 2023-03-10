let token = Cookies.get('token')
$(() => {
  $("input[name=sign-out-date]").css('display', 'none');
  $('#sign-out-date').hide();
  function viewSeller() {
    // ------글 상세내용 START------
    let data = location.search.substring(1);
    console.log(data)
    let seller = data.replace("sellerid=", "");
    //console.log(sellerId);
    $.ajax({
      method: "get",
      url: backURL + "admin/seller/detail/" + seller,
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      data: data,

      success: function (jsonObj) {
        let seller = jsonObj;
        //console.log(seller);
        //console.log("viewSeller() 불려와짐");
        let sellerId = seller['sellerId'];
        let companyName = seller['companyName'];
        let companyNum = seller["companyNum"];
        let internetNum = seller["internetNum"];
        let addr = seller["addr"];
        let manager = seller["manager"];
        let bankAccount = seller["bankAccount"];
        let status = seller["status"];
        let signoutDate = seller["signoutDate"];
        let createdDate = seller["createdDate"];
        let sellerName = seller["sellerName"];
        let email = seller["email"]
        let companyImgUrl = seller["companyImgUrl"]
        let internetImgUrl = seller["internetImgUrl"]
        if (status == 0) {
          status = "승인대기";
        }
        else if (status == 1) {
          
          $('div.seller-approve').hide();
          status = "승인완료";
          
          
        } else if (status == 2) {
          status = "승인거절";
        } else {
          $('div.seller-approve').hide();
          $('#sign-out-date').show();
          $("input[name=sign-out-date]").css('display', '');
          status = "탈퇴";
        }
        if (signoutDate == null) {
          signoutDate = "없음";
        } else {
          signoutDate = seller["signoutDate"];
        }
        $("input[name=seller-name]").val(sellerName);
        $("input[name=company-num]").val(companyNum);
        $("input[name=companyName]").val(companyName);
        $("input[name=seller-addr]").val(addr);
        $("input[name=internet-num]").val(internetNum);
        $("input[name=seller-email]").val(email);
        $("input[name=manager]").val(manager);
        $("input[name=created-date]").val(createdDate);
        $("input[name=approve-status]").val(status);
        $("input[name=bank-account]").val(bankAccount);
        $("input[name=seller-id]").val(sellerId);
        $("input[name=sign-out-date]").val(signoutDate);
        $('#seller-companyimg').attr('src', companyImgUrl);
        $('#seller-internetimg').attr('src', internetImgUrl);
      }, 
      error: function (xhr) {
        alert(xhr.status);
      },
    });
    //-------글 상세 END------
  }

  viewSeller()

  //---------판매자 승인 혹은 거절 START ----------------------------
  
  $('#submit').click(function () {
    let status = $('#approve-category').val();
    console.log(status);
    let seller = location.search.substring(1);
    let sellerId = seller.replace("sellerid=", "");
    
    let data = {
      "sellerId":sellerId,
      "status": status
    }
    $.ajax({
      method: "PUT",
      url: backURL +"admin/seller/"+sellerId+"/"+status,
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      data: JSON.stringify(data),

      success: function () {
        
        alert("판매자 상태 변경이 완료되었습니다!");
        window.location.href = "./sellerinfolist.html"
      },
      error: function (xhr) {
        alert(xhr.status);
      },

    })
  });
  //--------판매자 승인혹은 거절 END---------------------------


});
