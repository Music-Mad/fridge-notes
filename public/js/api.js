const NotesAPI = {
    baseURL: '/api/notes',

    async create(content, x_position, y_position, z_position, board_id) {
        const response = await fetch(this.baseURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                content: content,
                x_position: x_position,
                y_position: y_position,
                z_index: z_position,
                board_id: board_id
            })
        });
        return response.json();
    },

    async get(noteId) {
        const response = await fetch(`${this.baseURL}/${noteId}`);
        return response.json();
    },

    async update(noteId, updates) {
        const response = await fetch(`${this.baseURL}/${noteId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application.json'},
            body: JSON.stringify(updates)
        });
        return response.json();
    }
};