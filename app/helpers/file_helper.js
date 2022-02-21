const fs = require('fs');
const path = require('path');

const saveFile = (data) => {
    const buffer = Buffer.from(data.file);
	fs.createWriteStream('public/uploads/' + data.filename).write(buffer);
};

module.exports = {
    saveFile
};