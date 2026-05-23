const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

const uploadDir = path.join(__dirname, 'images', 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const safe = file.originalname.replace(/[^a-z0-9.\-\_]/gi, '-');
    cb(null, Date.now() + '-' + safe);
  }
});

const upload = multer({ storage });

// Serve static site files
app.use(express.static(path.join(__dirname)));

// Image upload endpoint
app.post('/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const url = `/images/uploads/${req.file.filename}`;
  res.json({ url });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Upload server running: http://localhost:${PORT}`));
