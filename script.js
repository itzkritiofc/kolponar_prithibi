function handleFiles(files) {
    const preview = document.getElementById('preview');
    preview.innerHTML = ''; 

    if (files.length > 0) {
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const previewItem = document.createElement('div');
                previewItem.classList.add('preview-item');
                
                const img = document.createElement('img');
                img.src = e.target.result;

                const caption = document.createElement('div');
                caption.classList.add('caption');
                caption.textContent = document.getElementById('caption').value;

                previewItem.appendChild(img);
                previewItem.appendChild(caption);

                preview.appendChild(previewItem);
            };
            reader.readAsDataURL(file);
        });
    }
}

function uploadImage() {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;
    const galleryContainer = document.getElementById('galleryContainer');
    const captionText = document.getElementById('caption').value;

    if (files.length === 0) {
        alert('Please select a file to upload.');
        return;
    }

    // Clear previous gallery items
    galleryContainer.innerHTML = '';

    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');
            
            const img = document.createElement('img');
            img.src = e.target.result;

            const caption = document.createElement('div');
            caption.classList.add('caption');
            caption.textContent = captionText;

            galleryItem.appendChild(img);
            galleryItem.appendChild(caption);

            galleryContainer.appendChild(galleryItem);
        };
        reader.readAsDataURL(file);
    });

    // Clear file input and caption after upload
    fileInput.value = '';
    document.getElementById('caption').value = '';
}
