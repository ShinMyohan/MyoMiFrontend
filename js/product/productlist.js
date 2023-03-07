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
            contentType: 'application/json; charset=utf-8',
            xhrFields: {
                withCredentials: true
            },
            success: function(jsonObj){
                let list = jsonObj['body'];
                // console.log(jsonObj['body']);
                data = [...jsonObj['body']]; //spread sheets , ...은 [] 벗겨줌
                dataList(list);
            },
            error: function(xhr){
                alert(xhr.status)
            }
        })
    }
    let url = backURL+'product/list'

    //-- 상품목록 요청 start --
    //showList(1)을 하면 ..?
    showList(url)
    //-- 상품목록 요청 end --

})

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
            let dosirak = data.filter(item=>item.category === '도시락')
            // console.log(d); //앞에 ""+ 문자열주면 Object 로 타입이 바뀌어서 값 안찍힘 주의~
            dataList(dosirak);
            break;
        case '샐러드':
            let salad = data.filter(item=>item.category === '샐러드')
            dataList(salad);
            break;
        case '밀키트':
            let mealkit = data.filter(item=>item.category === '밀키트')
            dataList(mealkit);
            break;
    }
}

function dataList(list){
    let $origin = $('.menunav .card');
    let $parent = $('div.productlist');
    list.forEach(item=>{
        // console.log(item);
        let prodNum = item["prodNum"];
        let prodName = item["week"] + "주 " + item["name"];
        let originPrice = item["originPrice"];
        let percentage = item["percentage"];
        let prodPrice = originPrice - originPrice*(percentage/100);
        let roundPrice = Math.round(prodPrice)
        let image = item["productImgUrl"];
        let reviewCnt = item["reviewCnt"];
        let stars = item["stars"];
        let $copy = $origin.clone()
        $copy.show()
        $copy.find('div.prodNum').html(prodNum)
        $copy.find('div.prodName').html(prodName)
        $copy.find('div.percentage').html(percentage + "%")
        $copy.find('div.prodPrice').html(roundPrice.toLocaleString() + '원')
        $copy.find('div.originPrice').html(originPrice.toLocaleString() + '원')
        $copy.find('#productMainImg').attr('src', image)
        if(reviewCnt == null) {
            $copy.find('div.card-footer small.review-cnt').html(0)
        } else {
            $copy.find('div.card-footer small.review-cnt').html(reviewCnt)
        }

        if(stars == null) {
            $copy.find('div.card-footer small.prod-stars').html(0)

        }
        $copy.find('div.card-footer small.prod-stars').html(stars)

        $parent.append($copy);
    })

    $('div.productlist').on('click', 'div.card', (e)=>{
        let prodNum = $(e.target).parents('.menunav .card').find('div.prodNum').html();

        location.href='../../html/product/productinfo.html?prodNum=' + prodNum
    })
}
