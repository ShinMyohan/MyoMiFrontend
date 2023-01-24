$(()=>{
    // alert('dd');
    // -- 상품 보여주기 START --
    let url = backURL + 'product/info'
    //console.log(url)
    let data = location.search.substring(1) //prodNum=1
    // console.log(data);
    $.ajax({
        url: url,
        method: 'get',
        data: data,
        success: function(jsonObj){
            let list = jsonObj;
            console.log(jsonObj[0])
            // $(list).each((p)=>{
            //     console.log(list[p]["COMPANY_NAME"])
            // })
            // $('div.img>img').attr('src', '../images/' + jsonObj.prodNo+'.jpeg')
            $('div.prodNum').html(jsonObj[0]["PRODNUM"]);
            $('div.prodName>h3').html(jsonObj[0]["NAME"])
            $('div.sellerName>h6').html(jsonObj[0]["COMPANY_NAME"])
            $('div.percentage b').html(jsonObj[0]["PERCENTAGE"]+"%")
            $('div.originPrice').html(jsonObj[0]["ORIGIN_PRICE"].toLocaleString()+"원")
            let percentage = jsonObj[0]["PERCENTAGE"]
            let originPrice = jsonObj[0]["ORIGIN_PRICE"]
            let prodPrice = originPrice - originPrice*(percentage/100);
            $('div.prodPrice').html(prodPrice.toLocaleString()+"원")
            let prodCnt = $('#result').html()
            let totalPrice = prodPrice*prodCnt //자동으로 안변함;;
            $('div.total-sum').html(totalPrice.toLocaleString()+"원")

            $('div.to-cart div.prodName h5').html(jsonObj[0]["NAME"])

            //실패
            // $('#result').on('keyup',function(){
            //     let cnt = $('#result').html()
            //     console.log(cnt)

            //     let total = prodPrice*cnt
            //     console.log(totlal)
            // })
        },
        error: function(xhr){
            alert(xhr.status)
        }
    })

    //실패 js
    // $(function(){
    //     $('#result').on('keyup',function(){
    //         let cnt = $('#result').html()
    //         console.log(cnt)

    //         $('div.prodPrice').html();
    //         let total = prodPrice*cnt
    //         console.log(totlal)
    //     })
    // })

    //--상품정보보여주기 END--
    $('header>nav>ul>li').click((e)=>{
        $('header>nav>ul>li').css('background-color', '#fff').css('color', '#000')

        $(e.target).css('background-color', '#2C2A29').css('color', '#fff')
        let menu = $(e.target).attr('class')
        switch(menu){
            case 'login':
                break;
            case 'signup':
                break;
            case 'logout':
                break;
            case 'productlist':
                //$.ajax
                //$('section').load('./productlist.html')
                location.href=frontURL+'?menu=productlist'
                break;
        }
    })
})
