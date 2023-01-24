let data = []; //이게 전체상품 리스트 다 들어오는 배열

$(()=>{
    $('section').load('../../html/product/productlist.html') //index.html의 section 태그에 product.list 포함
    function showList(url){
        let $origin = $('.menunav .card');

        $('div.product').not(':first-child').remove();
        $origin.show()
        $.ajax({
            url: url,
            method: 'get',
            success: function(jsonObj){
                let list = jsonObj;
                data = [...jsonObj]; //spread sheets , ...은 [] 벗겨줌
                dataList(list);
            },
            error: function(xhr){
                alert(xhr.status)
            }
        })
    }
    let url = backURL+'/product/list'

    //-- 상품목록 요청 start --
    //showList(1)을 하면 ..?
    showList(url)
    //-- 상품목록 요청 end --

    //-- 페이지번호가 클릭되었을 때 할 일 START --
    //스팬객체는 돔트리가 처음 만들었을때부터 만들어져있는 객체인가? NO! 최초에 돔트리에 존재하지 않으므로 click 함수 이벤트 처리 불가
    //따라서 최초의 돔트리가 생성되었을 때부터 존재하는 객체에만 함수이벤트 사용가능
    // $('div.pagegroup.span').click(()=>{
    //     alert('click!')
    // })

    // $('div.productlist').on('click', 'div.card', (e)=>{
    //     let prodNum = $(e.target).parents('.menunav .card').find('div.prodNum').html();
    //     console.log(prodNum);

    //     location.href='../../html/product/productinfo.html?prodNum' + prodNum
    // })
})

// $('div.productlist').click((e)=>{
//     alert("ddd");
// })

function listByCategory(event) {
    //console.log(event.target.value); //도시락, 샐러드, 밀키트
    let $origin = $('.menunav .card');
    let $parent = $('div.productlist');
    let cate = event.target.value;
    $parent.empty()
    switch(cate) {
        case '전체상품':
            dataList(data);
            break;
        case '도시락':
            let dosirak = data.filter(item=>item.CATEGORY === '도시락')
            // console.log(d); //앞에 ""+ 문자열주면 Object 로 타입이 바뀌어서 값 안찍힘 주의~
            dataList(dosirak);
            break;
        case '샐러드':
            let salad = data.filter(item=>item.CATEGORY === '샐러드')
            dataList(salad);
            break;
        case '밀키트':
            let mealkit = data.filter(item=>item.CATEGORY === '밀키트')
            dataList(mealkit);
            break;
    }
}

function dataList(list){
    console.log(list)
    let $origin = $('.menunav .card');
    let $parent = $('div.productlist');
    list.forEach(item=>{
        let prodNum = item["NUM"];
        let prodName = item["WEEK"] + "주 " + item["NAME"];
        let originPrice = item["ORIGIN_PRICE"];
        let percentage = item["PERCENTAGE"];
        let prodPrice = originPrice - originPrice*(percentage/100);

        let $copy = $origin.clone()
        $copy.show()
        $copy.find('div.prodNum').html(prodNum)
        $copy.find('div.prodName').html(prodName)
        $copy.find('div.percentage').html(percentage + "%")
        $copy.find('div.prodPrice').html(prodPrice.toLocaleString() + '원')
        $copy.find('div.originPrice').html(originPrice.toLocaleString() + '원')
        $parent.append($copy);
    })

    $('div.productlist').on('click', 'div.card', (e)=>{
        let prodNum = $(e.target).parents('.menunav .card').find('div.prodNum').html();
        console.log(prodNum);

        location.href='../../html/product/productinfo.html?prodNum=' + prodNum
    })
}
