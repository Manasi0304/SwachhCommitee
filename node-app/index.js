const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
const { ObjectId } = require('mongodb');

// const authRoutes = require('./routes/auth'); // Import auth routes

dotenv.config(); 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const upload = multer({ storage: storage })
const bodyParser = require('body-parser')
const app = express()

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(bodyParser.json());
const port = 3000

const productSchema = new mongoose.Schema({
  pname: { type: String, required: true },
  pdesc: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true },
  pimage: { type: String, required: true },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Products = mongoose.model('Products', productSchema);

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactNo: { 
    type: String, 
    required: true,
    match: /^[0-9]{10}$/  // Add regex validation
  },
  likedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
  points: { type: Number, default: 0 },
});


// mongoose.model('User', UserSchema);
const User = mongoose.model('User', UserSchema);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send("Welcome to root");
})

app.post('/add-product', upload.single('pimage'), async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file.path);

    const pname = req.body.pname;
    const pdesc = req.body.pdesc;
    const price = req.body.price;
    const category = req.body.category;
    const pimage = req.file.path;
    const addedBy = req.body.userId;

    const product = new Products({ pname, pdesc, price, category, pimage, addedBy });

    await product.save();
    const userId = req.body.userId;
    await User.findByIdAndUpdate(userId, { $inc: { points: 50 } });
    res.send({ message: 'Product saved successfully', product });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

// Registration Route
app.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, contactNo } = req.body;

  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      contactNo,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
  
    // Check if the user exists
    if (!user) {
      return res.status(400).json({ message: 'User does not exist! Please register first.' });
    }
  
    // Verify the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password!' });
    }
  
    // Generate a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
    res.json({ message: 'Login successful', token, userId: user._id });
  }catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/get-user/:uId', async (req, res) => {
  const _userId = req.params.uId;

  try {
    const user = await User.findById(_userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send({ message: 'success', user });
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).send({ message: 'Server error' });
  }
});

app.get('/get-products', async (req, res) => {
  try {
    const products = await Products.find();
    res.send({ message: 'success', products });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

app.post('/like-product', async (req, res) => {
  try {
    const { userId, productId } = req.body;
    console.log(req.body);
    // Ensure both userId and productId are provided
    if (!userId || !productId) {
      return res.status(400).json({ message: 'Missing userId or productId' });
    }

    // Find the user by ID and update the liked products
    await User.updateOne({ _id: userId }, { $addToSet: { likedProducts: productId } });

    res.status(200).send({ message: 'Product liked successfully.' });
  } catch (err) {
    console.error('Error liking product:', err);
    res.status(500).send({ message: 'Server error' });
  }
});

app.post('/liked-products', (req, res) => {
  User.findOne({ _id: req.body.userId })
    .populate('likedProducts') // Populate liked products with full product details
    .then((user) => {
      res.send({ message: 'success', products: user.likedProducts });
    })
    .catch((err) => {
      console.error('Server error:', err);
      res.status(500).send({ message: 'Server error' });
    });
});

app.get('/get-product/:id', (req, res) => {
    console.log(req.params);
    Products.findOne({ _id: req.params.id })
      .populate('addedBy')
      .then((product) => {
      res.send({ message: 'success', product });
    })
      .catch((err) => {
      console.error(err);
      res.status(500).send({ message: 'Server error' });
  });
});

app.post('/my-products', (req, res) => {
    const userId = req.body.userId;
    Products.find({ addedBy: userId })
      .then((products) => {
        res.send({ message: 'success', products });
      })
      .catch((err) => {
        // console.error('Server error:', err);
        res.status(500).send({ message: 'Server error' });
      });
});

app.get('/user-points/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const recentProducts = await Products.find({ addedBy: ObjectId(userId) })
      .sort({ _id: -1 })
      .limit(5);

    res.json({
      message: 'Success',
      points: user.points,
      recentProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



app.listen(port, () => {
    console.log(`listening on port ${port}`);
})
