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

const appendZero = (obj) => {
    if (obj < 10)  {
        return '0' + obj;
    }
    return obj;
};

module.exports = {
    dateTime: (time) => {
        var time = new Date(time);
        var hours = time.getHours();
            hours = appendZero(hours);

        var min = time.getMinutes();
            min = appendZero(min);
    
        var seconds = time.getSeconds();
            seconds = appendZero(seconds);
    
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
    }
};