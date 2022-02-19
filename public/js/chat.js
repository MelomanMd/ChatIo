// const conversations_list_input = document.querySelector('.search input');
// conversations_list_input.addEventListener('input', (e) => {
//     const search_value = e.target.value;
//     if (search_value.length > 0) {
//         document.querySelectorAll('.list li').forEach((item) => {
//             if (!item.textContent.toLowerCase().includes(search_value.toLowerCase())) {
//                 item.style.display = 'none';
//             } else {
//                 item.style.display = '';
//             }
//         });
//     } else {
//         document.querySelectorAll('.list li').forEach((item) => {
//             if (item.style.display === 'none') {
//                 item.style.display = '';
//             }
//         });
//     }
// });

const logoutButton = document.querySelector('.fa-close');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        location.href = '/logout';
    });
}

const submit = document.querySelector('.chat-send');
const message = document.querySelector('.chat-input');
if (message) {
    message.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            submit.click();
        }
    });
}

const chat_container = document.querySelector('.chat-box-wrapper');
const preloader = document.querySelector('.preloader');

const emojyButton = document.querySelector('.emojy-icon');
if (emojyButton) {
    emojyButton.addEventListener('click', () => {
        const emojyElement = document.querySelector('.emojy-panel');
        emojyElement.style.display = emojyElement.style.display === 'none' ? '' : 'none';
    });
};

const fileButton = document.querySelector('.file-icon');
if (fileButton) {
    fileButton.addEventListener('click', () => {
        document.querySelector('[type="file"]').click();
    });
};


const emojyPicker = document.querySelector('emoji-picker');
if (emojyPicker) {
    emojyPicker.addEventListener('emoji-click', (e) => {
        typeInTextarea(e.detail.unicode, message);
    });
}

var activeUser;


const scrollEvents = () => {
    const scrolled = Math.abs((chat_container.scrollTop + chat_container.clientHeight) - chat_container.scrollHeight);
    if (scrolled < 350) {
        chat_container.scrollTop = chat_container.scrollHeight;
    }
};

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

        activeUser = Companion._id;

        socket.emit('joinRoom', room);

        submit.addEventListener('click', (e) => {
            e.preventDefault();
            if (message.value.length) {

                var data = {
                    room: room,
                    message: message.value,
                    from: User._id,
                    to: Companion._id,
                    date: new Date(),
                    username: User.username,
                };

                // const file = document.getElementById('attachment').files[0];
                // if (file) {
                //     data.filename = uuid() + '.' + file.name.split('.').pop();
                //     data.file = file;
                //     data.image = '../uploads/' + data.filename;
                // }
      
                socket.emit('newMessage', data);

                message.value = '';
                
                setTimeout(() => {
                    renderMessage(data, true);

                    chat_container.scrollTop = chat_container.scrollHeight;
                }, 150);
            }
        });

        let timeout;
        message.addEventListener('keyup', () => {
            socket.emit('typing', true, room);

            clearTimeout(timeout);

            timeout = setTimeout(() => {
                socket.emit('typing', false, room);
            }, 30000000);
        });

        socket.on('receiveMessage', (message) => {
            renderMessage(message, false);
        });

        socket.on('typing', (is_typing) => {
            document.querySelector('.typing').style.display = is_typing ? '' : 'none';
        });

        socket.on('preloadMessages', (msg_list) => {
            loading = false;

            preloader.style.display = 'none';

            if (msg_list.length) {

                const lastMessage = document.querySelector('.chat-history ul > li');

                msg_list.forEach(message => {
                    renderMessage(message, message.me, 'afterbegin', true);
                });

                lastMessage.scrollIntoView();

                chat_container.scrollTop -= 70;
            }
        });


        if (!loading) {
            chat_container.addEventListener('scroll', () => {
                if (chat_container.scrollTop === 0) {
                    loading = true;
                    currentPage++;
                    preloader.style.display = '';
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

        socket.on('notification', (message) => {
            if (message.to === User._id) {
                const parent = document.querySelector('[data-id="' + message.from + '"]').parentNode.parentNode;
                parent.querySelector('.last-message-text').innerText = message.message;
                parent.querySelector('.last-message-date').innerText = dateTime(message.created);
            }
        });


        socket.emit('online', User._id);

        socket.on('userOnline', (user) => {
            document.querySelectorAll('[data-id="' + user + '"]').forEach(element => {
                element.classList.remove('bg-gray');
                element.classList.add('bg-success');

                if (element.nextElementSibling) {
                    element.nextElementSibling.innerText = 'Active';
                }
            });
        });

        socket.on('userOffline', (user) => {
            document.querySelectorAll('[data-id="' + user + '"]').forEach(element => {
                element.classList.remove('bg-success');
                element.classList.add('bg-gray');

                if (element.nextElementSibling) {
                    element.nextElementSibling.innerText = 'Not active';
                }
            });
        });
    });
};

init();

setTimeout(() => {
    chat_container.scrollTop = chat_container.scrollHeight;
}, 50);