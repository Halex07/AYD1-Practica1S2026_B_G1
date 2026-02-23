import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

let users = []; // Simulación temporal (luego tu compañero conecta DB)

export const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const userExists = users.find(u => u.username === username);
        if (userExists) {
            return res.status(400).json({ message: "Usuario ya existe" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            id: users.length + 1,
            username,
            password: hashedPassword
        };

        users.push(newUser);

        res.status(201).json({ message: "Usuario registrado correctamente" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error en el registro" });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            "SECRET_KEY",
            { expiresIn: "1h" }
        );

        res.json({ message: "Login exitoso", token });

    } catch (error) {
        res.status(500).json({ message: "Error en el login" });
    }
};
