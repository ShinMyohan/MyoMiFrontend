$(()=>{
    let de = decodeURI(location.search)
    let data = de.substring(1)
    let keyword = data.replace('keyword=','');
    console.log(keyword)

    let $origin = $('#prodListChild');
    let $parent = $('#prodListParent');
    $parent.empty();
    $.ajax({
        url: backURL + "product/list/" + keyword,
        method: 'GET',
        data: {keyword},
        success: function(jsonObj){
            // alert('dd')
            let list = jsonObj['body']
            $('#whatIsKeyword').html('"'+keyword+'"')
            $('#howMany').val('검색결과 '+ list.length+'개')
            console
            console.log(list)
            list.forEach(item => {
                let roundPrice = Math.round(item.originPrice - item.originPrice*(item.percentage/100))

                let $copy = $origin.clone()
                $copy.show()
                $copy.find('#searchProdNum').html(item.prodNum)
                $copy.find('div.prodName').html(item.week + "주 " + item.name)
                $copy.find('div.percentage').html(item.percentage + "%")
                $copy.find('div.prodPrice').html(roundPrice.toLocaleString() + '원')
                $copy.find('div.originPrice').html(item.originPrice.toLocaleString() + '원')
                $copy.find('#productMainImg').attr('src', item.productImgUrl)

                if(item.reviewCnt == null) {
                    $copy.find('div.card-footer small.review-cnt').html(0)
                } else {
                    $copy.find('div.card-footer small.review-cnt').html(item.reviewCnt)
                }

                if(item.stars == null) {
                    $copy.find('div.card-footer small.prod-stars').html(0)

                }
                $copy.find('div.card-footer small.prod-stars').html(item.stars)

                $parent.append($copy);
            });
        },
        error: function(xhr){
            alert(xhr.status)
        }
    })
    $('#prodListParent').on('click', 'div.card', (e)=>{
        let prodNum = $(e.target).parents('#prodListChild').find('#searchProdNum').html();
        location.href='../../html/product/productinfo.html?prodNum=' + prodNum
    })
})