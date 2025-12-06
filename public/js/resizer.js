const Resizer = {
    //tracks event listeners to be properly removed later
    _clickListeners: new Map(),

    enableResizing(target) {
        //Add resize handle elements to target
        ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'].forEach(position => {
            const handle = document.createElement('div');
            handle.classList.add('resize-handle');
            handle.classList.add(`handle-${position}`);
            target.appendChild(handle);
        });

        let isResizing = false;
        const MIN_WIDTH = 50;
        const MIN_HEIGHT = 50;
        let handle;
        let startX;
        let startY;
        let startWidth;
        let startHeight;
        let startLeft;
        let startTop;

        const onMouseDown = (e) => {
            //logic for managing when resize handles appear and disapear
            if (isResizing) return;
            if (target.classList.contains('resizing')) {
                if (!e.target.classList.contains('resize-handle')) {
                    cancelResize();
                    return;
                }
            }
            e.stopPropagation();
            target.classList.add('resizing');
            //exit if not using resize handle
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

            //clamp width and height values and lock position changing
            if (newWidth < MIN_WIDTH) {
                newWidth = MIN_WIDTH;
                if (handle.includes('w')) {
                    newLeft = startLeft + startWidth - MIN_WIDTH; 
                }
            }
            if (newHeight < MIN_HEIGHT) {
                newHeight = MIN_HEIGHT;
                if (handle.includes('n')) {
                    newTop = startTop + startHeight - MIN_HEIGHT;
                }
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
            //if (!target.classList.contains('resizing')) return;
            target.classList.remove('resizing');
        }
     
        target.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('mousedown', cancelResize)

        this._clickListeners.set(target.id, {
            target,
            onMouseDown,
            onMouseMove,
            onMouseUp,
            cancelResize
        });
    },

    disableResizing(target_id) {
        const listeners = this._clickListeners.get(target_id);
        if (!listeners) return;
        
        const {target, onMouseDown, onMouseMove, onMouseUp, cancelResize} = listeners;

        //looping backwards to avoid skipping children
        for (let i = target.children.length - 1; i >= 0; i--) {
            if (target.children[i].classList.contains('resize-handle')) {
                target.children[i].remove();
            }
        }

        target.removeEventListener('mousedown', onMouseDown);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousedown', cancelResize);
        this._clickListeners.delete(target.id);
    }
}