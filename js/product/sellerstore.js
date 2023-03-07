$(()=>{
    let data = location.search.substring(1)
    let regex = 'seller=';

    let sellerId = data.replace(regex,'');

    let $origin = $('.prod-sellerstore-cont .card');
    let $parent = $('div.productlist');

    $.ajax({
        url: backURL + 'product/list/seller/' + sellerId,
        method: 'get',
        success: function(jsonObj){
            let list = jsonObj;
            // console.log(list);

            list.forEach(item => {
                // console.log(item)
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
                $copy.find('div.card div.prodNum').html(prodNum)
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
            });
        },
        error: function(xhr){
            alert(xhr.status)
        }
    })
})