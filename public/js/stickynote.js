
const StickyManager = {
    async create(content, x_position, y_position, z_index, board_id) {
        //create note in table and makes sure operation was successful
        const note =  await NotesAPI.create(content, x_position, y_position, z_index, board_id);
        if (note == null) {
            return null;
        }

        //add the note DOM element to the document
        const noteDom = document.createElement("div");
        const noteContent = document.createElement('div');

        noteDom.id = `${note.id}`;
        noteDom.className = "sticky-note";
        noteDom.style.position = 'absolute';
        noteDom.style.left = `${x_position}px`;
        noteDom.style.top = `${y_position}px`;
        noteDom.style.zIndex = `${z_index}`;

        noteContent.className = 'sticky-content';
        noteContent.textContent = content;

        noteDom.appendChild(noteContent);
        document.body.appendChild(noteDom);
        return noteDom;
    },

    async get(note_id) {
        return document.getElementById(`${note_id}`);
    },

    async update(note_id, {content, x_position, y_position, z_index, board_id} = {}) {
        const noteDom = await this.get(note_id);
        if (noteDom == null) {
            return null;
        }
        //reconstruct updates into object for API handling
        const updates = {
            content: content,
            x_position: x_position,
            y_position: y_position,
            z_index: z_index,
            board_id: board_id
        }
        NotesAPI.update(note_id, updates);
        
        if (content !== undefined) {
            noteDom.querySelector('.sticky-content').textContent = content;
        }
        if (x_position !== undefined)
        {
            noteDom.style.left = x_position + 'px';
        }
        if (y_position !== undefined) {
            noteDom.style.top = y_position + 'px';
        } 
        if (z_index !== undefined) {
            noteDom.style.zIndex = z_index;
        } 

        return noteDom;
    },

    async remove(note_id) {
        //retrieve note and make sure its valid
        const note = await this.get(note_id);
        if (note == null) {
            return false;
        }

        document.body.removeChild(note);
        await NotesAPI.remove(note_id);
        return true;
    }
};