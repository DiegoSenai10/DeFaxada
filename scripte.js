// Seletores
const profileImage = document.getElementById('profileImage');
const fileInput = document.getElementById('fileInput');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const openCamera = document.getElementById('openCamera');
const capture = document.getElementById('capture');

// Upload de imagem
fileInput.addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        profileImage.src = e.target.result;
    };

    reader.readAsDataURL(file);
});

// Abrir câmera
openCamera.addEventListener('click', function () {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            video.srcObject = stream;
            video.style.display = 'block';
            capture.style.display = 'block';
        })
        .catch(function (error) {
            console.error("Erro ao acessar a câmera: ", error);
        });
});

// Capturar foto
capture.addEventListener('click', function () {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/png');
    profileImage.src = dataUrl;

    video.style.display = 'none';
    capture.style.display = 'none';
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop()); // Parar a câmera
});