let token = Cookies.get('token')

$(() => {
    getChatRooms()
    function getChatRooms() {
        $.ajax({
            type: 'GET',
            url: backURL + 'chat/rooms',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            success: function (response) {
                let chatList = response.data;
                console.log(chatList)

                for(let i =0; i<= chatList.length-1; i++){
                    let num = chatList[i]['num']
                    let userId = chatList[i]['userId']
                    let adminId = chatList[i]['adminId']
                    let createdDate = chatList[i]['createdDate']
                    let role = chatList[i]['role']
                    role = role == 0 ? "구매자" : "판매자"
                    let membershipLevel = chatList[i]['membershipLevel']
                    if(role == "판매자") {membershipLevel = ''}

                    let chatHTML = `<tr onclick="getChatDetails(${num})">
                                        <td>${num}</td>
                                        <td>${userId}</td>
                                        <td>${role}</td>
                                        <td>${membershipLevel}</td>
                                        <td>${createdDate}</td>
                                        <td>${adminId}</td>
                                    </tr>`;

                    $('#chatRoomList').append(chatHTML);
            }
            },
            error: function (xhr) {
                console.log(xhr.status);
            }
        })
    }

})

function getChatDetails(num) {
    $('#chatMsg').empty();
    let userId = 'admin'
    $.ajax({
        type: 'GET',
        url: backURL + 'chat/room/' + num + '/message',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        success: function (response) {
            let chatList = response.data;
            console.log(chatList)

            for(let i =0; i<= chatList.length-1; i++){
                let content = chatList[i]['content']
                let createdDate = chatList[i]['createdDate']
                let senderId = chatList[i]['senderId']

                let assembleMsg = (senderId == 'admin') ? 'rightMsg' : 'leftMsg';

                let chatHTML = `<div class=${assembleMsg}><div class="msgContent">${content}</div><div class="date">${createdDate}</div></div>`

                $('#chatMsg').append(chatHTML);
            } $('#chatRoomNum').text(' ' +num);
            connectAdminStomp(num, userId);
        },
        error: function (xhr) {
            console.log(xhr.status);
        }
    })
}

// 관리자로 채팅하기
stomp = '';

// stomp 연결
function connectAdminStomp(roomNum, userId) {
    // let token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJxd2VyIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY3ODY5NTc2Nn0.TmeXe7aj6VqYGi_-5F4Wbq5zlxuM-v4eA4P0Ni-5too'
    // let token = Cookies.get('token')

	var sock = new SockJS(backURL + "stomp");

    // 1. SockJS를 내부에 들고있는 stomp를 내어줌
    stomp = Stomp.over(sock);
    // stomp.debug = null // 개발자 도구에서 프레임 숨기기

    var chatBox = $('#chatMsg');

    // 2. connection이 맺어지면 실행한다
    stomp.connect(function () {

        // 메시지 전송하기 (publish) /pub/chat/message 로 @MessageMapping을 이용해서 메시지를 서버에서 받으면, return 값인 /sub/chat/room/ 으로 이동
        $(".send-btn").on("click", function(e){
            // let textarea = document.getElementById('#msg-input');
            let sendMsg = $('#msg-input').val()
            stomp.send('/pub/chat/message', {}, JSON.stringify({'num': roomNum, 'senderId': userId, 'content': sendMsg}));
            clearTextarea()
        });

        // 4. subscribe(path, callback)으로 메세지를 받을 수 있음 -> 메세지를 받아오기(subscribe) -> get
        stomp.subscribe("/sub/chat/room/" + roomNum, function (msgDto) {
            let getMsg = JSON.parse(msgDto.body);
            console.log(getMsg)

            let senderId = getMsg.senderId;
            let content = getMsg.content;

            var today = new Date();
            var hours = ('0' + today.getHours()).slice(-2);
            var minutes = ('0' + today.getMinutes()).slice(-2);
            let createdDate = hours + ':' + minutes;

            let assembleMsg = (senderId == 'admin') ? 'rightMsg' : 'leftMsg';

            let chatHTML = `<div class=${assembleMsg}><div class="msgContent">${content}</div><div class="date">${createdDate}</div></div>`
            chatBox.append(chatHTML)

        });

        // 엔터키로 메시지 보내기
        $(document).on('keydown', 'div.input-box textarea', function(e){
            if(e.keyCode == 13 && !e.shiftKey) {
                e.preventDefault();
                let sendMsg = $('#msg-input').val()
                stomp.send('/pub/chat/message', {}, JSON.stringify({'num': roomNum, 'senderId': userId, 'content': sendMsg}));
                // 입력창 clear
                clearTextarea();
                $('.chat').scrollTop($('#chatMsg').prop('scrollHeight')); // 자동 스크롤
            }
        });

    });
}

function clearTextarea() {
    $('div.input-box textarea').val('');
}