$(()=>{
    function getMyChatRoom() {
        $.ajax({
            type: 'GET',
            url: backURL + 'chat/room',
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            success: function (response) {
                let chat = response;
                let roomNum = chat.num
                let userId = chat.userId
                connectStomp(roomNum, userId);

            },
            error: function (xhr) {
                console.log(xhr.status);
            }
        })
    }
    getMyChatRoom();
});


function connectStomp(roomNum, userId) {
	var sock = new SockJS(backURL + "stomp");

    // 1. SockJS를 내부에 들고있는 stomp를 내어줌
    var stomp = Stomp.over(sock);

    var chatBox = $('#chatMsg');

    // 2. connection이 맺어지면 실행한다
    stomp.connect({Authorization:token}, function (frame) {
        // setConnected(true)
        console.log('Connected: ' + frame)

        //3. send(path, header, message)로 메세지를 보낼 수 있음 -> stringify: post의 역할, /pub/chat/enter 에 DTO로 받을 수 있도록 JSON으로 보내줌
        stomp.send('/pub/chat/enter', {}, JSON.stringify({'num' : roomNum}), function() {

        })

        // 처음 인삿말
        stomp.subscribe("/sub/chat/enter/" + roomNum, function (msgDto) {
            let getMsg = msgDto.body;
            let content = getMsg;

            chatBox.append('<div class="center">' + content  + '</div>')
        });

        // 메시지 전송하기 (publish) /pub/chat/message 로 @MessageMapping을 이용해서 메시지를 서버에서 받으면, return 값인 /sub/chat/room/ 으로 이동
        $(".send-btn").on("click", function(e){
            // let textarea = document.getElementById('#msg-input');
            let sendMsg = $('#msg-input').val()
            console.log('보내지는거야? : ' + sendMsg)
            stomp.send('/pub/chat/message', {}, JSON.stringify({'num': roomNum, 'senderId': userId,'content': sendMsg}));
        });

        // 4. subscribe(path, callback)으로 메세지를 받을 수 있음 -> 메세지를 받아오기(subscribe) -> get
        stomp.subscribe("/sub/chat/room/" + roomNum, function (msgDto) {
            let getMsg = JSON.parse(msgDto.body);

            let senderId = getMsg.senderId;
            let content = getMsg.content;

            var today = new Date();
            var hours = ('0' + today.getHours()).slice(-2);
            var minutes = ('0' + today.getMinutes()).slice(-2);
            let createdDate = hours + ':' + minutes;

            var str = '';

            let assembleMsg = (senderId == 'admin') ? 'leftMsg' : 'rightMsg';

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
            }
        });

    });
}

function clearTextarea() {
    $('div.input-box textarea').val('');
}

function openForm() {
    $('div.chat-container').show();
}

function closeForm() {
    $('div.chat-container').hide();
}

