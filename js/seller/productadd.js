$(()=>{
  // ---------- 상품명 글자수 제한 ----------
  $("#add-prodname").keyup(function(e) {
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
  function ekUpload(){
    function Init() {

      console.log("Upload Initialised");

      var fileSelect    = document.getElementById('file-upload'),
          fileDrag      = document.getElementById('file-drag'),
          submitButton  = document.getElementById('submit-button');

      fileSelect.addEventListener('change', fileSelectHandler, false);

      // XHR2 가능한지
      var xhr = new XMLHttpRequest();
      if (xhr.upload) {
        // 파일 드랍
        fileDrag.addEventListener('dragover', fileDragHover, false);
        fileDrag.addEventListener('dragleave', fileDragHover, false);
        fileDrag.addEventListener('drop', fileSelectHandler, false);
      }
    }

    function fileDragHover(e) {
      var fileDrag = document.getElementById('file-drag');

      e.stopPropagation();
      e.preventDefault();

      fileDrag.className = (e.type === 'dragover' ? 'hover' : 'modal-body file-upload');
    }

    function fileSelectHandler(e) {
      // Fetch FileList object
      var files = e.target.files || e.dataTransfer.files;

      // Cancel event and hover styling
      fileDragHover(e);

      // Process all File objects
      for (var i = 0, f; f = files[i]; i++) {
        parseFile(f);
        uploadFile(f);
      }
    }

    // output
    function output(msg) {
      // 응답
      var m = document.getElementById('messages');
      m.innerHTML = msg;
    }

    function parseFile(file) {

      console.log(file.name);
      output(
        '<strong>' + encodeURI(file.name) + '</strong>'
      );
      
      // var fileType = file.type;
      // console.log(fileType);
      var imageName = file.name;

      var isGood = (/\.(?=gif|jpg|png|jpeg)/gi).test(imageName);
      if (isGood) {
        document.getElementById('start').classList.add("hidden");
        document.getElementById('response').classList.remove("hidden");
        document.getElementById('notimage').classList.add("hidden");
        // 올린 파일 썸네일 미리보기!
        document.getElementById('file-image').classList.remove("hidden");
        document.getElementById('file-image').src = URL.createObjectURL(file);
      }
      else {
        document.getElementById('file-image').classList.add("hidden");
        document.getElementById('notimage').classList.remove("hidden");
        document.getElementById('start').classList.remove("hidden");
        document.getElementById('response').classList.add("hidden");
        document.getElementById("file-upload-form").reset();
      }
    }

    function setProgressMaxValue(e) {
      var pBar = document.getElementById('file-progress');

      if (e.lengthComputable) {
        pBar.max = e.total;
      }
    }

    function updateFileProgress(e) {
      var pBar = document.getElementById('file-progress');

      if (e.lengthComputable) {
        pBar.value = e.loaded;
      }
    }

    function uploadFile(file) {

      var xhr = new XMLHttpRequest(),
        fileInput = document.getElementById('class-roster-file'),
        pBar = document.getElementById('file-progress'),
        fileSizeLimit = 1024; // 리미트 MB
      if (xhr.upload) {
        // 파일 사이즈 체크!
        if (file.size <= fileSizeLimit * 1024 * 1024) {
          // 진행 바
          pBar.style.display = 'inline';
          xhr.upload.addEventListener('loadstart', setProgressMaxValue, false);
          xhr.upload.addEventListener('progress', updateFileProgress, false);

          // 파일 받는거 실패시
          xhr.onreadystatechange = function(e) {
            if (xhr.readyState == 4) {
              // progress.className = (xhr.status == 200 ? "success" : "failure");
              // document.location.reload(true);
            }
          };

          // 업로드 시작
          xhr.open('POST', document.getElementById('file-upload-form').action, true);
          xhr.setRequestHeader('X-File-Name', file.name);
          xhr.setRequestHeader('X-File-Size', file.size);
          xhr.setRequestHeader('Content-Type', 'multipart/form-data');
          xhr.send(file);
        } else {
          output('Please upload a smaller file (< ' + fileSizeLimit + ' MB).');
        }
      }
    }

    // 다양한 파일 api 지원 체크체크
    if (window.File && window.FileList && window.FileReader) {
      Init();
    } else {
      document.getElementById('file-drag').style.display = 'none';
    }
  }
  ekUpload();
})