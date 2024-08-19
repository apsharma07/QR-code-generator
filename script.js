const qrText = document.getElementById('qr-text');
const sizes = document.getElementById('sizes');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const qrContainer = document.querySelector('.qr-body');

let size = sizes.value;

downloadBtn.disabled = true;

generateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    isEmptyInput();
});

sizes.addEventListener('change', (e) => {
    size = e.target.value;
    isEmptyInput();
});

qrText.addEventListener('input', () => {
    if (qrText.value.trim().length === 0) {
        downloadBtn.disabled = true; 
        qrContainer.innerHTML = ""; 
    }
});

downloadBtn.addEventListener('click', (e) => {
    const img = document.querySelector('.qr-body img');
    if (!img) {
        e.preventDefault(); 
        alert("No QR code generated to download");
    }
});

function isEmptyInput() {
    if (qrText.value.trim().length > 0) {
        generateQRCode();
    } else {
        alert("Enter the text or URL to generate your QR code");
    }
}

function generateQRCode() {
    qrContainer.innerHTML = ""; 
    new QRCode(qrContainer, {
        text: qrText.value,
        height: parseInt(size),
        width: parseInt(size),
        colorLight: "#fff",
        colorDark: "#000",
});

setTimeout(() => {
    const canvas = document.querySelector('.qr-body canvas');
    if (canvas) {
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            downloadBtn.disabled = false;
            downloadBtn.setAttribute("href", url);
            downloadBtn.setAttribute("download", "qrcode.png");
        }, 'image/png');
    } else {
        downloadBtn.disabled = true;
    }
}, 100);
}

