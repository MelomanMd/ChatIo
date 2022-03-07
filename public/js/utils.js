const dateTime = (time) => {
    var time = new Date(time);
    var hours = time.getHours();
    if (hours < 10) {
        hours = '0' + hours;
    }

    var min = time.getMinutes();
    if (min < 10) {
        min = '0' + min;
    }

    var seconds = time.getSeconds();
    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    let day = dayName(time.getDay()) + ' ' + time.getDate();

    const is_today = isToday(time);
    if (is_today) {
        day = 'Today';
    }

    const is_yesterday = isYesterday(time);
    if (is_yesterday) {
        day = 'Yesterday';
    }

    return hours + ':' + min + ', ' + day;
};

const isToday = (date) => {
    const today = new Date();
    return date.getDate() == today.getDate() &&
        date.getMonth() == today.getMonth() &&
        date.getFullYear() == today.getFullYear();
};

const isYesterday = (date) => {
    if (new Date().getDate() - date.getDate() === 1) {
        return true
    }
    return false;
};

const dayName = (day) => {
    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    return days[day];
};

const renderMessage = (message, me, position = 'beforeend', loaded = false) => {
    const message_template = `<div class="d-flex message-item ${me ? `my-message` : '' }" data-message-id="${message.id}">
        ${me ? '<div style="flex: 1 1 0%;"></div>' : ''}

        <div class="text-${me ? 'right' : 'left'} mb-4" style="width: 100%;">
            <div class="conversation-list d-inline-block px-3 py-2" style="border-radius: 12px; background-color: rgba(85, 110, 230, 0.1);">
                <div class="ctext-wrap">
                    <div class="conversation-name text-primary d-flex align-items-center mb-1">
                        <div class="mr-2" style="font-weight: 600; cursor: pointer;">${ !loaded ? message.username : message.user.username}</div>
                        <div class="rounded-circle bg-success" style="width: 7px; height: 7px; opacity: 1;"></div>
                    </div>
                    <p class="text-left">${message.message}</p>

                    ${message.image ? `<p class="text-left"><img src="${message.image}" width="200px" /></p>` : ``}

                    ${me ? `<p role="link" class="im-mess--edit">
                            <svg height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.6 3.64l2.76 2.76L5.75 13a5.2 5.2 0 01-2.16 1.3l-2.25.69a.26.26 0 01-.33-.33l.7-2.25A5.2 5.2 0 013 10.25zm3.95-2.3l1.1 1.1c.44.43.46 1.1.09 1.57l-1.26 1.26-2.75-2.75 1.17-1.18c.46-.45 1.2-.45 1.65 0z" fill="currentColor"></path>
                            </svg>
                        </p>` :
                        `<p role="link" title="Reply message" class="im-mess--reply">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                                    <path fill="currentColor" d="M8.04 1.5c-.4 0-.74.17-1.02.34-.28.18-.6.43-1 .72l-4.7 3.57c-.45.34-.99.7-1.2 1.24a1.75 1.75 0 000 1.26c.2.54.73.88 1.18 1.22l4.72 3.59c.4.3.72.54 1 .72.28.17.62.35 1.02.34a1.75 1.75 0 001.35-.67c.25-.31.31-.7.34-1.02.03-.33.03-.74.03-1.23v-.9c1 .09 1.77.36 2.46.76a9.71 9.71 0 012.45 2.29.75.75 0 001.33-.48 9.2 9.2 0 00-1.57-5.5 7.56 7.56 0 00-4.67-2.87v-.46c0-.49 0-.9-.03-1.23-.03-.32-.1-.7-.34-1.02a1.75 1.75 0 00-1.35-.67z"></path>
                                </svg>
                        </p>`
                    }
                    <p class="chat-time mb-0">
                        <svg width="12" height="12" class="prefix__MuiSvgIcon-root prefix__jss80 prefix__MuiSvgIcon-fontSizeLarge" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                            <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
                        </svg>
                        ${ !loaded ? dateTime(message.date) : message.created}
                    </p>
                </div>
            </div>
        </div>

        ${!me ? '<div style="flex: 1 1 0%;"></div>' : ''}
    </div>`;

    document.querySelector('.chat-box-wrapper .chat-box').insertAdjacentHTML(position, message_template);

    scrollEvents();
};


const editMessage = (message) => {
    const message_template = `
    ${message.from === User._id ? '<div style="flex: 1 1 0%;"></div>' : ''}

    <div class="text-${message.from === User._id ? 'right' : 'left'} mb-4" style="width: 100%;">
        <div class="conversation-list d-inline-block px-3 py-2" style="border-radius: 12px; background-color: rgba(85, 110, 230, 0.1);">
            <div class="ctext-wrap">
                <div class="conversation-name text-primary d-flex align-items-center mb-1">
                    <div class="mr-2" style="font-weight: 600; cursor: pointer;">${ message.username }</div>
                    <div class="rounded-circle bg-success" style="width: 7px; height: 7px; opacity: 1;"></div>
                </div>
                <p class="text-left">${message.message}</p>

                ${message.image ? `<p class="text-left"><img src="${message.image}" width="200px" /></p>` : ``}

                ${message.from === User._id ? `<p role="link" class="im-mess--edit">
                        <svg height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.6 3.64l2.76 2.76L5.75 13a5.2 5.2 0 01-2.16 1.3l-2.25.69a.26.26 0 01-.33-.33l.7-2.25A5.2 5.2 0 013 10.25zm3.95-2.3l1.1 1.1c.44.43.46 1.1.09 1.57l-1.26 1.26-2.75-2.75 1.17-1.18c.46-.45 1.2-.45 1.65 0z" fill="currentColor"></path>
                        </svg>
                    </p>` : 
                    `<p role="link" title="Reply message" class="im-mess--reply">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                            <path fill="currentColor" d="M8.04 1.5c-.4 0-.74.17-1.02.34-.28.18-.6.43-1 .72l-4.7 3.57c-.45.34-.99.7-1.2 1.24a1.75 1.75 0 000 1.26c.2.54.73.88 1.18 1.22l4.72 3.59c.4.3.72.54 1 .72.28.17.62.35 1.02.34a1.75 1.75 0 001.35-.67c.25-.31.31-.7.34-1.02.03-.33.03-.74.03-1.23v-.9c1 .09 1.77.36 2.46.76a9.71 9.71 0 012.45 2.29.75.75 0 001.33-.48 9.2 9.2 0 00-1.57-5.5 7.56 7.56 0 00-4.67-2.87v-.46c0-.49 0-.9-.03-1.23-.03-.32-.1-.7-.34-1.02a1.75 1.75 0 00-1.35-.67z"></path>
                        </svg>
                    </p>`
                }
                <p class="chat-time mb-0">
                    <svg width="12" height="12" class="prefix__MuiSvgIcon-root prefix__jss80 prefix__MuiSvgIcon-fontSizeLarge" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                        <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
                    </svg>
                    ${ dateTime(message.date) }
                </p>
            </div>
        </div>
    </div>

    ${message.from === User._id ? '<div style="flex: 1 1 0%;"></div>' : ''}`;

    document.querySelector('[data-message-id="' + message.editId + '"]').innerHTML = message_template;
};

const typeInTextarea = (text, el) => {
    el.setRangeText(
        text,
        el.selectionStart,
        el.selectionEnd,
        'end'
    );
};

const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
};

const selectedMessages = document.querySelector('.count');

const showSelectedMessages = (type = 'add') => {
    if (type === 'add') {
        selectedMessagesContainer.classList.remove('d-none');
        selectedMessagesContainer.classList.add('d-flex');

        userStatusContainer.classList.remove('d-flex');
        userStatusContainer.classList.add('d-none');

        selectedMessages.innerText = parseInt(selectedMessages.innerText) + 1;
    } else {
        if ((parseInt(selectedMessages.innerText) - 1) <= 0) {
            selectedMessagesContainer.classList.remove('d-flex');
            selectedMessagesContainer.classList.add('d-none');
            
            userStatusContainer.classList.remove('d-none');
            userStatusContainer.classList.add('d-flex');
        }

        selectedMessages.innerText = parseInt(selectedMessages.innerText) - 1;
    }
};


addDynamicEventListener(document.body, 'click', '.clear-selected', () => {
    selectedMessages.innerText = 0;

    selectedMessagesContainer.classList.remove('d-flex');
    selectedMessagesContainer.classList.add('d-none');

    userStatusContainer.classList.remove('d-none');
    userStatusContainer.classList.add('d-flex');

    document.querySelectorAll('.selected').forEach(item => {
        item.classList.remove('selected');
    });
});

addDynamicEventListener(document.body, 'click', '.im-mess--edit', (el) => {
    const messageId = el.target.closest('.my-message').dataset.messageId;
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
});

addDynamicEventListener(document.body, 'click', '.im-mess--reply', (el) => {
    const replyMessageData = document.querySelector('.reply-message');
    const messageId = el.target.closest('.message-item').dataset.messageId;
    if (messageId) {
        const parentEl = document.querySelector('[data-message-id="' + messageId + '"]');
        const messageData = parentEl.querySelector('p.text-left');
        console.log(messageData);
        replyMessageData.style.display = '';
        replyMessageData.querySelector('.message').innerText = messageData.innerText;

        // message.value = messageData.innerText;

        // const editMessageInput = document.querySelector('.edit-message');
        // if (!editMessageInput) {
        //     const editMessageInput = document.createElement('input');
        //         editMessageInput.name = 'edit-message';
        //         editMessageInput.value = messageId;
        //         editMessageInput.type = 'hidden';
        //         editMessageInput.classList.add('edit-message');

        //     document.querySelector('.chat-input-section').appendChild(editMessageInput);
        // } else {
        //     editMessageInput.value = messageId;
        // }
    }
});


addDynamicEventListener(document.body, 'click', '.my-message', (el) => {
    if (el.target.tagName !== 'path' && !el.target.classList.contains('im-mess--edit')) {
        const parent = el.target.closest('.my-message');
        if (parent) {
            const message = parent.querySelector('.text-right');
            if (message) {
                showSelectedMessages(message.classList.contains('selected') ? 'remove' : 'add');
                message.classList.toggle('selected');
            }
        }
    }
});

const scrollEvents = () => {
    const scrolled = Math.abs((chat_container.scrollTop + chat_container.clientHeight) - chat_container.scrollHeight);
    if (scrolled < 350) {
        chat_container.scrollTop = chat_container.scrollHeight;
    }
};

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

const logoutButton = document.querySelector('.logout');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        location.href = '/logout';
    });
}