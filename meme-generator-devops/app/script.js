const canvas = document.getElementById('meme-canvas');
const ctx = canvas.getContext('2d');

const topTextInput = document.getElementById('top-text');
const bottomTextInput = document.getElementById('bottom-text');
const generateBtn = document.getElementById('generate-btn');
const clearBtn = document.getElementById('clear-btn');
const downloadBtn = document.getElementById('download-btn');
const thumbnails = document.querySelectorAll('.thumbnail');

let image = new Image();
// Default image
image.src = 'assets/meme1.jpg';

// Draw image initially once loaded
image.onload = () => {
    drawMeme();
};

// Handle thumbnail selection
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', (e) => {
        // Remove selected class from all
        thumbnails.forEach(t => t.classList.remove('selected'));
        // Add to clicked
        e.target.classList.add('selected');
        // Update image source
        image.src = e.target.getAttribute('data-src');
    });
});

// Generate meme function
function drawMeme() {
    // Set canvas dimensions to match image
    canvas.width = image.width;
    canvas.height = image.height;

    // Draw background image
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Text styling
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = Math.floor(canvas.width / 150); // Scale line width based on image size
    if(ctx.lineWidth < 2) ctx.lineWidth = 2; // minimum stroke width
    
    const fontSize = Math.floor(canvas.width / 10);
    ctx.font = `${fontSize}px Impact, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    // Get text
    const topText = topTextInput.value.toUpperCase();
    const bottomText = bottomTextInput.value.toUpperCase();

    // Draw Top Text
    if (topText) {
        ctx.fillText(topText, canvas.width / 2, 10);
        ctx.strokeText(topText, canvas.width / 2, 10);
    }

    // Draw Bottom Text
    if (bottomText) {
        ctx.textBaseline = 'bottom';
        ctx.fillText(bottomText, canvas.width / 2, canvas.height - 10);
        ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 10);
    }
}

// Event Listeners
generateBtn.addEventListener('click', drawMeme);

clearBtn.addEventListener('click', () => {
    topTextInput.value = '';
    bottomTextInput.value = '';
    drawMeme();
});

downloadBtn.addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = dataURL;
    link.click();
});
