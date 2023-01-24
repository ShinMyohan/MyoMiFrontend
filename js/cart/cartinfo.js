$(()=>{
    function infoCart() {
        let url = backURL + 'cart/list?userId=user2'
        let $origin = $('div.cart-box-detail').first()

        $('div.cart-box-detail').not(':first-child').remove();
        $origin.show()
        $.ajax({
            url:url,
            method:'get',
            success: function (jsonObj) {
                let list = jsonObj;
                // console.log(list.length)
                console.log(list)

                let $origin = $('div.cart-box-detail').first()
                let $parent = $('div.cart-box');
                list.forEach(item=>{
                    let cartNum = item["NUM"];
                    let prodName = item["NAME"];
                    let prodCnt = item["PROD_CNT"];
                    let originPrice = item["ORIGIN_PRICE"];
                    let percentage = item["PERCENTAGE"];
                    let totalPriceByOne = originPrice - originPrice*(percentage/100);
                    let totalPrice = totalPriceByOne*prodCnt;

                    

                    let $copy = $origin.clone()
                    $copy.show()
                    $copy.find('div.checkbox input').val(cartNum)
                    $copy.find('div#options h5').html(prodCnt)
                    $copy.find('div#productDetail h5').html(prodName)
                    $copy.find('div#cart-price h5').html(totalPrice.toLocaleString() + '원')
                    $parent.append($copy);


                    // let
                    // $('button#all-prod-price').html()
                    // $('button#all-dc-price').html()
                    // $('button#total-prod-price').html()
                })
                $origin.hide();
            },
            error: function(xhr){
                alert(xhr.status)
            }
        })
    }

    infoCart()
})

