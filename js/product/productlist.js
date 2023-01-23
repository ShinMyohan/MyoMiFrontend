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
                // let $origin = $('div.product').first();
                // let $parent = $('div.productlist');
                // $(list).each((p)=>{
                //     let prodNum = list[p]["NUM"];
                //     let prodName = list[p]["WEEK"] + "주 " + list[p]["NAME"];
                //     let originPrice = list[p]["ORIGIN_PRICE"];
                //     let percentage = list[p]["PERCENTAGE"];
                //     let prodPrice = originPrice - originPrice*(percentage/100);

                //     let $copy = $origin.clone()
                    // 상품 번호로 이미지 가져올거임
                    // let imgStr = '<img src="../images/' + prodNo + '.jpeg">'
                    // $copy.find('div.img').html(imgStr);

                    // 태그용 JQuery 객체 만든것
                    // let $imgObj = $('<img>')
                    //속성 추가
                    //$imgObj.attr('src','../images/' + prodNum + '.jpeg')
                    //.empty()를 쓴 이유는 태그에 '이미지'라는 글자를 비우고 이미지 객체를 appned 하기 위해서
                    //$copy.find('div.img').empty().append($imgObj)

                //     $copy.find('div.prodNum').html(prodNum)
                //     $copy.find('div.prodName').html(prodName)
                //     $copy.find('div.percentage').html(percentage + "%")
                //     $copy.find('div.prodPrice').html(prodPrice.toLocaleString() + '원')
                //     $copy.find('div.originPrice').html(originPrice.toLocaleString() + '원')
                //     $parent.append($copy);
                // })
                // $origin.hide(); //원래 기본형 지우기~
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

    //원래 span만 있었는데 span:not(.current)을 하므로써 현재 페이지는 클릭 불가능하게 만듦.
    $('div.pagegroup').on('click', 'span:not(.current)', (e)=>{
        let page = $(e.target).attr('class') //class 속성값 찾기
        // $.ajax({
            //에이잭스 남용 줄이기 위해 위에만들었던 ajax 함수로 만들어버림 ! function showList(url, page){ 이렇게.
        // })
        showList(url)
    })
    // -- 페이지 번호가 클릭되었을 때 할 일 END --

    // -- 상품이 클릭되었을 때 할 일 START --
    // 최초 돔트리에는 origin인 최초 정보밖에 없음.
    $('div.productlist').on('click', 'div.product', (e)=>{
        // .parents(어느 정도의 상위 객체까지 찾을건지): 현재객체의 입장에서 상위(부모나 조상)객체를 찾는 메서드
        // .parent: 바로 위 객체를 찾는 메서드
        let prodNo = $(e.target).parents('div.product').find('div.prodNo').html();

        // 클릭시 url을 이동시킬거면,
        location.href='./productinfo.html?prodNo=' + prodNo //프론트웹가서 클릭해보기!
    })
    // -- 상품이 클릭되었을 때 할 일 END --
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
}