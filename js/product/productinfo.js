$(()=>{
    // -- 상품 보여주기 START --
    let url = backURL + 'product/'
    let data = location.search.substring(1) //prodNum=1

    let regex = /[^0-9]/g;
    let prodNum = data.replace(regex,"");
    $.ajax({
        url: url + prodNum,
        method: 'get',
        data: data,
        success: function(jsonObj){
            let list = jsonObj['body'];
            // $('div.img>img').attr('src', '../images/' + jsonObj.prodNo+'.jpeg')
            $('div.prodNum').html(list['prodNum']);
            $('div.prodName>h3').html(list['name'])
            $('div.sellerName>h6').html(list['seller'])
            $('div.percentage b').html(list['percentage']+"%")
            $('div.originPrice').html(list['originPrice'].toLocaleString()+"원")
            let percentage = list['percentage']
            let originPrice = list['originPrice']
            let prodPrice = originPrice - originPrice*(percentage/100);
            $('div.prodPrice').html(prodPrice.toLocaleString()+"원")
            // 처음 뿌려줄 땐 1개 수량 그대로.
            $('div.total-sum').html(prodPrice.toLocaleString()+"원")

            $('div.to-cart div.prodName h5').html(list['name'])
        },
        error: function(xhr){
            alert(xhr.status)
        }
    })

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

    // 수량 조절 버튼 누를 때 총 합계 변화
    $("#quantityMin").click(function(){
        let prodPrice = $('#prodPrice').html()
        let price = prodPrice.replace(regex,"")
        let qtt = $('#result').html()
        let totalPrice = price*qtt;
        $('#tt-price').html(totalPrice.toLocaleString()+"원")
    })

    $("#quantityPl").click(function(){
        let prodPrice = $('#prodPrice').html()
        let price = prodPrice.replace(regex,"")
        let qtt = $('#result').html()
        let totalPrice = price*qtt;
        $('#tt-price').html(totalPrice.toLocaleString()+"원")
    })
})

// 수량 조절 + , - 버튼
function count(type)  {
    // 결과를 표시할 element
    const resultElement = document.getElementById('result');
    // 현재 화면에 표시된 값
    let number = resultElement.innerText;

    // 더하기/빼기
    if(type === 'plus') {
        number = parseInt(number) + 1;
    }else if(type === 'minus')  {
        number = parseInt(number) - 1;
    }

    if(number < 1) {
        alert('수량은 1개 이상 선택 가능합니다.')
        number=1
    }
    // 결과 출력
    resultElement.innerText = number;
}
