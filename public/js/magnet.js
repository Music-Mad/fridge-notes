const magnetManager = {
    //callback function to call when Manager detects changes
    _changeCallback: null,

    //Calls callback when Manager makes changes
    _notifyChange() {
        if (!this._changeCallback) return;
        this._changeCallback();
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

        const magnet = document.createElement('textarea');
        magnet.className = 'magnet';
        magnet.id = `${magnet_id}`;
        document.body.appendChild(magnet);

        magnet.style.left = `${x}px`;
        magnet.style.top = `${y}px`;
        magnet.value = content;

        this._notifyChange();
        return magnet;
    },

    update(magnet_id, {x, y, content} = {}) {
        magnet = this.get(magnet_id);
        if (magnet == null) {
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
        magnet = this.get(id);
        if (!magnet) {
            return false;
        }

        document.body.remove(manget);
        this._notifyChange();
        return true;
    }
}