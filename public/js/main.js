
document.addEventListener('DOMContentLoaded', async function () {
    console.log('Page loaded!');

    const urlParams = new URLSearchParams(window.location.search);
    const boardCode = urlParams.get('boardCode');
    loadObjects(boardCode);

    const stickyPad = document.getElementById('sticky-pad');
    stickyPad.addEventListener('mousedown', async (e) => {
        const note = await NotesAPI.create('#fff475', e.clientX - 180, e.clientY, 1, boardCode);
        const noteDom = StickyManager.create(e.clientX - 160, e.clientY, note.id);
        StickyManager.startDragging(note.id, e.clientX, e.clientY);
    });
});
