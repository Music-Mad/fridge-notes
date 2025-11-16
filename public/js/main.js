
document.addEventListener('DOMContentLoaded', async function () {
    console.log('Page loaded!');
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
    MagnetManager.onChange(onStateChange);
    
    //periodically save document just in case
    setInterval(() => {
        if (hasChanges) {
            saveBoard(boardCode);
            hasChanges = false;
        }
    }, BACKUP_TIMER);
});
