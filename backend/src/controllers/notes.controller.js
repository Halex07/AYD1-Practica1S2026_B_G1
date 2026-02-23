let notes = [];

// Crear nota
export const createNote = (req, res) => {
    const { title, description, tag, userId } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({ message: "El título no puede estar vacío" });
    }

    const newNote = {
        id: notes.length + 1,
        title,
        description,
        tag,
        userId,
        pinned: false,
        archived: false,
        sharedWith: [],
        createdAt: new Date()
    };

    notes.push(newNote);

    res.status(201).json(newNote);
};

// Obtener notas por usuario
export const getNotes = (req, res) => {
    const { userId } = req.query;

    const userNotes = notes.filter(n => n.userId == userId);
    res.json(userNotes);
};

// Actualizar nota
export const updateNote = (req, res) => {
    const { id } = req.params;
    const { title, description, tag } = req.body;

    const note = notes.find(n => n.id == id);

    if (!note) {
        return res.status(404).json({ message: "Nota no encontrada" });
    }

    if (title && title.trim() === "") {
        return res.status(400).json({ message: "El título no puede estar vacío" });
    }

    note.title = title ?? note.title;
    note.description = description ?? note.description;
    note.tag = tag ?? note.tag;

    res.json(note);
};

// Eliminar nota
export const deleteNote = (req, res) => {
    const { id } = req.params;

    const index = notes.findIndex(n => n.id == id);

    if (index === -1) {
        return res.status(404).json({ message: "Nota no encontrada" });
    }

    notes.splice(index, 1);

    res.json({ message: "Nota eliminada correctamente" });
};

// Fijar / Desfijar nota
export const togglePin = (req, res) => {
    const { id } = req.params;

    const note = notes.find(n => n.id == id);

    if (!note) {
        return res.status(404).json({ message: "Nota no encontrada" });
    }

    note.pinned = !note.pinned;

    res.json({ message: "Estado de fijado actualizado", note });
};

// Archivar / Desarchivar nota
export const toggleArchive = (req, res) => {
    const { id } = req.params;

    const note = notes.find(n => n.id == id);

    if (!note) {
        return res.status(404).json({ message: "Nota no encontrada" });
    }

    note.archived = !note.archived;

    res.json({ message: "Estado de archivo actualizado", note });
};

// Compartir nota
export const shareNote = (req, res) => {
    const { id } = req.params;
    const { userIdToShare } = req.body;

    const note = notes.find(n => n.id == id);

    if (!note) {
        return res.status(404).json({ message: "Nota no encontrada" });
    }

    if (!userIdToShare) {
        return res.status(400).json({ message: "Debe enviar userIdToShare" });
    }

    if (!note.sharedWith.includes(userIdToShare)) {
        note.sharedWith.push(userIdToShare);
    }

    res.json({ message: "Nota compartida correctamente", note });
};
