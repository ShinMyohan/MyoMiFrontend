$(()=>{
    // alert('도시락');
    // -- 상품 보여주기 START --
    function dosiraklist(){
        let url = backURL + '/product/listbycategory'
        // let data = location.search.substring(1)
        // console.log(data);
        $.ajax({
            url: url+"?category=도시락",
            method: 'get',
            //data: data, //여기에 category = '도시락' 이렇게 들어감
            success: function(jsonObj){
                //---- 선생님 코드 START ---
                let list = jsonObj;
                console.log(jsonObj);

                let $origin = $('div.dosirak').first();
                let $parent = $('div.dosiraklist');
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
                $origin.hide();
            },
            error: function(xhr){
                alert(xhr.status)
            }
        })
    }

    let url = backURL+'product/listbycategory'
    dosiraklist();

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