const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const multer = require('multer');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/Bakery', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Koneksi Ke MongoDB Gagal:'));
db.once('open', function () {
  console.log('Sukses Terkoneksi Ke MongoDb');
});

const userSchema = new mongoose.Schema({
  email: String,
  kataSandi: String,
});

const User = mongoose.model('User', userSchema);

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

    if (user) {
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

// Menambahkan Menu
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

// Menghapus Menu
app.delete('/api/menu/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Menu.deleteOne({ _id: id });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Menu berhasil dihapus' });
    } else {
      res.status(404).json({ message: 'Menu tidak ditemukan' });
    }
  } catch (error) {
    console.error('Gagal menghapus menu:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat menghapus menu' });
  }
});

// Mengambil data menu berdasarkan ID
app.get('/api/menu/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const menu = await Menu.findById(id);
    if (!menu) {
      return res.status(404).json({ error: 'Menu tidak ditemukan' });
    }
    res.json(menu);
  } catch (error) {
    console.error('Terjadi kesalahan saat mengambil data menu:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data menu' });
  }
});

// Menampilkan semua data menu
app.get('/api/menu', async (_req, res) => {
  try {
    const menus = await Menu.find({});
    res.status(200).json(menus);
  } catch (error) {
    console.error('Gagal mengambil data menu:', error);
    res.status(500).json({ message: 'Gagal mengambil data menu' });
  }
});

const promoSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
});

const Promo = mongoose.model('Promo', promoSchema);

// Endpoint untuk mendapatkan data promo
app.get('/api/promo', async (_req, res) => {
  try {
    const promos = await Promo.find({});
    res.status(200).json(promos);
  } catch (error) {
    console.error('Gagal mengambil data promo:', error);
    res.status(500).json({ message: 'Gagal mengambil data promo' });
  }
});

// Endpoint untuk menambahkan data promo
app.post('/api/promo', upload.single('image'), async (req, res) => {
  try {
    const image = req.file;

    const promo = new Promo({
      image: image.buffer.toString('base64'),
    });

    await promo.save();

    res.status(200).json({ message: 'Promo berhasil ditambahkan' });
  } catch (error) {
    console.error('Gagal menambahkan promo:', error);
    res.status(500).json({ message: 'Gagal menambahkan promo' });
  }
});

// Endpoint untuk menghapus data promo
app.delete('/api/promo/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Promo.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Promo berhasil dihapus' });
    } else {
      res.status(404).json({ message: 'Promo tidak ditemukan' });
    }
  } catch (error) {
    console.error('Gagal menghapus promo:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat menghapus promo' });
  }
});


// Handle Order
const orderSchema = new mongoose.Schema({
  menuId: String,
  quantity: Number,
});

const Order = mongoose.model('Order', orderSchema);

app.post('/api/orders', async (req, res) => {
  try {
    const { menuId, quantity } = req.body;

    console.log('Received order request:', menuId, quantity);
    console.log(req.body);

    // Validasi input
    if (!menuId || !quantity || typeof quantity !== 'number' || quantity <= 0) {
      console.log('Invalid order data');
      return res.status(400).json({ error: 'Invalid order data' });
    }

    // Simpan pesanan ke dalam database
    const order = new Order({
      menuId,
      quantity,
    });

    await order.save();

    console.log('Order saved:', order);

    res.status(201).json({ message: 'Pesanan berhasil disimpan' });
  } catch (error) {
    console.error('Gagal menyimpan pesanan:', error);
    res.status(500).json({ message: 'Gagal menyimpan pesanan' });
  }
});



app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
