$(()=>{
  // function addProduct() {
  $('#prodAddBtn').click(function(){
    let prodName = $('#addProdname').val()
    let prodCate = $('#categorySelect option:selected').val();
    let prodWeek = $('#weekSelect option:selected').val();
    let prodPercent = $('#percentage').val();
    let inputPrice = $('#originalPrice').val();
    let regex = /[^0-9]/g; //숫자를 제외한 정규식(즉, 영어,한글,특수문자 등등...)
    let originPrice = inputPrice.replace(regex,"");
    let detail = $('#prodDetail').val();
    let imgFile = $('input[name="f"]').get(0).files[0];
    // let prodImages = "";
    // for(var i=0; i < imgFile.length; i++) {
    //   if(i == imgFile.length-1) {
    //     prodImages += imgFile[i]
    //   }
    //   prodImages += imgFile[i] + ",";
    // }

    let data = {
      "name":prodName,
      "category":prodCate,
      "week":prodWeek,
      "percentage":prodPercent,
      "originPrice":originPrice,
      "detail":detail
    }

    let formData = new FormData();

    formData.append('name', prodName);
    formData.append('category', prodCate);
    formData.append('week', prodWeek);
    formData.append('percentage', prodPercent);
    formData.append('originPrice', originPrice);
    formData.append('detail', detail);
    formData.append('file', imgFile)
    formData.append('productSaveDto',JSON.stringify(data));
    console.log(formData)
    let url = backURL+'product/add'
    $.ajax({
      url: url,
      type: 'POST',
      beforeSend: function (xhr) {
        // xhr.setRequestHeader('Content-type', 'application/json');
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      contentType: false,
      processData: false,
      enctype: 'multipart/form-data',
      data: formData,
      success: function () {
        alert("상품 등록 완료.");
        window.location.reload;
      },
      error: function(xhr){
        // alert(xhr.status)
        alert('상품등록실패'+xhr.status)
        // JSON.parse(xhr.responseText). 예) .msg 어드바이스가 응답할 내용 -> json형태로 응답을받으니
      }
    })
    // alert(formData.get('file'));
    alert(originPrice);
  })

// }


  // ---------- 상품명 글자수 제한 ----------
  $("#addProdname").keyup(function(e) {
    //console.log("키업!");
    var content = $(this).val();
    $("#textLengthCheck").text("(" + content.length + " / 30)"); //실시간 글자수 카운팅
    if (content.length > 30) {
        alert("최대 30자까지 입력 가능합니다.");
        $(this).val(content.substring(0, 30));
        $('#textLengthCheck').text("(30 / 30)");
    }
  });
  // ---------- select 옵션 박스 ----------
  $('select').each(function(){
    var $this = $(this), selectOptions = $(this).children('option').length;

    $this.addClass('hide-select');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="custom-select"></div>');

    var $customSelect = $this.next('div.custom-select');
    $customSelect.text($this.children('option').eq(0).text());

    var $optionlist = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($customSelect);

    for (var i = 0; i < selectOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($optionlist);
    }

    var $optionlistItems = $optionlist.children('li');

    $customSelect.click(function(e) {
        e.stopPropagation();
        $('div.custom-select.active').not(this).each(function(){
            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').slideToggle();
    });

    $optionlistItems.click(function(e) {
        e.stopPropagation();
        $customSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $optionlist.hide();
    });

    $(document).click(function() {
        $customSelect.removeClass('active');
        $optionlist.hide();
    });

  });

  // ---------- 할인률, 원가 입력시 할인가 자동 계산 ---------- 


  // ---------- 파일업로더 ----------
})



//--------됨
function readUrl(event) {
  let divTag = document.querySelector('#imgPreview');
  $('#uploaderIcon').attr('display', 'none')
  for (var image of event.target.files) {
    var reader = new FileReader();

    reader.onload = function(event) {
      var img = document.createElement("img");
      img.setAttribute("src", event.target.result);
      img.setAttribute("width", '200');
      divTag.appendChild(img);
    };

    console.log(image);
    reader.readAsDataURL(image);
  }
}

// 할인률 2자릿수만 입력가능하게
function maxLengthCheck(object){
  if(object.value.length > object.maxLength){
    object.value = object.value.slice(0, object.maxLength);
  }
}

// 가격입력시 자동으로 , 찍히게
function inputNumberFormat(obj) {
  obj.value = comma(uncomma(obj.value));
}

function comma(str) {
  str = String(str);
  return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function uncomma(str) {
  str = String(str);
  return str.replace(/[^\d]+/g, '');
}