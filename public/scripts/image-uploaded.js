const imagePickerElement = document.getElementById('image');
const imagePreviewElement = document.querySelector('#image-upload-control img');


function updateImage(){
    const files = imagePickerElement.files;
    if(!files || files.length === 0){
        imagePreviewElement.computedStyleMap.display='none';
        return;
    }
    const pickedFile = files[0];
    imagePreviewElement.src = URL.createObjectURL(pickedFile);
    imagePreviewElement.style.display = 'flex';
}

imagePickerElement.addEventListener('change',updateImage);