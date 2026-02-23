import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import notesRoutes from './routes/notes.routes.js';


dotenv.config();

const app = express();


app.use(cors());
app.use(express.json()); 

//  Las rutas 
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);


app.get('/', (req, res) => {
    res.json({ message: "Backend funcionando correctamente 🚀" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
