// controllers/authController.js
const db = require('../Models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = db.users;

// Idealmente, use dotenv para guardar o segredo
const JWT_SECRET = 'secretoforte'; // 🔐 Em produção, coloque em .env

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("Recebido login com:", req.body);

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Remove espaços em branco da senha do banco (caso tenha sido salva com padding)
        const hashLimpo = user.password.trim();

        const isPasswordValid = await bcrypt.compare(password, hashLimpo);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Geração do token JWT
        const token = jwt.sign(
            { id: user.iduser, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Envia o token e alguns dados do usuário
        return res.json({
            token,
            user: {
                iduser: user.iduser,
                email: user.email,
                idtipouser: user.idtipouser
            }
        });

    } catch (error) {
        console.error("Erro no login:", error);

        return res.status(500).json({ message: 'Erro no login', error: error.message });
    }
};
