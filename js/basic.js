let backURL = 'http://192.168.0.11:8088/MyoMiBackend/'
let frontURL = 'http://192.168.0.11:5500/html/'

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
})
