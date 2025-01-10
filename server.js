const express = require('express');
const cors = require('cors');
const passport = require('./config/passport');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const sequelize = require('./config/database');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: 'https://clicksy.vercel.app',
  credentials: true,
}));
app.use(express.json());
app.use(passport.initialize());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Sincronizzazione del database
sequelize.sync().then(() => {
  console.log('Database sincronizzato');
}).catch(err => {
  console.error('Errore di sincronizzazione del database:', err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server avviato sulla porta ${PORT}`);
});