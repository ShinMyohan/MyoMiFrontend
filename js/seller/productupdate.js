let regex = /[^0-9]/g;
$(()=>{
    let token = Cookies.get('token')
    $.ajax({
        url: backURL + 'product/seller/' + 12,
        method: 'GET',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        xhrFields: {
            withCredentials: true
        },
        success: function(jsonObj){
            let product = jsonObj['body']
            // console.log(product);
            let prodName = product['name']
            let category = product['category']
            let week = product['week']
            let percentage = product['percentage']
            let price = product['originPrice']
            let originPrice = price.toLocaleString()
            let detail = product['detail']
            let imgUrl = product['productImgUrl']
            let status = product['status']
            let prodNum = product['prodNum']

            $('#addProdname').val(prodName)
            $('#prodCate').val(category)
            $('#prodWeek').val(week + '주')
            $('#prodPercentage').val(percentage + '%')
            $('#originalPrice').val(originPrice + '원')
            $('#updateProdNum').val(prodNum);

            let p1 = originPrice.replace(regex,'');
            let p2 = Math.round(p1);
            let p3 = Math.round(p1 - p1*(percentage/100));

            $('#afterDC').val(p2.toLocaleString()+'원');
            $('#finalPricePerOne').val(Math.round(p3*0.91).toLocaleString()+'원')

            if(detail == 'null') {
                $('#prodDetail').val('')
            }

            $('#preview').attr('src',imgUrl)

            if(status == 1) {
                $('input:radio[id="outOfStock"]').attr('checked', true);
            } else if(status == 2){
                $('input:radio[id="soldOut"]').attr('checked', true);
            } else {
                $('input:radio[id="onSale"]').attr('checked', true);
            }
        }
    })

    $('#prodUpdateBtn').click(function(){
        let prodNum = $('#updateProdNum').val();
        let detailInfo = $('#prodDetail').val()
        let statusRadio = $('input:radio[name="inlineRadioOptions"]:checked').val()

        let data = {
            "detail":detailInfo,
            "status":statusRadio
        }

        $.ajax({
            url: backURL+'product/'+prodNum,
            type: 'PUT',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            data: JSON.stringify(data),
            success: function () {
                alert("상품 수정 완료.");
                window.location.reload;
            },
            error: function(xhr){
                // alert(xhr.status)
                alert(xhr.status)
                // JSON.parse(xhr.responseText). 예) .msg 어드바이스가 응답할 내용 -> json형태로 응답을받으니
            }
        })
        alert(statusRadio);
    })
})
