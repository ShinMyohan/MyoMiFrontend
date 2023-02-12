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