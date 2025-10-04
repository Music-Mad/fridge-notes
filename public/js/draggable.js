let zIndex = 500;
let element = null;
let isDragging = false;
let grabOffsetX, grabOffsetY = 0;

function makeDraggable(handle, targetElement) {


    handle.addEventListener("mousedown", function(event) {
        if (isDragging) return;

        element = targetElement;
        //z ordering to place sticky on top
        zIndex += 1;
        element.style.zIndex = zIndex;

        grabOffsetX = event.clientX - parseInt(element.style.left);
        grabOffsetY = event.clientY - parseInt(element.style.top);

        element.classList.add("dragging");
        element.style.transition = "box-shadow 0.25s ease, transform 0.25s ease"
        isDragging = true;
        document.body.style.cursor = "grab";
    })

    document.addEventListener("mouseup", function(event) {
        if (!isDragging) return;

        element.classList.remove("dragging");
        
        isDragging = false;
        element = null;
        grabOffsetX = 0;
        grabOffsetY = 0;

        document.body.style.cursor = "default";
    });

    document.addEventListener("mousemove", function(event) {
        if (!isDragging) return;

        element.style.left = String(event.clientX - grabOffsetX) + "px";
        element.style.top = String(event.clientY - grabOffsetY) + "px";
    });

};