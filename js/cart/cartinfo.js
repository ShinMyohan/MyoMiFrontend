let token = Cookies.get('token')

window.removeCart = () => {
    removeCartList()
}

window.updateMinusProdCnt = (value) => {
    modifyMinusProdCnt(value)
}

window.updatePlusProdCnt = (value) => {
    modifyPlusProdCnt(value)
}

// 전체 선택
window.allCheckCart = () => {
    $("input:checkbox[name=cart-check]").each(function() {
        $("input:checkbox[name=cart-check]").prop('checked', true)
    })
}

$(()=>{
    function infoCart() {
        let $origin = $('div.cart-box-detail').first()

        $('div.cart-box-detail').not(':first-child').remove();
        $origin.show()
        $.ajax({
            url:backURL + 'cart/list',
            method:'GET',
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            success: function (jsonObj) {
                let list = jsonObj.data;
                if(list.length == 0) {
                    let emptyHTML = `<div class="emptyCart">
                                        <h3>장바구니가 비었습니다.</h3>
                                    </div><hr>`;
                    $('div.cart-box-detail').first().hide();
                    $('div.cart-box').append(emptyHTML);
                }

                localStorage.setItem('cartList', JSON.stringify(list));
                // console.log(list.length)
                // 총 금액들 선언
                let allProdPrice = 0;
                let allDcPrice = 0;
                let allTotalProdPrice = 0;


                let $origin = $('div.cart-box-detail').first()
                let $parent = $('div.cart-box');
                list.forEach(item => {
                    let prodNum = item["prodNum"];
                    let prodName = item["name"];
                    let prodImg = item["productImgUrl"]
                    let prodCnt = item["prodCnt"];
                    let originPrice = item["originPrice"];
                    let percentage = item["percentage"];
                    let status = item["status"]
                    let totalPriceByOne = originPrice - originPrice*(percentage/100);
                    let totalPrice = totalPriceByOne * prodCnt;
                    allProdPrice += originPrice * prodCnt;
                    allDcPrice += originPrice * (percentage/100) * prodCnt;
                    allTotalProdPrice += totalPrice;

                    let $copy = $origin.clone()
                    $copy.show()
                    $copy.find('input[name=cart-check]').val(prodNum)
                    $copy.find('button#updateProdCnt').val(prodNum)
                    $copy.find('#img').attr('src', prodImg)
                    $copy.find('input[id=cartProdCnt]').val(prodCnt)
                    $copy.find('div#productDetail h5').html(prodName)
                    $copy.find('div#percentage h5').html(percentage + '%')
                    $copy.find('div#cart-price h5').html(totalPrice.toLocaleString().split(".")[0] + '원')

                    let prodHref = "../../html/product/productinfo.html?prodNum=" + prodNum
                    $copy.find('#productDetail a').attr('href', prodHref)

                    $parent.append($copy);
                }
                )
                $origin.hide();

                $('button#all-prod-price').html(allProdPrice.toLocaleString().split(".")[0] + '원')
                $('button#all-dc-price').html(allDcPrice.toLocaleString().split(".")[0] + '원')
                $('button#total-prod-price').html(allTotalProdPrice.toLocaleString().split(".")[0] + '원')
            },
            error: function(xhr){
                let emptyHTML = `<div class="emptyCart">
                                        <h3>로그인이 필요한 서비스입니다.</h3>
                                    </div><hr>`;
                    $('div.cart-box-detail').first().hide();
                    $('div.cart-box').append(emptyHTML);
            }
        })
    }
    infoCart()
})


// 장바구니 상품 수량 수정 (빼기)
function modifyMinusProdCnt(prodNum) {
    $.ajax({
        type:'PUT',
        url: backURL + 'cart',
        xhrFields: {
            withCredentials: true
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        data: JSON.stringify({'prodNum': prodNum, 'prodCnt': '-1'}),
        success: function (jsonObj) {
            // console.log(prodNum + '번 상품 수량 1개 감소 완료')
            window.location.reload()
        }, error : function (xhr) {
            console.log(xhr)
            if(xhr.responseJSON.status == 500) {
                alert(xhr.responseJSON.details)
            }
        }
    })
}



// 장바구니 상품 수량 수정 (더하기)
function modifyPlusProdCnt(prodNum) {
    $.ajax({
        type:'PUT',
        url: backURL + 'cart',
        xhrFields: {
            withCredentials: true
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        data: JSON.stringify({'prodNum': prodNum, 'prodCnt': '1'}),
        success: function (jsonObj) {
            // console.log(prodNum + '번 상품 수량 1개 증가 완료')
            window.location.reload()
            // 현재 화면에 표시된 값
            // let number = $('div#options .prodCnt').html()
            // console.log(number)
            // number = parseInt(number) + 1;
            // if(number < 1) {
            //     alert('수량은 1개 이상 선택 가능합니다.')
            //     number=1
            // }
            // // 결과 출력
            // $('div#options .prodCnt').html(number)
            }
    })
}


// 선택한 상품의 가격만 계산되도록 하기
// window.recruitmentStateCheckbox = () => {
//     localStorage.getItem('cartList')
// }


// 장바구니 선택 삭제
function removeCartList() {
let removeList = []
$("input:checkbox[name=cart-check]:checked").each(function() {
    let prodNum = {'prodNum' : this.value}
    removeList.push(prodNum)
})
console.log(removeList)
    $.ajax({
        type:'DELETE',
        url: backURL + 'cart',
        xhrFields: {
            withCredentials: true
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        data: JSON.stringify(removeList),
        success: function (jsonObj) {
            window.location.reload();
            // for(i=0; i<= removeList-1; i++) {
            //     let removeNum = removeList[i].prodNum;
            //     if($("input:checkbox[name=cart-check]:checked").val() == removeNum) {
            //         $('#productContainer > .checkbox > .cart-checkbox').hide()//.css('display', 'none');
            //     }
            // }
        }
    })
}

// 장바구니에서 선택한 상품만 주문화면에 보여주기
window.cartToOrderPage = () => {
    let orderProdNum = []
    let cartItem = JSON.parse(localStorage.getItem('cartList'));
    $("input:checkbox[name=cart-check]:checked").each(function() {
        for(i=0; i<= cartItem.length-1; i++) {
        if(cartItem[i].prodNum == this.value) {
            orderProdNum.push(cartItem[i])
        }
    }
})
    if(orderProdNum.length == 0) {
        alert('주문할 상품을 선택해주세요')
    } else {
    localStorage.setItem('orderList', JSON.stringify(orderProdNum));
    // window.location.href = frontURL + 'order/order.html';
    location.replace('../order/order.html')
    getUserInfo()
    }
}