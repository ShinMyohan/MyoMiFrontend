// 즉, html 문서가 parsing 되고 돔 트리가 완성된 다음 함수 실행됨
// 화면에 렌더링 되기 바로 직전에 jquery 내용이 실행된다.
$(()=>{
    // alert('js first');

    function showList(url){
        let $origin = $('div.product').first()
        // let $parent = $('div.productlist')
        // $parent.find('div.product').not($origin).remove()

        //부모 기준에서는 empty()를 쓸 수 있지만 자식에서는 .remove()를 써야한다.
        $('div.product').not(':first-child').remove();
        $origin.show()
        $.ajax({
            url: url,
            method: 'get',
            // 응답이 성공했을 때의 콜백함수
            success: function(jsonObj){
                // jsonObj 는 자바 객체
                let list = jsonObj;
                // console.log(jsonObj);

                let $origin = $('div.product').first();
                let $parent = $('div.productlist');
                $(list).each((p)=>{ //list를 하나씩 조회하는 반복문!
                    // console.log(p);
                    // console.log(list[p]["NAME"]);
                    let prodNum = list[p]["NUM"];
                    let prodName = list[p]["WEEK"] + "주 " + list[p]["NAME"];
                    let originPrice = list[p]["ORIGIN_PRICE"];
                    let percentage = list[p]["PERCENTAGE"];
                    let prodPrice = originPrice - originPrice*(percentage/100);

                    let $copy = $origin.clone()
                    // 상품 번호로 이미지 가져올거임
                    // let imgStr = '<img src="../images/' + prodNo + '.jpeg">'
                    // $copy.find('div.img').html(imgStr);

                    // 태그용 JQuery 객체 만든것
                    // let $imgObj = $('<img>')
                    //속성 추가
                    //$imgObj.attr('src','../images/' + prodNum + '.jpeg')
                    //.empty()를 쓴 이유는 태그에 '이미지'라는 글자를 비우고 이미지 객체를 appned 하기 위해서
                    //$copy.find('div.img').empty().append($imgObj)

                    $copy.find('div.prodNum').html(prodNum)
                    $copy.find('div.prodName').html(prodName)
                    $copy.find('div.percentage').html(percentage + "%")
                    $copy.find('div.prodPrice').html(prodPrice.toLocaleString() + '원')
                    $copy.find('div.originPrice').html(originPrice.toLocaleString() + '원')
                    $parent.append($copy);
                })
                $origin.hide(); //원래 기본형 지우기~
            },
            // 응답이 실패했을 때의 콜백함수
            // 응답코드가 200번이 아니면 즉 에러 404, 500, CORS 에러 등을 마주하면 여기로 빠진다.
            error: function(xhr){
                alert(xhr.status)
            }
        })
    }
    //let url = 'http://localhost:8088/myback/product/list' //백엔드랑 맞춰줘야함~ list인지 info인지~
    // let url = 'http://내ip 주소 넣어도됨:8088/myback/productlist'
    // let url = 'http://192.168.0.17:8088/myback/product/list'
    let url = backURL+'/product/list'

    //-- 상품목록 요청 start --
    //showList(1)을 하면 ..?
    showList(url, 1)
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