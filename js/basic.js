$(()=>{
    let token = Cookies.get('token')
    let cookieUserName = Cookies.get('userName')
    let userName = decodeURI(cookieUserName)
    let userRole = Cookies.get('role')
    console.log(userName)
    if(token != null) {
        $('#userNameIs').css('display','')
        $('#userNameIs').html(userName)
        $('#logInUserName').css('display','')
        $('#logInUserName').html('님 환영합니다.')
        $('#signUpLi').css('display','none')
        $('#logInLi').css('display','none')
    } else {
        $('#logInUserName').css('display','none')
        $('#logoutLi').css('display','none')
        $('#userNameIs').css('display','none')
    }
    // -- 메뉴가 클릭되었을 대 일어날 일 START --
    $('section>nav>ul>li').click((e)=>{
    })
    // -- 메뉴가 클릭되었을 대 일어날 일 END --

    // -- 로고가 클릭되었을 때 할 일 START --
    $('div.logo-main').click(()=>{
        location.href=frontURL
    })
    // -- 로고가 클릭되었을 때 할 일 END --

    // ---- 스크롤 메뉴 보이기 ----
    $(document).ready(function(){
        var navHeight = $("header").height();
        //navHeight 의 높이를 구하기
        $(".scroll-right-menu").hide();
        //스크롤시 나타날 객체 미리 숨기기
        $(window).scroll(function(){  // 윈도우 스크롤 기능 작동
            var rollIt = $(this).scrollTop() >= navHeight;
            if(rollIt){
                //윈도우 스크롤 기능의 값이 navHeight 의 높이와 같거나 크면
                    $(".scroll-right-menu").show().css({"position":"fixed"});
                    // $("#allllll").show().css({"position":"fixed", "width":"100%", "top":"-60px"});
                }
                else{
                    $(".scroll-right-menu").hide();
                    // $("#allllll").show().css({"width":"100%"});
                }
            });
    });

    // ------ 메뉴 클릭시 상세 메뉴 보이기 START ------
    $(document).ready( function() {
        $('#menubarListMenu').hide();
        $('#gnbMenuBox').click(function() {
        $('#menubarListMenu').slideToggle();
        } );
    } );

    // 키워드 검색 돋보기 클릭!
    $('#prodKeywordSearch').click(() => {
        let keyword = $('#searchBox').val();
        //제가 따로 정리할 내용이라 잠깐 둘게요!
        // let originUri = encodeURI('../html/product/productsearch.html?keyword=' + keyword);
        // console.log(originUri);
        // let decode = decodeURI(originUri);
        // console.log(decode);
        location.href = '../../html/product/productsearch.html?keyword=' + keyword;
    })

    // 마이페이지 아이콘 클릭시 마이페이지 이동
    $('#goToMyPageBtn').click(() => {
        if(userRole == 0) {
            location.href = '../../html/mypage/mypage.html';
        } else if(userRole == 1) {
            location.href = '../../html/sellerpage/sellerproductlist.html'
        } else if(userRole == 2){
            location.href = '../../html/admin/sellerinfolist.html'
        } else {
            alert('로그인해주세요!')
        }
    })
})

function goToMypage() {
    let userRole = Cookies.get('role')
    if(userRole == 0) {
        location.href = '../../html/mypage/mypage.html';
    } else if(userRole == 1) {
        location.href = '../../html/sellerpage/sellerproductlist.html'
    } else if(userRole == 2){
        location.href = '../../html/admin/sellerinfolist.html'
    } else {
        alert('로그인해주세요!')
    }
}

function execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var roadAddr = data.roadAddress; // 도로명 주소 변수
            var extraRoadAddr = ''; // 참고 항목 변수
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
                extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraRoadAddr !== ''){
                extraRoadAddr = ' (' + extraRoadAddr + ')';
            }
            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('postcode').value = data.zonecode;
            document.getElementById("roadAddress").value = roadAddr;
            document.getElementById("jibunAddress").value = data.jibunAddress;
            // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
            if(roadAddr !== ''){
                document.getElementById("roadAddress").value += extraRoadAddr;
                // document.getElementById("extraAddress").value = extraRoadAddr;
            } else {
                document.getElementById("extraAddress").value = '';
            }
            var guideTextBox = document.getElementById("guide");
            // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
            if(data.autoRoadAddress) {
                var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
                guideTextBox.style.display = 'block';
            } else if(data.autoJibunAddress) {
                var expJibunAddr = data.autoJibunAddress;
                guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
                guideTextBox.style.display = 'none';
            } else {
                guideTextBox.innerHTML = '';
                guideTextBox.style.display = 'none';
            }
        }
    }).open();
}

function logout() {
    alert('로그아웃 되었습니다')
    Cookies.remove('token')
    Cookies.remove('userName')
    Cookies.remove('role')
    location.href=frontURL
}