const conversations_list_input = document.querySelector('.search input');
conversations_list_input.addEventListener('input', (e) => {
    const search_value = e.target.value;
    if (search_value.length > 0) {
        document.querySelectorAll('.list li').forEach((item) => {
            if (!item.textContent.toLowerCase().includes(search_value.toLowerCase())) {
                item.style.display = 'none';
            } else {
                item.style.display = '';
            }
        });
    } else {
        document.querySelectorAll('.list li').forEach((item) => {
            if (item.style.display === 'none') {
                item.style.display = '';
            }
        });
    }
});

const logoutButton = document.querySelector('.fa-close');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        location.href = '/logout';
    });
}

const submit = document.querySelector('.send');
const message = document.getElementById('message-to-send');
if (message) {
    message.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            submit.click();
        }
    });
}

const chat_container = document.querySelector('.chat-history');
const preloader = document.querySelector('.preloader');

var connectRoom = (room) => {
    let loading = false;
    let currentPage = 0;

    var socket = io('http://localhost:3000', {
        transports: ['websocket'],
        upgrade: false,
        reconnection: false,
        rejectUnauthorized: false
    });

    socket.on('connect', () => {
        socket.emit('joinRoom', room);
        socket.emit('joinRoom', `user-room-${User._id}`);


        socket.on('new', (from) => {
            console.log(from);
        });

        submit.addEventListener('click', () => {
            if (message.value.length) {

                var data = {
                    room: room,
                    message: message.value,
                    from: User._id,
                    to: Companion._id,
                    date: new Date(),
                    username: User.username
                };
      
                socket.emit('newMessage', data);

                message.value = '';
                
                renderMessage(data, true);

                document.querySelector('.chat-history').scrollTop = document.querySelector('.chat-history').scrollHeight;
            }
        });

        let timeout;
        message.addEventListener('keyup', () => {
            socket.emit('typing', true, room);

            clearTimeout(timeout);

            timeout = setTimeout(() => {
                socket.emit('typing', false, room);
            }, 5000);
        });

        socket.on('receiveMessage', (message) => {
            console.log(message);
            renderMessage(message, false);
        });

        socket.on('typing', (is_typing) => {
            document.querySelector('.typing').style.display = is_typing ? '' : 'none';
        });

        socket.on('preloadMessages', (msg_list) => {
            loading = false;

            document.querySelector('.preloader').style.display = 'none';

            if (msg_list.length) {

                const lastMessage = document.querySelector('.chat-history ul > li');

                
                msg_list.forEach(message => {
                    renderMessage(message, message.me, 'afterbegin', true);
                });

                lastMessage.scrollIntoView();

                document.querySelector('.chat-history').scrollTop -= 70;

            }
        });


        if (!loading) {
            chat_container.addEventListener('scroll', () => {
                if (chat_container.scrollTop === 0) {
                    loading = true;
                    currentPage++;
                    document.querySelector('.preloader').style.display = '';
                    socket.emit('loadMessages', room, currentPage);
                }
            }, { passive: true });
        }
    });
}

const init = () => {
    var socket = io('http://localhost:3000', {
        transports: ['websocket'],
        upgrade: false,
        reconnection: false,
        rejectUnauthorized: false
    });

    socket.on('connect', () => {

        socket.emit('online', User._id);

        socket.on('userOnline', (user) => {
            document.querySelectorAll('[data-id="' + user + '"]').forEach(element => {
                element.innerHTML = '<i class="fa fa-circle online"></i> Online'
            });
        });

        socket.on('userOffline', (user) => {
            document.querySelectorAll('[data-id="' + user + '"]').forEach(element => {
                element.innerHTML = '<i class="fa fa-circle offline"></i> Offline'
            });
        });
    });
};

init();

setTimeout(() => {
    document.querySelector('.chat-history').scrollTop = document.querySelector('.chat-history').scrollHeight;
}, 50);