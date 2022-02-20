const imageDiv = document.querySelector('.attachment');
const image = document.getElementById('attachment');
if (image) {
    image.addEventListener('change', (e) => {
        var input = e.target;
        var reader = new FileReader();
    
        reader.onload = () => {
            var dataURL = reader.result;
            var output = document.querySelector('.attached-files');
            if (document.getElementById('preview')) {
                document.getElementById('preview').src = dataURL;
            } else {
                const img = document.createElement('img');
                img.id = 'preview';
                img.attributeStyleMap.set('max-width', '80px');
                img.src = dataURL;
                output.appendChild(img);
            }
            imageDiv.style.display = '';
        };
        reader.readAsDataURL(input.files[0]);
    });
}

const clearFile = document.querySelector('.clear-file');
clearFile.addEventListener('click', () => clearFileInput());

const clearFileInput = () => {
    if (image.value) {
        image.value = '';
        if (document.getElementById('preview')) {
            document.getElementById('preview').remove();
        }
        imageDiv.style.display = 'none';
    }
};