let backURL = 'http://192.168.0.18:8888/myomi/'
let frontURL = 'http://192.168.0.18:5500/html/'

$(()=>{
    // -- 메뉴가 클릭되었을 대 일어날 일 START --
    $('section>nav>ul>li').click((e)=>{
    })
    // -- 메뉴가 클릭되었을 대 일어날 일 END --

    // -- 로고가 클릭되었을 때 할 일 START --
    $('div.logo-main').click(()=>{
        location.href=frontURL
        //5500/html/이지만 알아서 웰컴페이지를 찾아가는데 웰컴페이지 인식을 알아서 index.html을 불러온다
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
})

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
                document.getElementById("extraAddress").value = extraRoadAddr;
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
                guideTextBox.style.display = 'block';
            } else {
                guideTextBox.innerHTML = '';
                guideTextBox.style.display = 'none';
            }
        }
    }).open();
}