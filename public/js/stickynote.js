
const StickyManager = {
    //tracks event listeners so they can be properly removed
    _dragListeners: new Map(),

    create(x_position, y_position, z_index, note_id) {
        //add the note DOM element to the document
        const noteDom = document.createElement("div");
        const handle = document.createElement('div');

        noteDom.id = `${note_id}`;
        noteDom.className = "sticky-note";
        noteDom.style.position = 'absolute';
        noteDom.style.left = `${x_position}px`;
        noteDom.style.top = `${y_position}px`;
        noteDom.style.zIndex = `${z_index}`;

        handle.className = 'handle';

        noteDom.appendChild(handle);
        document.body.appendChild(noteDom);
        this.enableDragging(note_id);
        return noteDom;
    },

    get(note_id) {
        return document.getElementById(`${note_id}`);
    },

    update(note_id, {x_position, y_position, z_index} = {}) {
        const noteDom = this.get(note_id);
        if (noteDom == null) {
            return null;
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

    enableDragging(note_id) {
        const noteDom = this.get(note_id);
        if (!noteDom) return;

        const handle = noteDom.querySelector('.handle');
        if (!handle) return;   

        let isDragging = false;
        //offset variables for mouse centering
        let offsetX = 0;
        let offsetY = 0;

        const onMouseDown = (e) => {
            isDragging = true;
            handle.style.cursor = 'grabbing';

            offsetX = e.clientX - noteDom.offsetLeft;
            offsetY = e.clientY - noteDom.offsetTop;
        };
        const onMouseMove = (e) => {
            if (!isDragging) return;
            this.update(note_id, {x_position: e.clientX - offsetX, y_position: e.clientY - offsetY});
        };
        const onMouseUp = (e) => {
            if (!isDragging) return;
            isDragging = false;
            handle.style.cursor = 'grab';
        };

        handle.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        this._dragListeners.set(note_id, {
            handle,
            onMouseDown,
            onMouseMove,
            onMouseUp
        });
    },

    disableDragging(note_id) {
        const listeners = this._dragListeners.get(note_id);
        if (!listeners) return;

        const { handle, onMouseDown, onMouseMove, onMouseUp } = listeners;
        handle.removeEventListener('mousedown', onMouseDown);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        this._dragListeners.delete(note_id);
    },


    remove(note_id) {
        //retrieve note and make sure its valid
        const note = this.get(note_id);
        if (note == null) {
            return false;
        }

        this.disableDragging(note_id);
        document.body.removeChild(note);
        return true;
    }
};