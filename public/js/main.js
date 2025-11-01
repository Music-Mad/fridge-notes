
document.addEventListener('DOMContentLoaded', async function () {
    console.log('Page loaded!');
    //get board code
    const urlParams = new URLSearchParams(window.location.search);
    const boardCode = urlParams.get('boardCode');
    loadObjects(boardCode);

    //Updates board if no changes are made within 3 seconds
    let hasChanges = false;
    let saveTimeout;
    const SAVE_DELAY = 3000;
    const BACKUP_TIMER = 15000;

    function onStateChange() {
        hasChanges = true;
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
            saveBoard(boardCode);
            hasChanges = false;
        }, SAVE_DELAY);
    }
    StickyManager.onChange(onStateChange);

    //periodically save document just in case
    setInterval(() => {
        if (hasChanges) {
            console.log('backupsave')
            saveBoard(boardCode);
            hasChanges = false;
        }
    }, BACKUP_TIMER);


    const stickyPad = document.getElementById('sticky-pad');
    stickyPad.addEventListener('mousedown', async (e) => {
        const note = await NotesAPI.create(null, '#fff475', e.clientX - 180, e.clientY, 1, boardCode);
        const noteDom = StickyManager.create(null, '#fff475', e.clientX - 160, e.clientY, null, note.id);

        StickyManager.startDragging(note.id, e.clientX, e.clientY);
    });





});
