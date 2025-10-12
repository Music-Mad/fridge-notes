
document.addEventListener('DOMContentLoaded', async function () {
    console.log('Page loaded!');

    const urlParams = new URLSearchParams(window.location.search);
    const boardCode = urlParams.get('boardCode');
    loadObjects(boardCode);
});

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('handle')) {
        
    }
});