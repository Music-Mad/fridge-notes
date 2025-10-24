
document.addEventListener('DOMContentLoaded', async function () {
    console.log('Page loaded!');

    const urlParams = new URLSearchParams(window.location.search);
    const boardCode = urlParams.get('boardCode');
    loadObjects(boardCode);

    const stickyPad = document.getElementById('sticky-pad');
    stickyPad.addEventListener('mousedown', async (e) => {
        const note = await NotesAPI.create(null, '#fff475', e.clientX - 180, e.clientY, 1, boardCode);
        const noteDom = StickyManager.create(null, '#fff475', e.clientX - 160, e.clientY, note.id);
        StickyManager.startDragging(note.id, e.clientX, e.clientY);
    });

    //update loop
    const intervalId = setInterval(async () => {
        console.log('Updating');
        notes = StickyManager.getAll();
        if (notes == null) {
            return;
        }
    
        for (var i = 0; i < notes.length; i++) {
            NotesAPI.update(notes[i].id, {x_position: parseInt(notes[i].style.left), y_position: parseInt(notes[i].style.top)});
        }
        
    }, 1000);
});
