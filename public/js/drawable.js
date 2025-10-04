let isDrawing = false;
let canvas = null;
let ctx = null;

function makeDrawable(targetElement) {
    canvas = document.createElement("canvas");
    canvas.classList.add("drawable");

    //get element dims
    rect = targetElement.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height - 15;
    canvas.style.width = rect.width;
    canvas.style.height = rect.height - 15;
     

    targetElement.appendChild(canvas);

    canvas.addEventListener("mousedown", function(event) {
        if (isDrawing) return;
        isDrawing = true;
        canvas = event.target;
        ctx = canvas.getContext("2d");

        ctx.moveTo(event.clientX, event.clientY);
        ctx.beginPath();
    });

    canvas.addEventListener("mousemove", function(event) {
        if (!isDrawing) return;
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
    });

    canvas.addEventListener("mouseleave", function(event) {
        if (!isDrawing) return;

        isDrawing = false;
        canvas = null;
        ctx = null;
    });

    document.addEventListener("mouseup", function(event) {
        if (!isDrawing) return;

        isDrawing = false;
        canvas = null;
        ctx = null;
    });
}