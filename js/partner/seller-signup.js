$(()=>{
  let token = Cookies.get('token')
  
  $("div.signup-empty").show();
  $("div.signup-list-row").hide();
  $('.sl-signup-btn').show();
  $('.sl-store-btn').hide();

  //--판매자신청 내역 보여주기 START--
  function showList(){
    let url = backURL+'mypage/partner'
    $.ajax({
      url:url,
      method:"GET",
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      success: function(jsonObj){
        let list = jsonObj;
        // console.log(list)
        let manager = list["manager"];
        let storeNum = list["companyNum"];
        let companyName = list["companyName"];
        let status = list["status"];
        let mCompanyName = list["companyName"];
        let mCompanyNum = list["companyNum"];
        let mbank = list["bankAccount"];
        let mManager = list["manager"];
        let mInternet = list["internetNum"];
        let mAddr = list["addr"];
        let mStatus = list["status"];
        $("#signup-manager").html(manager);
        $("#signup-store-num").html(storeNum);
        $("#signup-store-name2").html(companyName);
        $("#signup-status").html(status);
        if(status == 0){
          $("#signup-status").html("심사대기");
          $('.sl-signup-btn').hide();
        }else if(status == 1){
          $("#signup-status").html("승인완료");
          $('.sl-store-btn').show();
          $('.sl-signup-btn').hide();
        }else if(status == 2){
          $("#signup-status").html("승인반려");
          $('.sl-signup-btn').hide();
        }else if(status == 3){
          $("#signup-status").html("탈퇴신청");
          $('.sl-store-btn').show();
        }
        $("#modal-company-name").html(mCompanyName);
        $("#modal-company-num").html(mCompanyNum);
        $("#modal-company-account").html(mbank);
        $("#modal-company-manager").html(mManager);
        $("#modal-company-inum").html(mInternet);
        $("#modal-company-addr").html(mAddr);
        $("#modal-company-status").html(mStatus);
        if(mStatus == 0){
          $("#modal-company-status").html("심사대기");
        }else if(mStatus == 1){
          $("#modal-company-status").html("승인완료");
        }else if(mStatus == 2){
          $("#modal-company-status").html("승인반려");
        }else if(mStatus == 3){
          $("#modal-company-status").html("탈퇴신청");
        }
        if(list != ''){
          $("div.signup-empty").hide();
          $("div.signup-list-row").show();
      }
      },
      error: function(xhr){
        console.log(xhr)
       },
    });

  }showList()
  //--판매자신청 내역 보여주기 END--

  //--내스토어 방문하기 클릭시 할 일 START--
  $(".mp-sl-headbox").on("click",".sl-store-btn",(e)=>{
    location.href="../sellerpage/sellerproductlist.html"
})
  //--내스토어 방문하기 클릭시 할 일 END--

  //--판매자 신청하기 클릭시 할 일 START--
  $(".mp-sl-headbox").on("click",".sl-signup-btn",(e)=>{
    location.href="./seller-addform.html"
  })
  //--판매자 신청하기 클릭시 할 일 END--

  //--판매자신청 상세 열기
  $(document).on('click', '.signup-store-name2', function (e) {
    $('.modal-seller-info').addClass('show');
      });
      
  //--판매자신청 상세 닫기
    $(document).on('click', '#close-btn', function (e) {
    $('.modal-seller-info').removeClass('show'); 
      });
    })