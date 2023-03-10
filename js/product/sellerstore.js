$(()=>{
    let data = location.search.substring(1)
    let regex = 'seller=';
    let sellerId = data.replace(regex,'');

    let $origin = $('#prodListChild');
    let $parent = $('#prodListParent');
    $parent.empty();
    $.ajax({
        url: backURL + 'product/list/seller/' + sellerId,
        method: 'get',
        success: function(jsonObj){
            let list = jsonObj;
            console.log(list);
            $('#sellerStoreName').html(list[0].storeName)
            list.forEach(item => {
                let roundPrice = Math.round(item.originPrice - item.originPrice*(item.percentage/100))
                let $copy = $origin.clone()
                $copy.show()
                $copy.find('#sellerStoreProdNum').html(item.prodNum)
                $copy.find('div.prodName').html(item["week"] + "주 " + item["name"])
                $copy.find('div.percentage').html(item.percentage + "%")
                $copy.find('div.prodPrice').html(roundPrice.toLocaleString() + '원')
                $copy.find('div.originPrice').html(item.originPrice.toLocaleString() + '원')
                $copy.find('#productMainImg').attr('src', item.productImgUrl)
                //리뷰수가 없으면 0으로 보여주기
                if(item["reviewCnt"] == null) {
                    $copy.find('div.card-footer small.review-cnt').html(0)
                } else {
                    $copy.find('div.card-footer small.review-cnt').html(item["reviewCnt"])
                }
                //별점이 없으면 0으로 보여주기
                if(item["stars"] == null) {
                    $copy.find('div.card-footer small.prod-stars').html(0)

                }
                $copy.find('div.card-footer small.prod-stars').html(item["stars"])

                $parent.append($copy);
            });
        },
        error: function(xhr){
            console.log(xhr.responseJSON)
            if(xhr.responseJSON.details == 'PRODUCT_NOT_FOUND') {
                alert('셀러가 등록한 상품이 없습니다.')
            }
        }
    })

    $('#prodListParent').on('click', 'div.card', (e)=>{
        let prodNum = $(e.target).parents('#prodListChild').find('#sellerStoreProdNum').html();
        location.href='../../html/product/productinfo.html?prodNum=' + prodNum
    })
})