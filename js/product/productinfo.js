$(() => {
    let token = Cookies.get('token')

    // -- 상품 보여주기 START --
    let data = location.search.substring(1) //prodNum=1

    let regex = /[^0-9]/g; //숫자를 제외한 정규식(즉, 영어,한글,특수문자 등등...)
    let prodNum = data.replace(regex, "");
    //그 영어,한글,특수 문자 등등이있다면 ""로 처리 = 있다면 없애주어라
    $.ajax({
        url: backURL + 'product/' + prodNum,
        method: 'get',
        data: data,
        success: function (jsonObj) {
            let product = jsonObj['body'];
            localStorage.setItem('cartList', JSON.stringify(product))
            // console.log(product);
            $('#prodMainImg').attr('src', product["productImgUrl"])
            $('div.prodNum').html(product['prodNum']);
            $('div.prodName>h4').html(product['name'])
            $('div.sellerName>h6').html(product['sellerName'])
            $('div.percentage b').html(product['percentage'] + "%")
            $('div.originPrice').html(product['originPrice'].toLocaleString() + "원")
            $('#sellerId').val(product['sellerId'])
            $('#prodDetailInfo').html(product['detail'])
            let percentage = product['percentage']
            let originPrice = product['originPrice']
            let prodPrice = Math.round(originPrice - originPrice * (percentage / 100));
            let stars = product['stars']

            $('div.prodPrice').html(prodPrice.toLocaleString() + "원")
            // 처음 뿌려줄 땐 1개 수량 그대로.
            $('div.total-sum').html(prodPrice.toLocaleString() + "원")

            $('div.to-cart div.prodName h5').html(product['name'])

            // 베스트 리뷰
            let $originBR = $('div.br-child');
            let $parentBR = $('div.br-parent');
            $parentBR.empty()
            let bestReviewList = product['bestReviews'];
            let bestReviewCnt = bestReviewList.length;

            if (bestReviewCnt == 0) {
                $('div.br-non-list').css('display', 'block')
            }

            bestReviewList.forEach(bestReview => {
                let content = bestReview['content']
                let stars = bestReview['stars']
                let title = bestReview['title']
                let prodName = bestReview['prodName']
                let bestReviewImgUrl = bestReview['file']
                let writer = bestReview['userName']
                let userName = writer.replace(/(?<=.{1})./gi, "*")
                let createdDate = bestReview['createdDate']
                let $copyBR = $originBR.clone()

                $copyBR.show()
                $copyBR.find('div.b-id').html(userName)
                $copyBR.find('div.b-prod-name').html(prodName)
                $copyBR.find('div.b-date').html(createdDate)
                $copyBR.find('div.b-title').html(title)
                $copyBR.find('p.b-pr-review-content-body').html(content)
                $copyBR.find('div.b-star-num').html(stars)
                $copyBR.find('#brImg').attr('src', bestReviewImgUrl)
                $copyBR.find()
                $parentBR.append($copyBR)
            })
            $originBR.hide();

            // 상품 리뷰
            let $originR = $('div.pr-review');
            let $parentR = $('div.pr-reviews');
            $parentR.empty();
            let reviewList = product['reviews']
            let reviewCnt = reviewList.length;
            // let prodNameR = jsonObj['body']['name']

            if (reviewCnt == 0) {
                $('div.r-non-list').css('display', 'block')
                $('div.br-non-list').css('display', 'block')
            }
            // console.log(reviewList)
            $('div.review-cnt').html(reviewCnt + "건")
            $('.total-starrating').html((stars / reviewCnt).toFixed(1) + "점")

            reviewList.forEach(review => {
                // console.log(review)

                let content = review['content']
                let stars = review['stars']
                let title = review['title']
                let prodName = review['prodName']
                let reviewImgUrl = review['file']
                let writer = review['userId']
                let userName = writer.replace(/(?<=.{1})./gi, "*")
                let createdDate = review['createdDate']
                let $copyR = $originR.clone()
                //베스트리뷰라면,
                // if (review['bestReview'] == '') {
                //     $('div.br-non-list').css('display', 'block')
                // }
                $copyR.show()
                $copyR.find('p.spr-review-content-body').html(content)
                $copyR.find('div.star-num').html(stars)
                $copyR.find('strong.title').html(title)
                $copyR.find('.r-id').html(userName)
                $copyR.find('.r-date').html(createdDate)
                $copyR.find('#prodNameR').html(prodName)
                $copyR.find('#rImg').attr('src', reviewImgUrl)


                $parentR.append($copyR);
            })
            $originR.hide()

            // 상품 문의
            let $origin = $('div.qna-list');
            let $parent = $('div.qna-parent-list');
            $parent.empty()
            let qnaList = product["qnas"]
            // console.log(qnaList)
            //배열의 길이 만큼 qna도 존재하므로 qnaList.length = qna의 가장 최신글 표시 넘버
            let qnum = qnaList.length //12개 존재하면 12.
            if (qnaList.length == 0) {
                $('div.qna-non-list').css('display', 'block')
            }
            qnaList.forEach(qna => {
                // console.log(qna)
                let queTitle = qna['queTitle']
                let queContent = qna['queContent']
                let queCreatedDate = qna['queCreatedDate']
                let ansContent = qna['ansContent']
                let ansCreatedDate = qna['ansCreatedDate']
                let writer = qna['userId']
                let qnaImgUrl = qna['qnaImgUrl']
                //유저네임 첫글자 빼고 다 * 로 치환
                let userName = writer.replace(/(?<=.{1})./gi, "*")
                let $copy = $origin.clone()

                $copy.show()
                $copy.find('.qna-num').html(qnum--)
                $copy.find('.qna-user-name').html(userName)
                $copy.find('.qna-date').html(queCreatedDate)
                if (ansCreatedDate == '' || ansCreatedDate == null) {
                    $copy.find('#qnaStatus').html('답변대기')
                    $copy.find('#qnaAnswer').hide();
                } else {
                    $copy.find('.qna-status').html('답변완료')
                    $copy.find('#qnaAnswer').show();
                }
                $copy.find('.qna-title').html(queTitle)
                $copy.find('.qna-content').html(queContent)
                $copy.find('.ans-date').html(ansCreatedDate)
                $copy.find('.answer-content').html(ansContent)
                $copy.find('#qnaMainImg').attr('src', qnaImgUrl)

                $parent.append($copy);
            })
            $origin.hide()

            //—문의 목록 슬라이드 START—
            $(".qna-row").on('click', function () {
                $(this).next(".qna-detail").slideToggle(100)
            })
            //—문의 목록 슬라이드 END—
        },
        error: function (xhr) {
            alert(xhr.status)
        }
    })

    //--상품정보보여주기 END--
    $('header>nav>ul>li').click((e) => {
        $('header>nav>ul>li').css('background-color', '#fff').css('color', '#000')

        $(e.target).css('background-color', '#2C2A29').css('color', '#fff')
        let menu = $(e.target).attr('class')
        switch (menu) {
            case 'login':
                break;
            case 'signup':
                break;
            case 'logout':
                break;
            case 'productlist':
                //$.ajax
                //$('section').load('./productlist.html')
                location.href = frontURL + '?menu=productlist'
                break;
        }
    })

    // 수량 조절 버튼 누를 때 총 합계 변화
    $("#quantityMin").click(function () {
        let prodPrice = $('#prodPrice').html()
        let price = prodPrice.replace(regex, "")
        let qtt = $('#result').html()
        let totalPrice = price * qtt;
        $('#tt-price').html(totalPrice.toLocaleString() + "원")
    })

    $("#quantityPl").click(function () {
        let prodPrice = $('#prodPrice').html()
        let price = prodPrice.replace(regex, "")
        let qtt = $('#result').html()
        let totalPrice = price * qtt;
        $('#tt-price').html(totalPrice.toLocaleString() + "원")
    })

    //--문의작성 모달 열기 START-- 
    $(document).on('click', '.qna-add-button', function (e) {
        let token = Cookies.get('token')
        if (token == null) {
            if (confirm('로그인 후 이용 가능합니다. 로그인 하시겠습니까?')) {
                location.href = "../user/login.html"
            } else {
                location.href = "../product/productinfo.html?prodNum=" + prodNum;
            }
        }
        if (token != null) {
            $('.qna-write').addClass('show');
        }
    });


    //--모달창 등록버튼 눌렀을 때 할 일 START--
    $(document).on('click', '.modal-submit', function (e) {
        let qnaTitle = $('input[name=modal-qna-title]').val();
        let qnaContent = $('#modal-qna-content').val();
        let imgFile = $('input[name="qnafile"]').get(0).files[0];

        if (qnaTitle == '') {
            alert("제목이 입력되지 않았습니다.");
            return;
        }

        if (qnaContent == '') {
            alert("내용이 입력되지 않았습니다.");
            return;
        }

        let formData = new FormData();
        formData.append('queTitle', qnaTitle);
        formData.append('queContent', qnaContent);
        formData.append('file', imgFile)
        // console.log(formData)

        $.ajax({
            type: "POST",
            url: backURL + 'product/qna/' + prodNum,
            data: formData,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            contentType: false,
            processData: false,
            enctype: 'multipart/form-data',
            data: formData,
            success: function (response) {
                alert("상품문의 등록이 완료되었습니다.");
                window.location.href = "../product/productinfo.html?prodNum=" + prodNum;
            },
            error: function (xhr) {
                alert(xhr.status);
            },
        });
    })
    //—모달창 등록버튼 눌렀을 때 할 일 END—

    //—글 제목 글자수 초과시 alert START—
    $('#modal-qna-title').keyup(function () {
        let title = $('#modal-qna-title').val();
        if (title.length > 50) {
            alert("최대 50자까지 입력 가능합니다.")
        }
    })
    //—글 제목 글자수 초과시 alert END—

    //글 본문 글자수 초과시 alert START—
    $('#modal-qna-content').keyup(function () {
        let content = $('#modal-qna-content').val();
        if (content.length > 1000) {
            alert("최대 1000자까지 입력 가능합니다.")
        }
    });
    //글 본문 글자수 초과시 alert START—

    //—모달 닫기 START—
    $(document).on('click', '#close-btn', function (e) {
        $('.qna-write').removeClass('show');

    });
    //—모달 닫기 END—
})

// 수량 조절 + , - 버튼
function count(type) {
    // 결과를 표시할 element
    const resultElement = document.getElementById('result');
    // 현재 화면에 표시된 값
    let number = resultElement.innerText;

    // 더하기/빼기
    if (type === 'plus') {
        number = parseInt(number) + 1;
    } else if (type === 'minus') {
        number = parseInt(number) - 1;
    }

    if (number < 1) {
        alert('수량은 1개 이상 선택 가능합니다.')
        number = 1
    }
    // 결과 출력
    resultElement.innerText = number;
}

// 셀러 스토어로 이동
function getSellerStore() {
    let seller = $('#sellerId').val()
    location.href = '../../html/product/sellerstore.html?seller=' + seller;
}