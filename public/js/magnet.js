const MagnetManager = {
    //callback function to call when Manager detects changes
    _changeCallback: null,
    //tracks event listeners so they can be properly removed
    _dragListeners: new Map(),
    //variable for note position clamping
    boundPadding: 10,

    //Calls callback when Manager makes changes
    _notifyChange() {
        if (!this._changeCallback) return;
        this._changeCallback();
    },

     _clampPos(x, y, dom) {
        const width = dom.offsetWidth;
        const height = dom.offsetHeight;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight; 

        const header = document.getElementById('header');
        const headerHeight = header.offsetHeight;
        
        x = Math.max(0 + this.boundPadding, Math.min(viewportWidth - width - this.boundPadding, x));
        y = Math.max(headerHeight + this.boundPadding, Math.min(viewportHeight - height - this.boundPadding, y));
        return {x, y};
    },

    onChange(callback) {
        this._changeCallback = callback;
    },

    get(id) {
        return document.getElementById(`${id}`);
    },

    getAll() {
        return document.getElementsByClassName('magnet');
    },

    create(x, y, content, magnet_id) {
        //return if magnet already exists
        if (this.get(magnet_id)) {
            return null;
        }

        const magnet = document.createElement('div');
        const handle = document.createElement('div');
        const textarea = document.createElement('textarea');

        magnet.id = `${magnet_id}`;
        magnet.className = 'magnet';
        handle.className = 'handle';

        magnet.style.width = '200px';
        magnet.style.height = '100px';

        magnet.appendChild(handle);
        magnet.appendChild(textarea);
        document.body.appendChild(magnet);

        magnet.style.left = `${x}px`;
        magnet.style.top = `${y}px`;
        textarea.value = content;

        this.enableDragging(magnet_id);
        this._notifyChange();
        return magnet;
    },

    update(magnet_id, {x, y, content} = {}) {
        let magnet = this.get(magnet_id);
        if (!magnet) {
            return null;
        }

        if (x !== undefined) {
            magnet.style.left = `${x}px`
        }
        if (y !== undefined) {
            magnet.style.top = `${y}px`;
        }
        if (content !== undefined) {
            magnet.value = content;
        }

        this._notifyChange();
        return magnet;
    },
     
    remove(id) {
        let magnet = this.get(id);
        if (!magnet) {
            return false;
        }

        document.body.removeChild(magnet);
        this._notifyChange();
        return true;
    },

    enableDragging(id) {
        let target = this.get(id);
        if (!target) return;
        const handle = target.querySelector('.handle');
        if (!handle) return;


        let isDragging = false;
        let isCrumpled = false;
        //offset variables for mouse consitency
        let offsetX = 0;
        let offsetY = 0;
        //get trash can dims
        const trash = document.getElementById('trash');
        const trashRect = trash.getBoundingClientRect();

        
        const onMouseDown = (e) => {
            isDragging = true;
            handle.style.cursor = 'grabbing';
            target.style.boxShadow = '3px 18px 16px rgba(0,0,0,0.2)';

            //grab offset for grab consistency
            offsetX = e.clientX - target.offsetLeft;
            offsetY = e.clientY - target.offsetTop;

            this._notifyChange();
        };

        const onMouseMove = (e) => {
            if (!isDragging) return;
            //clamp position values to viewport
            let {x, y} = this._clampPos(e.clientX - offsetX, e.clientY - offsetY, target);
            //update if its over trash
            if (x <= trashRect.right && (y + target.offsetHeight) >= trashRect.top) {
                if(!isCrumpled) {
                    trash.classList.add('hovering');
                    target.classList.add('crumple');
                    isCrumpled = true;
                }
            } else if (isCrumpled = true) {
                trash.classList.remove('hovering');
                target.classList.remove('crumple');
                isCrumpled = false;
            }
            this.update(id, {x: x, y: y});
            this._notifyChange();
        };

        const onMouseUp = (e) => {
            if (!isDragging) return;
            handle.style.cursor = 'grab';
            target.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
            isDragging = false;

            //return trash can to original state on deletion
            if(isCrumpled) {
                trash.classList.remove('hovering');
                target.classList.remove('crumple');
                isCrumpled = false;
            }
        
            //clamp position values to viewport
            let {x, y} = this._clampPos(e.clientX - offsetX, e.clientY - offsetY, target);
            //remove note if its over trash
            if (x <= trashRect.right && (y + target.offsetHeight) >= trashRect.top) {
                this.remove(target.id);
            }
            this._notifyChange();
        };

        handle.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        this._dragListeners.set(id, {
            handle,
            onMouseDown,
            onMouseMove,
            onMouseUp
        });
    },

    disableDragging(id) {
        const listeners = this._dragListeners.get(id);
        if (!listeners) return;

        const { handle, onMouseDown, onMouseMove, onMouseUp } = listeners;
        handle.removeEventListener('mousedown', onMouseDown);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        this._dragListeners.delete(note_id);
    },

    startDragging(id, x, y) {
        const listeners = this._dragListeners.get(id);
        if (!listeners) return;

        const {handle} = listeners;

        const mouseDownEvent = new MouseEvent('mousedown', {
            clientX: x,
            clientY: y
        });
        handle.dispatchEvent(mouseDownEvent);
    },

}