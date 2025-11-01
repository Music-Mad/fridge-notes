
const StickyManager = {
    //callback function to call when Manager detects changes
    _changeCallback: null,
    //tracks event listeners so they can be properly removed
    _dragListeners: new Map(),
    _canvasListeners: new Map(),
    //tracks z-index of top sticky 
    top: 0,
    //variable for note position clamping
    boundPadding: 10,

    //Calls callback when Manager makes changes
    _notifyChange() {
        if (!this._changeCallback) return;
        this._changeCallback();
    },

    _clampPos(x, y, noteDom) {

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

    onChange(callback) {
        this._changeCallback = callback;
    },

    create(canvas_data, color, x_position, y_position, z_index, note_id) {
        //create sticky note components
        const noteDom = document.createElement("div");
        const handle = document.createElement('div');
        const canvas = document.createElement('canvas');

        //assinging class names
        noteDom.id = `${note_id}`;
        noteDom.className = "sticky-note";
        handle.className = 'handle';
        canvas.className = 'note-canvas';

        //sticky note styling
        noteDom.style.position = 'absolute';
        noteDom.style.backgroundColor = `${color}`;

        //if z_index is provided, use it and update top var
        if (z_index) {
            noteDom.style.zIndex = z_index;
            if (z_index > this.top){ 
                this.top = z_index;
            }
        } else {
            noteDom.style.zIndex = `${this.top}`;
            this.top += 1;
        }
        
        noteDom.appendChild(handle);
        noteDom.appendChild(canvas);
        document.body.appendChild(noteDom);

        //clamp position values befores setting note style
        let {x, y} = this._clampPos(x_position, y_position, noteDom);
        noteDom.style.left = `${x}px`;
        noteDom.style.top = `${y}px`;

        //adjust canvas scaling to match parent
        canvas.width = noteDom.offsetWidth;
        canvas.height = noteDom.offsetHeight - handle.offsetHeight;

        //load canvas data if it exists
        if (canvas_data) {
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.onload = () => {
                ctx.drawImage(img, 0, 0);
            }
            img.src = canvas_data;
        }

        this.enableDragging(note_id);
        this.enableDrawing(note_id);

        this._notifyChange();
        return noteDom;
    },

    get(note_id) {
        return document.getElementById(`${note_id}`);
    },

    getAll() {
        return document.getElementsByClassName('sticky-note');
    },

    getCanvasURL(note_id) {
        const noteDom = this.get(note_id);
        if (!noteDom) return;
        
        const canvas = noteDom.querySelector('.note-canvas');
        const dataURL = canvas.toDataURL('image/png');
        return dataURL;
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

        this._notifyChange();
        return noteDom;
    },

    enableDragging(note_id) {
        const noteDom = this.get(note_id);
        if (!noteDom) return;

        const handle = noteDom.querySelector('.handle');
        if (!handle) return;   

        let isDragging = false;
        let isCrumpled = false;
        //offset variables for mouse consitency
        let offsetX = 0;
        let offsetY = 0;
        //get header height for note bounding box
        const header = document.getElementById('header');
        const headerHeight = header.offsetHeight;
        const boundPadding = 10;

        //get trash can dims
        const trash = document.getElementById('trash');
        const trashRect = trash.getBoundingClientRect();


        const onMouseDown = (e) => {
            isDragging = true;
            handle.style.cursor = 'grabbing';
            noteDom.style.boxShadow = '3px 18px 16px rgba(0,0,0,0.2)';
            //update z-index to put not at top of list
            noteDom.style.zIndex = this.top;
            this.top += 1;

            //grab offset for grab consistency
            offsetX = e.clientX - noteDom.offsetLeft;
            offsetY = e.clientY - noteDom.offsetTop;

            this._notifyChange();
        };
        const onMouseMove = (e) => {
            if (!isDragging) return;
            //clamp position values to viewport
            let {x, y} = this._clampPos(e.clientX - offsetX, e.clientY - offsetY, noteDom);
            
            //update note if its over trash
            
            if (x <= trashRect.right && (y + noteDom.offsetHeight) >= trashRect.top) {
                if(!isCrumpled) {
                    trash.classList.add('hovering');
                    noteDom.classList.add('crumple');
                    //create child elements for crumple effect
                    const child = document.createElement("div");
                    child.classList.add('child');
                    noteDom.appendChild(child);
                    isCrumpled = true;
                }
            } else if (isCrumpled = true) {
                trash.classList.remove('hovering');
                noteDom.classList.remove('crumple');
                isCrumpled = false;
            }
            this.update(note_id, {x_position: x, y_position: y});

            this._notifyChange();
        };
        const onMouseUp = (e) => {
            if (!isDragging) return;
            handle.style.cursor = 'grab';
            noteDom.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
            isDragging = false;

            //clamp position values to viewport
            let {x, y} = this._clampPos(e.clientX - offsetX, e.clientY - offsetY, noteDom);
            //remove note if its over trash
            if (x <= trashRect.right && (y + noteDom.offsetHeight) >= trashRect.top) {
                this.remove(noteDom.id);
            }

            this._notifyChange();
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

    enableDrawing(note_id) {
        const noteDom = this.get(note_id);
        if (!noteDom) return;

        let canvas = noteDom.querySelector('.note-canvas');
        let ctx = canvas.getContext('2d');
        let isDrawing = false;

          
        const getCanvasCoords = (e) => {
            const rect = canvas.getBoundingClientRect();
            return {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        const onMouseDown = e => {
            isDrawing = true;
            let {x, y} = getCanvasCoords(e);
            ctx.beginPath();
            ctx.moveTo(x, y);
            this._notifyChange();
        }

        const onMouseMove = e => {
            if (!isDrawing) return;
            const rect = canvas.getBoundingClientRect();
            let {x, y} = getCanvasCoords(e);

            ctx.lineTo(x, y);
            ctx.stroke();
            this._notifyChange();
        }

        const onMouseUp = e => {
            isDrawing = false;
            this._notifyChange();
        }

        canvas.addEventListener('mousedown', onMouseDown);
        canvas.addEventListener('mousemove', onMouseMove);
        canvas.addEventListener('mouseup', onMouseUp);
        canvas.addEventListener('mouseleave', onMouseUp);

    },

    disableDrawing(note_id) {
        const listeners = this._dragListeners.get(note_id);
        if (!listeners) return;
    },

    remove(note_id) {
        //retrieve note and make sure its valid
        const note = this.get(note_id);
        if (note == null) {
            return false;
        }

        this.disableDragging(note_id);
        document.body.removeChild(note);
        NotesAPI.remove(note_id);
        this._notifyChange();
        return true;
    }
};