
const StickyManager = {
    //tracks event listeners so they can be properly removed
    _dragListeners: new Map(),
    //tracks z-index of top sticky 
    top: 0,
    //variables for note position clamping
    boundPadding: 10,
    
    create(color, x_position, y_position, note_id) {
        //add the note DOM element to the document
        const noteDom = document.createElement("div");
        const handle = document.createElement('div');

        noteDom.id = `${note_id}`;
        noteDom.className = "sticky-note";
        noteDom.style.position = 'absolute';
        noteDom.style.backgroundColor = `${color}`;
        noteDom.style.zIndex = `${this.top}`;
        this.top += 1;
        
        handle.className = 'handle';

        noteDom.appendChild(handle);
        document.body.appendChild(noteDom);

        //clamp position values befores setting note style
        let {x, y} = this.clampPos(x_position, y_position, noteDom);
        noteDom.style.left = `${x}px`;
        noteDom.style.top = `${y}px`;

        this.enableDragging(note_id);
        return noteDom;
    },

    get(note_id) {
        return document.getElementById(`${note_id}`);
    },

    update(note_id, {color, x_position, y_position, z_index} = {}) {
        const noteDom = this.get(note_id);
        if (noteDom == null) {
            return null;
        }
        
        if (color !== undefined) {
            noteDom.style.backgroundColor = `{color}`;
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
        //offset variables for mouse consitency
        let offsetX = 0;
        let offsetY = 0;
        //get header height for note bounding box
        const header = document.getElementById('header');
        const headerHeight = header.offsetHeight;
        
        const boundPadding = 10;

        const onMouseDown = (e) => {
            isDragging = true;
            handle.style.cursor = 'grabbing';
            //update z-index to put not at top of list
            noteDom.style.zIndex = this.top;
            this.top += 1;

            //grab offset for grab consistency
            offsetX = e.clientX - noteDom.offsetLeft;
            offsetY = e.clientY - noteDom.offsetTop;
        };
        const onMouseMove = (e) => {
            if (!isDragging) return;
            //clamp position values to viewport
            let {x, y} = this.clampPos(e.clientX - offsetX, e.clientY - offsetY, noteDom);
            
            this.update(note_id, {x_position: x, y_position: y});
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

    startDragging(note_id, x, y) {
        const listeners = this._dragListeners.get(note_id);
        if (!listeners) return;

        const {handle} = listeners;

        const mouseDownEvent = new MouseEvent('mousedown', {
            clientX: x,
            clientY: y
        });
        handle.dispatchEvent(mouseDownEvent);
    },

    clampPos(x, y, noteDom) {

        const noteWidth = noteDom.offsetWidth;
        const noteHeight = noteDom.offsetHeight;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight; 

        const header = document.getElementById('header');
        const headerHeight = header.offsetHeight;
        
        x = Math.max(0 + this.boundPadding, Math.min(viewportWidth - noteWidth - this.boundPadding, x));

        y = Math.max(headerHeight + this.boundPadding, Math.min(viewportHeight - noteHeight - this.boundPadding, y));
        return {x, y};
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