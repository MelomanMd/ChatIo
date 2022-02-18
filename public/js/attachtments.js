const image = document.getElementById('attachment');
image.addEventListener('change', (e) => {
    var input = e.target;
    var reader = new FileReader();

    reader.onload = () => {
        var dataURL = reader.result;
        var output = document.querySelector('.attached-files');
        var preview = document.getElementById('preview');
        if (preview) {
            preview.src = dataURL;
        } else {
            const img = document.createElement('img');
            img.id = 'preview';
            img.attributeStyleMap.set('max-width', '40px');
            img.src = dataURL;
            output.appendChild(img);
        }
    };
    reader.readAsDataURL(input.files[0]);
});