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
    const message_template = `<li class="clearfix">
            <div class="message-data  ${me ? 'align-right' : ''}">
            <span class="message-data-time" >${ !loaded ? dateTime(message.date) : message.created}</span>
            <span class="message-data-name" >${ !loaded ? message.username : message.user.username}</span> <i class="fa fa-circle me"></i>
            </div>
            <div class="message ${me ? 'other-message float-right' : 'my-message'}">
                ${message.message}

                ${message.image ? '<div class="message-image"><img src="' + message.image + '" width="200px" /></div>' : ''}
            </div>
        </li>`;

    document.querySelector('.chat-history ul').insertAdjacentHTML(position, message_template);
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
}