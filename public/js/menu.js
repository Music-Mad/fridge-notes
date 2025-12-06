//get board code
const urlParams = new URLSearchParams(window.location.search);
const boardCode = urlParams.get('boardCode');
loadObjects(boardCode);

//color logic
let colorSelector = document.querySelector('.color-selector');
let selectedColor = "#fff475";

colorSelector.addEventListener('click', (e) => {
    const colorDiv = e.target.closest('[data-color]');

    if (e.target.dataset.color && colorDiv) {
        //remove selected class from previous item
        colorSelector.querySelectorAll('[data-color]').forEach(div => {
            div.classList.remove('selected');
        });

        colorDiv.classList.add('selected');
        selectedColor = e.target.dataset.color;
    }
});

//Drawing thickness
let pencilSelector = document.querySelector('.pencil-selector');
let selectedPencil = 3;

pencilSelector.addEventListener('click', (e) => {
    const pencilDiv = e.target.closest('[data-weight]');
    if (e.target.dataset.weight && pencilDiv) {
        //remove previously selected
        pencilSelector.querySelectorAll('[data-weight]').forEach(div => {
            div.classList.remove('selected');
        });

        pencilDiv.classList.add('selected');
        selectedPencil = e.target.dataset.weight;
        StickyManager.lineThickness = selectedPencil;
    }
})

//object creation
const stickyPad = document.getElementById('sticky-pad');
stickyPad.addEventListener('mousedown', async (e) => {
    const note = await NotesAPI.create(null, selectedColor, e.clientX - 180, e.clientY, 1, boardCode);
    const noteDom = StickyManager.create(null, selectedColor, e.clientX - 160, e.clientY, null, note.id);

    StickyManager.startDragging(note.id, e.clientX, e.clientY);
    Resizer.enableResizing(noteDom);
});

document.addEventListener('dblclick', async (e) => {
    MagnetManager.create(e.clientX, e.clientY, 'Start Typing Here...', 1);
});

