async function loadObjects(board_id) {
    const notes = await NotesAPI.getByBoard(board_id);
    if (notes == null) {
        return;
    }
    
    for (var i = 0; i < notes.length; i++) {
        StickyManager.create(notes[i].canvas, '#fff475',notes[i].x_position, notes[i].y_position, notes[i].z_index, notes[i].id);
    }
};

async function saveBoard(board_id) {
    notes = StickyManager.getAll();
    if (notes == null) {
        return;
    }

    for (var i = 0; i < notes.length; i++) {
        NotesAPI.update(notes[i].id, {
            canvas: StickyManager.getCanvasURL(notes[i].id), 
            x_position: parseInt(notes[i].style.left), 
            y_position: parseInt(notes[i].style.top),
            z_index: notes[i].style.zIndex
        });
    }
};