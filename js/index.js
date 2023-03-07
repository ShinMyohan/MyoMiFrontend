$(()=>{
    let queryStr = location.search.substring(1)
    console.log(queryStr);
    let arr = queryStr.split('=')
    // console.log(arr)
    if(arr[0] == 'menu'){
        switch(arr[1]) {
        case 'productlist':
            $('section>div.menunav>nav>div.nav>li.productlist').click()
            break;
        }
    }

    // $.ajax({
    //     url: url,
    //     method: 'get',
    //     contentType: 'application/json; charset=utf-8',
    //     xhrFields: {
    //         withCredentials: true
    //     },
    //     success: function(jsonObj){
    //         let list = jsonObj['body'];
    //         // console.log(jsonObj['body']);
    //         data = [...jsonObj['body']]; //spread sheets , ...은 [] 벗겨줌
    //         dataList(list);
    //     },
    //     error: function(xhr){
    //         alert(xhr.status)
    //     }
    // })
})
