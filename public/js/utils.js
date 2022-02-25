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
    const message_template = `<div class="d-flex message-item" data-message-id="${message.id}">
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

const showSelectedMessages = (type = 'add') => {
    const selectedMessages = document.querySelector('.count');
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