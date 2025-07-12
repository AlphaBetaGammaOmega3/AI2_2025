const db = require('../Models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = db.users;

// Idealmente, guarde esse segredo em .env
const JWT_SECRET = 'secretoforte'; 

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("Recebido login com:", req.body);

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Não remover espaços do hash — use direto
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Gera token JWT
        const token = jwt.sign(
            { id: user.iduser, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Retorna token e dados do usuário
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
