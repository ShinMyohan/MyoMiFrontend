function addCart() {
    let url = backURL + 'cart/add'

    let prodNum = $('div.prodNum').html();
    let userId = "user2"
    let prodCnt = $('#result').html();
    console.log(prodNum, userId, prodCnt);
    let data = {
        'prodNum': prodNum,
        'id': userId,
        'prodCnt': prodCnt
    }
    console.log(data);
    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(data),
        success: function () {
            // alert("장바구니에 잘 담김")
        },
        error: function (response){
            alert("에러에러")
        }
    })
}

// function infoCart() {
//     let url = backURL + 'cart/list?userId=user2'
//     let $origin = $('div.cart-box-detail').first()

//     $('div.cart-box-detail').not(':first-child').remove();
//     $origin.show()
//     $.ajax({
//         url:url,
//         method:'get',
//         success: function (jsonObj) {
//             let list = jsonObj.list;
//             console.log(jsonObj)
//         },
//         error: function(xhr){
//             alert(xhr.status)
//         }
//     })
// }