const NotesAPI = {
    baseURL: '/api/notes',

    async get(noteId) {
        const response = await fetch(`${this.baseURL}/${noteId}`);
        return response.json();
    },

    async getByBoard(board_id) {
        const response = await fetch(`/api/boards/${board_id}/notes`);
        return response.json();
    }, 

    async create(canvas, color, x_position, y_position, width, height, z_index, board_id) {
        const response = await fetch(this.baseURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                canvas: canvas,
                color: color,
                x_position: x_position,
                y_position: y_position,
                width: width,
                height: height,
                z_index: z_index,
                board_id: board_id
            })
        });
        return response.json();
    },

    async update(noteId, updates) {
        const response = await fetch(`${this.baseURL}/${noteId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updates)
        });
        return response.json();
    },

    async remove(noteId) {        
        const response = await fetch(`${this.baseURL}/${noteId}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json}'},
        });
        
        if (response.ok) {
            return true;
        } else {
            return false;
        }
    }
};