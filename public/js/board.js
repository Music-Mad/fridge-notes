async function loadObjects(board_id) {
    const notes = await NotesAPI.getByBoard(board_id);
    if (notes == null) {
        return;
    }
    
    for (var i = 0; i < notes.length; i++) {
        StickyManager.create(notes[i].x_position, notes[i].y_position, notes[i].z_index, notes[i].id);
    }
}