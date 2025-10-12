
const StickyManager = {
    async create(content, x_position, y_position, z_index, note_id) {
        //add the note DOM element to the document
        const noteDom = document.createElement("div");
        const noteContent = document.createElement('div');

        noteDom.id = `${note_id}`;
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

    async update(note_id, {content, x_position, y_position, z_index} = {}) {
        const noteDom = await this.get(note_id);
        console.log(noteDom);
        if (noteDom == null) {
            return null;
        }
        
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
        return true;
    }
};