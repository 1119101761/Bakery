const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const multer = require('multer');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://127.0.0.1:27017/Bakery');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Koneksi Ke MongoDB Gagal:'));
db.once('open', function () {
  console.log('Sukses Terkoneksi Ke MongoDb');
});

// User
const UserSchema = new mongoose.Schema({
  email: String,
  kataSandi: String,
});

const User = mongoose.model('User', UserSchema);

//Registrasi
app.post('/api/registrasi', async (req, res) => {
  try {
    const { email, kataSandi } = req.body;

    const user = new User({
      email,
      kataSandi,
    });

    await user.save();

    res.status(201).json({ message: 'Pendaftaran berhasil' });
  } catch (error) {
    console.error('Pendaftaran gagal:', error);
    res.status(500).json({ message: 'Pendaftaran gagal' });
  }
});

//Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, kataSandi } = req.body;

    const user = await User.findOne({ email, kataSandi });

    if (user){
      res.status(200).json({ message: 'Login berhasil', userData: user });
    } else {
      res.status(401).json({ message: 'Login gagal' });
    }
  } catch (error) {
    console.error('Kesalahan saat login:', error);
    res.status(500).json({ message: 'Login gagal' });
  }
});

const menuSchema = new mongoose.Schema({
  nama: String,
  harga: Number,
  image: String,
});

const Menu = mongoose.model('Menu', menuSchema);
const storage = multer.memoryStorage();
const upload = multer({ storage });

//Menambahkan Menu
app.post('/api/menu', upload.single('image'), async (req, res) => {
  try {
    const { nama, harga } = req.body;
    const image = req.file;

    const menu = new Menu({
      nama,
      harga,
      image: image.buffer.toString('base64'),
    });

    await menu.save();

    res.status(200).json({ message: 'Menu berhasil ditambahkan' });
  } catch (error) {
    console.error('Gagal menambahkan menu:', error);
    res.status(500).json({ message: 'Gagal menambahkan menu' });
  }
});

//Menampilkan Menu
app.get('/api/menu', async (req, res) => {
  try {
    const menus = await Menu.find({});
    const formattedMenus = menus.map((menu) => ({
      nama: menu.nama,
      harga: menu.harga,
      image: menu.image,
    }));
    res.status(200).json(formattedMenus);
  } catch (error) {
    console.error('Gagal mengambil data menu:', error);
    res.status(500).json({ message: 'Gagal mengambil data menu' });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
