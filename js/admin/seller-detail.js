$(() => {

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
        let followCnt = seller["followCnt"];
        let signoutDate = seller["signoutDate"];
        let createdDate = seller["createdDate"];
        let sellerName = seller["sellerName"];
        let email = seller["email"]
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
          status = "탈퇴";
        }
        if (signoutDate == null) {
          signoutDate = "없음";
        } else {
          signoutDate = seller["signoutDate"];
        }
        $("td#seller-name").html(sellerName);
        $("td#seller-company-num").html(companyNum);
        $("td#store-name").html(companyName);
        $("td#seller-addr").html(addr);
        $("td#internet-num").html(internetNum);
        $("td#seller-email").html(email);
        $("td#store-manager").html(manager);
        $("td#created-date").html(createdDate);
        $("td#approve-status").html(status);
        $("td#follow-cnt").html(followCnt);
        $("td#sign-out-date").html(signoutDate);
        $("td#bank-account").html(bankAccount);
        $("td#seller-id").html(sellerId);
        $("h3#seller-id-title").html("판매자" + sellerId);
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
    //-------글 상세 END------
  }

  viewSeller()

  //---------------글 목록으로 돌아가기 START ----------------
  $('div.review-list').click(() => {
    location.href = "./reviewmypage.html"
  })

  //-------------글 목록으로 돌아가기 END ----------------------

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

  //-------판매자목록으로 이동 START--------
  $("button.sellerlist-btn").click((e) => {
    location.href = "./sellerinfolist.html";
  });

  //-------수정폼으로 이동 END--------

});
