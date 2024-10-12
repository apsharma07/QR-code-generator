const qrText = document.getElementById('qr-text');
const sizes = document.getElementById('sizes');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const qrContainer = document.querySelector('.qr-body');

let size = sizes.value;
let lastGeneratedText = '';  // To track changes in text
let lastGeneratedSize = size;  // To track changes in size

downloadBtn.disabled = true;

generateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    isEmptyInput();
});

sizes.addEventListener('change', (e) => {
    size = e.target.value;
    isEmptyInput();
});

// Handle text input changes
qrText.addEventListener('input', () => {
    if (qrText.value.trim().length === 0) {
        qrContainer.innerHTML = "";  // Clear the QR code if input is empty
        downloadBtn.disabled = true;  // Disable the download button
    } else if (qrText.value.trim() !== lastGeneratedText) {
        // Clear the old QR code and disable download if text has changed
        qrContainer.innerHTML = "";  
        downloadBtn.disabled = true;
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
        if (qrText.value.trim() !== lastGeneratedText || size !== lastGeneratedSize) {
            generateQRCode();
        } else {
            alert("QR code already generated with the same input.");
        }
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
                lastGeneratedText = qrText.value.trim();  // Store last generated text
                lastGeneratedSize = size;  // Store last generated size
            }, 'image/png');
        } else {
            downloadBtn.disabled = true;
        }
    }, 100);
}
