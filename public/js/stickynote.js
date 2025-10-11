async function createNote(content, x_position, y_position, z_index, board_id) {
    const note = document.createElement("div");
    const textContent = document.createElement('div');

    note.className = "sticky-note";
    note.style.position = 'absolute';
    note.style.left = `${x_position}px`;
    note.style.top = `${y_position}px`;
    note.style.zIndex = `${z_index}`;

    textContent.className = 'sticky-content';
    textContent.textContent = content;
    textContent.style.minHeight = '150px';
    textContent.style.textAlign = 'center';

    note.appendChild(textContent);
    document.body.appendChild(note);
    return await NotesAPI.create(content, x_position, y_position, z_index);
};

function remove(content, x_position, y_position, z_index, board_id) {

};