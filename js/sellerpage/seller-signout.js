$(()=>{
    let token = Cookies.get('token')

    //--탈퇴신청 버튼 클릭시 할일 START--
    $('div.signout-button').click(function(){
        if (window.confirm("탈퇴신청은 취소가 불가능합니다. 탈퇴신청 하시겠습니까?")) {
            $.ajax({
                method: "PUT",
                url: backURL + 'sellerpage/withdraw',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                },
                success: function (response) {
                    alert("탈퇴신청이 완료되었습니다.");
                },
                error: function (xhr) {
                    console.log(xhr.status);
                    alert("판매중인 상품이 있어 탈퇴신청이 불가능합니다.")
                }
            })
        } else {
            console.log("탈퇴신청을 취소하였습니다.");
        }
    })
    //--탈퇴신청 버튼 클릭시 할일 END--
})