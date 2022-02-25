const logoutButton = document.querySelector('.logout');
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

const selectedMessagesContainer = document.querySelector('.selected-messages');
const userStatusContainer = document.querySelector('.user-status-conversation');

var activeUser;

const scrollEvents = () => {
    const scrolled = Math.abs((chat_container.scrollTop + chat_container.clientHeight) - chat_container.scrollHeight);
    if (scrolled < 350) {
        chat_container.scrollTop = chat_container.scrollHeight;
    }
};

var connectRoom = (room) => {
    let loading = false;
    let countMessages = 10;

    var socket = io('', {
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
                    edit: false
                };

                const file_input = document.getElementById('attachment');
                if (file_input.files[0]) {
                    data.filename = uuid() + '.' + file_input.files[0].name.split('.').pop();
                    data.file = file_input.files[0];
                    data.image = '/uploads/' + data.filename;

                    clearFileInput();
                }

                const editMessageInput = document.querySelector('.edit-message');
                if (editMessageInput) {
                    data.edit = true;
                    data.editId = editMessageInput.value;
                }

                socket.emit('newMessage', data);

                message.value = '';
                message.style.height = '37px';

                setTimeout(() => {
                    if (!editMessageInput) {
                        renderMessage(data, true);
                    } else {
                        editMessage(data);
                    }

                    unselectAllBtn.click();

                    chat_container.scrollTop = chat_container.scrollHeight;
                }, 150);
            }
        });

        socket.on('editMessage', (message) => {
            editMessage(message);
        });

        document.querySelectorAll('.my-message').forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target.tagName !== 'path') {
                    showSelectedMessages(item.querySelector('.mb-4').classList.contains('selected') ? 'remove' : 'add');

                    item.querySelector('.mb-4').classList.toggle('selected');
                }
            }, false);
        });

        let timeout;

        message.addEventListener('input', () => {
            message.style.height = '';
            message.style.height = Math.min(message.scrollHeight, 120) + 'px';
        });

        message.addEventListener('keyup', () => {
            socket.emit('typing', true, room);

            clearTimeout(timeout);

            timeout = setTimeout(() => {
                socket.emit('typing', false, room);
            }, 4000);
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

            countMessages = msg_list.length;

            if (msg_list.length) {
                const lastMessage = document.querySelector('.chat-box > .d-flex');

                msg_list.forEach(message => {
                    renderMessage(message, message.me, 'afterbegin', true);
                });

                lastMessage.scrollIntoView();

                chat_container.scrollTop -= 70;
            }
        });

        if (!loading && countMessages >= 10) {
            chat_container.addEventListener('scroll', () => {
                if (countMessages >= 10) {
                    if (chat_container.scrollTop === 0) {
                        loading = true;
    
                        var lastMsgItem = document.querySelector('.chat-box > .d-flex').dataset.messageId;
    
                        preloader.style.display = '';
    
                        socket.emit('loadMessages', room, lastMsgItem);
                    }
                }
            }, { passive: true });
        }

        const removeSelectedBtn = document.querySelector('.selected-buttons > button');
        removeSelectedBtn.addEventListener('click', () => {
            const selectedItems = document.querySelectorAll('.selected');
            const selectedMessages = [];
            if (selectedItems) {
                selectedItems.forEach(item => {
                    const messageId = item.parentElement.dataset.messageId;
                    if (messageId) {
                        selectedMessages.push(messageId);
                    }
                });

                socket.emit('removeMessages', selectedMessages);

                unselectAllBtn.click();
            }
        });

        const editMessageButton = document.querySelectorAll('.im-mess--edit');
        editMessageButton.forEach(el => {
            el.addEventListener('click', (e) => {
                const messageId = e.target.closest('.my-message').dataset.messageId;
                if (messageId) {
                    const parentEl = document.querySelector('[data-message-id="' + messageId + '"]');
                    const messageData = parentEl.querySelector('.text-left');
                    message.value = messageData.innerText;

                    const editMessageInput = document.querySelector('.edit-message');
                    if (!editMessageInput) {
                        const editMessageInput = document.createElement('input');
                        editMessageInput.name = 'edit-message';
                        editMessageInput.value = messageId;
                        editMessageInput.type = 'hidden';
                        editMessageInput.classList.add('edit-message');

                        document.querySelector('.chat-input-section').appendChild(editMessageInput);
                    } else {
                        editMessageInput.value = messageId;
                    }
                }
            })
        })
    });
}

setTimeout(() => {
    chat_container.scrollTop = chat_container.scrollHeight;

    document.onclick = (e) => {
        if (!e.target.classList.contains('emojy-icon')) {
            if (document.querySelector('.emojy-panel').style.display === '') {
                document.querySelector('.emojy-panel').style.display = 'none';
            }
        }
    };

    var socket = io('', {
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

        socket.on('removeMessages', (messages) => {
            messages.forEach(message => {
                document.querySelector('[data-message-id="' + message + '"]').remove();
            });
        });
    });
}, 50);