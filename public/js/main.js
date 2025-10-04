/*
    MENU HANDLING
*/
let inContextMenu = false;
let contextMenu = document.getElementById("contextMenu");
let menuContainer = document.getElementById("contextMenuContainer");

function closeContextMenu() {
    if (!inContextMenu) return;

    menuContainer.style.display = "none";
    inContextMenu = false; 
    contextMenu.removeEventListener("mouseleave", closeContextMenu);
};

document.addEventListener("click", function(event) {

    if (inContextMenu) {
        closeContextMenu();
        return;
    }

    //if the user clicked on something thats no the background don't bring up context menu
    if ((event.target !== document.getElementById("background"))) return;

    //calculating position offset from menu container to avoid magic numbers
    menuContainer.style.display = "block";
    containerRect = menuContainer.getBoundingClientRect();
    menuRect = contextMenu.getBoundingClientRect();

    var offsetX = (containerRect.width - menuRect.width)/2;
    var offsetY = (containerRect.height - menuRect.height)/2;

    //place menu
    menuContainer.style.top = String(event.clientY - offsetY) + "px";
    menuContainer.style.left = String(event.clientX - offsetX) + "px";
    inContextMenu = true;

    document.getElementById("contextMenuContainer").addEventListener("mouseleave", closeContextMenu);
});

document.getElementById("stickyOption").addEventListener("click", function(event) {
    placeSticky(event);
});

document.getElementById("magnetOption").addEventListener("click", function(event) {
    placeTextBox(event);
});

/*
    STICKY NOTE HANDLING
*/

function placeSticky(event) {
    //create sticky
    var note = document.createElement("div");
    note.classList.add("stickyNote");
    note.style.top = String((event.clientY) + "px");
    note.style.left = String((event.clientX - 60) + "px");

    zIndex += 1;
    note.style.zIndex = zIndex;

    //create sticky header
    var noteHeader = document.createElement("div");
    noteHeader.classList.add("stickyHeader");
    
    //add to body
    note.appendChild(noteHeader);
    document.body.appendChild(note);

    //draggng handler for sticky header
    makeDraggable(noteHeader, note);
    makeDrawable(note);
}

/*
    Text Handling
*/

function placeTextBox(event) {

    textBox = document.createElement("div");
    textBox.contentEditable = true;
    textBox.classList.add("magnetTextBox");

    textBox.style.position = "absolute";
    textBox.style.top = event.clientY + "px";
    textBox.style.left = event.clientX + "px";

    textHandle = document.createElement("div");
    textHandle.style.top = "0px"
    textHandle.classList.add("textBoxDragHandle");

    textBox.appendChild(textHandle);
    document.body.appendChild(textBox);
    makeDraggable(textHandle, textBox);
}