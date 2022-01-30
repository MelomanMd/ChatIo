const jsonFormatter = {
    stringify: (cipherParams) => {
        var jsonObj = {
            ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)
        };

        if (cipherParams.iv) {
            jsonObj.iv = cipherParams.iv.toString();
        }

        return JSON.stringify(jsonObj);
    },

    parse: (jsonStr) => {
        var jsonObj = JSON.parse(jsonStr);

        var cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct)
        });

        if (jsonObj.iv) {
            cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj.iv);
        }

        return cipherParams;
    }
};

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
            </div>
        </li>`;

    document.querySelector('.chat-history ul').insertAdjacentHTML(position, message_template);
};


const encrypt = (msg, pass) => {
    var salt = CryptoJS.lib.WordArray.random(128 / 8);

    var key = CryptoJS.PBKDF2(pass, salt, {
        keySize: encryption.keySize / 32,
        iterations: encryption.iterations
    });

    var iv = CryptoJS.lib.WordArray.random(128 / 8);

    var encrypted = CryptoJS.AES.encrypt(msg, key, {
      iv: iv, 
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    });

    var transitmessage = salt.toString() + iv.toString() + encrypted.toString();
    return transitmessage;
}

const decrypt = (msg, pass) => {
    var salt = CryptoJS.enc.Hex.parse(msg.substr(0, 32));
    var iv = CryptoJS.enc.Hex.parse(msg.substr(32, 32))
    var encrypted = msg.substring(64);

    var key = CryptoJS.PBKDF2(pass, salt, {
        keySize: encryption.keySize / 32,
        iterations: encryption.iterations
    });

    var decrypted = CryptoJS.AES.decrypt(encrypted, key, { 
      iv: iv, 
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    });

    return decrypted;
}