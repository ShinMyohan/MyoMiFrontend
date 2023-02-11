$(()=>{
    let queryStr = location.search.substring(1)
    // console.log(queryStr);
    let arr = queryStr.split('=')
    // console.log(arr)
    if(arr[0] == 'menu'){
        switch(arr[1]) {
        case 'productlist':
            $('section>div.menunav>nav>div.nav>li.productlist').click()
            break;
        }
    }


    // ------ 메뉴 클릭시 상세 메뉴 보이기 START ------
    // $('div.gnb>div.gnb-in>div.gnb-menu-box').click(function() {
    //     let menubar = document.getElementById("menubar");
    //     if($('#menubar').css("display")=="none"){
    //         $('#menubar').show();
    //     }else {
    //         $('#menubar').hide();
    //     }
    // });

    $(document).ready(function() {
        $('#menubar').hide();
        $('div.gnb>div.gnb-in>div.gnb-menu-box').click(function() {
            $('#menubar').slideToggle(500)
        });
    });
    // ------ 메뉴 클릭시 상세 메뉴 보이기 END ------
})
