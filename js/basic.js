let backURL = 'http://192.168.0.18:8088/MyoMiBackend/'
let frontURL = 'http://192.168.0.18:5500/html/'

$(()=>{
    // -- 메뉴가 클릭되었을 대 일어날 일 START --
    $('section>nav>ul>li').click((e)=>{
    })
    // -- 메뉴가 클릭되었을 대 일어날 일 END --

    // -- 로고가 클릭되었을 때 할 일 START --
    $('div.logo_main').click(()=>{
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
