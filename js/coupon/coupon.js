$(()=>{
    $('div.expired-coupon-list').hide();

    //---사용가능 탭 클릭시---
    $('#home-tab').click(()=>{
        $('#home-tab').css('border-top','3px solid #00af85');
        $('#expired-tab').css('border-top','0');
        $('div.expired-coupon-list').hide();
        $('div.coupon-list').show();
    })

    //---사용불가 탭 클릭시---
    $('#expired-tab').click(()=>{
        //alert('사용불가버튼 클릭')
        $('#expired-tab').css('border-top','3px solid #00af85');
        $('#home-tab').css('border-top','0');
        $('div.expired-coupon-list').show();
        $('div.coupon-list').hide();
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
})