let regex = /[^0-9]/g;
$(()=>{
    let data = location.search.substring(1) //prodNum=1
    let prodNum = data.replace('prodNum=','')
    let token = Cookies.get('token')
    $.ajax({
        url: backURL + 'product/seller/' + prodNum,
        method: 'GET',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        xhrFields: {
            withCredentials: true
        },
        success: function(jsonObj){
            let product = jsonObj.body
            let originPrice = product.originPrice.toLocaleString()

            $('#addProdname').val(product.name)
            $('#prodCate').val(product.category)
            $('#prodWeek').val(product.week + '주')
            $('#prodPercentage').val(product.percentage + '%')
            $('#originalPrice').val(product.originPrice.toLocaleString() + '원')
            $('#updateProdNum').val(product.prodNum);

            let p1 = originPrice.replace(regex,'');
            let p2 = Math.round(p1);
            let p3 = Math.round(p1 - p1*(product.percentage/100));

            $('#afterDC').val(p2.toLocaleString()+'원');
            $('#finalPricePerOne').val(Math.round(p3*0.91).toLocaleString()+'원')

            if(product.detail == 'null') {
                $('#prodDetail').val('')
            }

            $('#preview').attr('src',product.productImgUrl)
            console.log(product)
            if(product.status == 1) {
                $('input:radio[id="outOfStock"]').attr('checked', true);
            } else if(product.status == 2){
                $('input:radio[id="soldOut"]').attr('checked', true);
            } else {
                $('input:radio[id="onSale"]').attr('checked', true);
            }
        },
        error: function(response){
            
            // JSON.parse(xhr.responseText). 예) .msg 어드바이스가 응답할 내용 -> json형태로 응답을받으니
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
        let token = Cookies.get('token')
        $.ajax({
            url: backURL+'product/'+prodNum,
            type: 'PUT',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            xhrFields: {
                withCredentials: true
            },
            data: JSON.stringify(data),
            success: function () {
                alert("상품 수정 완료.");
                location.href="../../html/sellerpage/sellerproductlist.html"
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
