//get board code
const urlParams = new URLSearchParams(window.location.search);
const boardCode = urlParams.get('boardCode');
loadObjects(boardCode);

//color logic
let colorSelector = document.querySelector('.color-selector');
let selectedColor = "#fff475";

colorSelector.addEventListener('click', (e) => {
    if (e.target.dataset.color) {
        selectedColor = e.target.dataset.color;
    }
});

const stickyPad = document.getElementById('sticky-pad');
stickyPad.addEventListener('mousedown', async (e) => {
    const note = await NotesAPI.create(null, selectedColor, e.clientX - 180, e.clientY, 1, boardCode);
    const noteDom = StickyManager.create(null, selectedColor, e.clientX - 160, e.clientY, null, note.id);

    StickyManager.startDragging(note.id, e.clientX, e.clientY);
});
