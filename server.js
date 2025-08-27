// server.js
require('dotenv').config();
const express = require('express');
const multer = require('multer');
const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');
const path = require('path');
const cors = require('cors');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/ping', (req, res) => res.json({ ok: true }));

app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const form = new FormData();
    form.append('file', fs.createReadStream(req.file.path), { filename: req.file.originalname });

    const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
    const response = await axios.post(url, form, {
      maxBodyLength: 'Infinity',
      headers: {
        ...form.getHeaders(),
        Authorization: `Bearer ${process.env.PINATA_JWT}`
      }
    });

    fs.unlinkSync(req.file.path);

    return res.json({ ipfsHash: response.data.IpfsHash, pinataResponse: response.data });
  } catch (err) {
    console.error('Pinata upload error:', err?.response?.data || err.message);
    return res.status(500).json({ error: 'Upload failed', details: err?.response?.data || err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
