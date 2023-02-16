$(()=>{
    $('div.my-rep-list').hide();

    //---사용가능 탭 클릭시---
    $('#home-tab').click(()=>{
        $('#home-tab').css('border-top','3px solid #00af85');
        $('#my-reps-tab').css('border-top','0');
        $('div.my-rep-list').hide();
        $('div.my-board-list').show();
    })

    //---사용불가 탭 클릭시---
    $('#my-reps-tab').click(()=>{
        //alert('사용불가버튼 클릭')
        $('#my-reps-tab').css('border-top','3px solid #00af85');
        $('#home-tab').css('border-top','0');
        $('div.my-rep-list').show();
        $('div.my-board-list').hide();
    })
    
    $(document).ready(function(){
        $(function() {
            $('input[name="daterange"]').daterangepicker({
                "startDate": "2023/02/10",
                "endDate": "2023/02/26",
                opens: 'center',
                locale: {
                format: 'YYYY/MM/DD'
                }
            });
        });
    });

    //게시글리스트 - 제목 클릭시 
    $('div.my-board-body-title').click(()=>{
        // location.href = "./detail.html?num=" + num;
        // alert("글 제목 클릭됨");
        location.href = "../board/detail.html"
    })

    //댓글리스트 - 제목 클릭시 원글로 이동 
    $('div.my-rep-body-title').click(()=>{
    // location.href = "./detail.html?boardNum=" + boardNum;
        location.href = "../board/detail.html"
    })

    //댓글리스트 - 댓글 내용 클릭시 원글로 이동 
    $('div.my-rep-content-title').click(()=>{
     // location.href = "./detail.html?boardNum=" + boardNum;
        location.href = "../board/detail.html"
     })
})