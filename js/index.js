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
})