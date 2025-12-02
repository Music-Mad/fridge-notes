const Resizer = {
    //tracks event listeners to be properly removed later
    _clickListeners: new Map(),

    makeResizeable(target) {
        const nw = document.createElement('div');
        const n = document.createElement('div');
        const ne = document.createElement('div');
        const e = document.createElement('div');
        const se = document.createElement('div');
        const s = document.createElement('div');
        const sw = document.createElement('div');
        const w = document.createElement('div');

        nw.classList.add('resize-handle');
        n.classList.add('resize-handle');
        ne.classList.add('resize-handle');
        e.classList.add('resize-handle');
        se.classList.add('resize-handle');
        s.classList.add('resize-handle');
        sw.classList.add('resize-handle');
        w.classList.add('resize-handle');

        nw.classList.add('handle-nw');
        n.classList.add('handle-n');
        ne.classList.add('handle-ne');
        e.classList.add('handle-e');
        se.classList.add('handle-se');
        s.classList.add('handle-s');
        sw.classList.add('handle-sw');
        w.classList.add('handle-w');

        target.appendChild(nw);
        target.appendChild(n);
        target.appendChild(ne);
        target.appendChild(e);
        target.appendChild(se);
        target.appendChild(s);
        target.appendChild(sw);
        target.appendChild(w);

        let isResizing = false;
        let handle;
        let startX;
        let startY;
        let startWidth;
        let startHeight;
        let startLeft;
        let startTop;

        const onMouseDown = (e) => {
            if (isResizing) return;
            target.classList.add('resizing');
            if (!e.target.classList.contains('resize-handle')) return;

            //get target handle
            isResizing = true;
            handle = e.target.className.split(' ')[1].replace('handle-', '');
            
            startX = e.clientX;
            startY = e.clientY;
            startWidth = target.offsetWidth;
            startHeight = target.offsetHeight;
            startLeft = target.offsetLeft;
            startTop = target.offsetTop;
        }
        const onMouseMove = (e) => {
            if (!isResizing) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            let newWidth = startWidth;
            let newHeight = startHeight;
            let newLeft = startLeft;
            let newTop = startTop;

            console.log(handle)
            if (handle.includes('e')) {
                newWidth = startWidth + dx;
            }
            if (handle.includes('w')) {
                newWidth = startWidth - dx;
                newLeft = startLeft + dx;
            }
            if (handle.includes('s')) {
                newHeight = startHeight + dy;
            }
            if (handle.includes('n')) {
                newHeight = startHeight - dy;
                newTop = startTop + dy;
            }

            target.style.width = newWidth + 'px';
            target.style.height = newHeight + 'px';
            target.style.left = newLeft + 'px';
            target.style.top = newTop + 'px';
        }
        const onMouseUp = (e) => {
            if (!isResizing) return;
            isResizing = false;
        }
        const cancelResize = (e) => {
            if (!target.classList.contains('resizing')) return;
            if (e.target.id != 'background') return;
            
            target.classList.remove('resizing');
        }
     
        target.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('mousedown', cancelResize)
    }
}