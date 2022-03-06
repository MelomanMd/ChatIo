var chatSocket = io('', {
    transports: ['websocket'],
    upgrade: true,
    reconnection: true,
    rejectUnauthorized: false
});

const submit = document.querySelector('.chat-send');
const message = document.querySelector('.chat-input');
if (message) {
    message.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            submit.click();
        }
    });

    message.addEventListener('input', () => {
        message.style.height = '';
        message.style.height = Math.min(message.scrollHeight, 120) + 'px';
    });
}

const chat_container = document.querySelector('.chat-box-wrapper');
const preloader = document.querySelector('.preloader');
const selectedMessagesContainer = document.querySelector('.selected-messages');
const userStatusContainer = document.querySelector('.user-status-conversation');
const emojiPanel = document.querySelector('.emojy-panel');

const initChatRoom = (roomId) => {
    let loading = false;
    let countMessages = 10;

    chatSocket.on('connect', () => {
        /**
         * Join in chat room
         */
        chatSocket.emit('joinRoom', roomId);

        /**
         * Typing status event
         */
        let timeout;
        message.addEventListener('keyup', () => {
            chatSocket.emit('typing', true, roomId);

            clearTimeout(timeout);

            timeout = setTimeout(() => {
                chatSocket.emit('typing', false, roomId);
            }, 4000);
        });

        /**
         * Typing status 
         */
        chatSocket.on('typing', is_typing => {
            document.querySelector('.typing').style.display = is_typing ? '' : 'none';
        });

        /**
         * Remove messages events
         */
        addDynamicEventListener(document.body, 'click', '.selected-buttons > button', () => {
            const selectedItems = document.querySelectorAll('.selected');
            const selectedMessages = [];
            if (selectedItems) {
                selectedItems.forEach(item => {
                    const messageId = item.parentElement.dataset.messageId;
                    if (messageId) {
                        selectedMessages.push(messageId);
                    }
                });

                chatSocket.emit('removeMessages', selectedMessages);

                document.querySelector('.clear-selected').click();
            }
        });

        /**
         * Recive new message event
         */
        chatSocket.on('receiveMessage', message => {
            var me = false;
            if (message) {
                if (message.from && message.from === User._id) {
                    me = true;
                }
            }
            renderMessage(message, me);
        });

        /**
         * Edit message event
         */
        chatSocket.on('editMessage', message => {
            editMessage(message);
        });

        /**
         * Send messge event
         */
        submit.addEventListener('click', (e) => {
            e.preventDefault();
            if (message.value.length) {

                var data = {
                    room: roomId,
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

                chatSocket.emit('newMessage', data);

                message.value = '';
                message.style.height = '37px';

                setTimeout(() => {
                    if (editMessageInput) {
                        editMessage(data);

                        editMessageInput.remove();
                    }

                    document.querySelector('.clear-selected').click();

                    chat_container.scrollTop = chat_container.scrollHeight;
                }, 150);
            }
        });

        /**
         * Infnite preload messsages
         */
        chatSocket.on('preloadMessages', msg_list => {
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

                        if (lastMsgItem != 'undefined') {
                            chatSocket.emit('loadMessages', roomId, lastMsgItem);
                        }
                    }
                }
            }, { passive: true });
        }
    });
};

setTimeout(() => {
    if (chat_container) {
        chat_container.scrollTop = chat_container.scrollHeight;
    }

    document.onclick = (e) => {
        if (!e.target.classList.contains('emojy-icon')) {
            if (emojiPanel) {
                if (emojiPanel.style.display === '') {
                    emojiPanel.style.display = 'none';
                }
            }
        }
    };

    chatSocket.on('connect', () => {

        /**
         * Emit join room
         */
         chatSocket.emit('joinRoom', 'notifications-room');
        
        /**
         * Emit online status
         */
         chatSocket.emit('online', User._id);

        /**
         * Notification
         */
         chatSocket.on('notification', message => {
            if (message.to === User._id) {
                const parent = document.querySelector('[data-id="' + message.from + '"]').parentNode.parentNode;
                parent.querySelector('.last-message-text').innerText = message.message;
                parent.querySelector('.last-message-date').innerText = dateTime(message.created);
            }
        });

        /**
         * Change online status
         */
         chatSocket.on('userOnline', user => {
            document.querySelectorAll('[data-id="' + user + '"]').forEach(element => {
                element.classList.remove('bg-gray');
                element.classList.add('bg-success');

                if (element.nextElementSibling) {
                    element.nextElementSibling.innerText = 'Active';
                }
            });
        });

        /**
         * Change offline status
         */
         chatSocket.on('userOffline', user => {
            document.querySelectorAll('[data-id="' + user + '"]').forEach(element => {
                element.classList.remove('bg-success');
                element.classList.add('bg-gray');

                if (element.nextElementSibling) {
                    element.nextElementSibling.innerText = 'Not active';
                }
            });
        });

        /**
         * Remove message
         */
         chatSocket.on('removeMessages', messages => {
            messages.forEach(message => {
                document.querySelector('[data-message-id="' + message + '"]').remove();
            });
        });
    });
}, 50);