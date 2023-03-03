function searchProduct() {
    // -- 상품 보여주기 START --
    let url = backURL + 'product/'
    let keyword = $('#searchBox').val();

    $.ajax({
        url: url + keyword,
        method: 'GET',
        data: keyword,
        success: function(jsonObj){
            
        },
        error: function(xhr){
            alert(xhr.status)
        }
    })
}