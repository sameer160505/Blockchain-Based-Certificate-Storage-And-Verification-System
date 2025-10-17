# 🧾 Blockchain-Based Certificate Storage and Verification System

A **Full-Stack Decentralized Application (DApp)** designed to **issue, store, and verify certificates** securely using the **Ethereum Blockchain** and **IPFS**.

---

## 🌐 Overview

This project is a **Blockchain-Based Certificate Verification System** that ensures every certificate issued is **authentic, immutable, and tamper-proof**.  
It combines **Web3, IPFS, and Smart Contracts** to create a decentralized solution where certificates can be verified transparently by anyone.

- The **frontend** allows institutions to issue and verify certificates.
- The **backend** handles secure uploads to **IPFS** using **Pinata**.
- The **blockchain layer** stores certificate metadata immutably.

---

## 🚀 Key Features

- 🔐 **Smart Contract Storage** – Securely stores certificate data on Ethereum (Ganache).
- 🌍 **Decentralized File Uploads** – Uses IPFS via Pinata for permanent and tamper-proof file hosting.
- 🦊 **MetaMask Integration** – Enables blockchain wallet connection and transaction signing.
- ⚙️ **Secure Backend API** – Node.js + Express handles IPFS uploads with JWT authentication.
- 💻 **Interactive Frontend** – Simple HTML/JS interface for issuing and verifying certificates.
- 📱 **QR Code Generation** – Each certificate includes a QR code for easy public verification.
- 🧾 **Immutable Records** – Once uploaded, certificates cannot be modified or deleted.

---

## 🧠 Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | HTML, CSS, JavaScript, Web3.js |
| **Backend** | Node.js, Express, Axios, Multer |
| **Blockchain** | Solidity, Truffle, Ganache |
| **Storage** | IPFS (via Pinata) |
| **Wallet** | MetaMask |

---

## 🏗️ System Architecture

Frontend (HTML + JS)
↓
Backend (Node.js + Express)
↓
IPFS via Pinata (File Storage)
↓
Blockchain (Truffle + Ganache)
↓
MetaMask (Wallet & Transactions)

---

## 📁 Project Structure

contracts/
└── Certificate.sol           # Solidity Smart Contract

migrations/
└── 2_deploy_contracts.js     # Contract Deployment Script

public/
├── index.html                # Add Certificate Page
├── verify.html               # Verify Certificate Page
└── app.js                    # Frontend Logic

server.js                      # Backend API Server
.env                           # Environment Variables (Pinata JWT, PORT)
truffle-config.js              # Blockchain Configuration
package.json                   # Node.js Dependencies

````

---

## 💡 Smart Contract – CertificateStorage.sol

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateStorage {
    struct Certificate {
        string studentName;
        string studentDetails;
        string dateOfBirth;
        string ipfsHash;
        address uploader;
    }

    mapping(string => Certificate) public certificates;

    function addCertificate(
        string memory _certId,
        string memory _name,
        string memory _details,
        string memory _dob,
        string memory _ipfsHash
    ) public {
        require(bytes(certificates[_certId].studentName).length == 0, "Certificate already exists");
        certificates[_certId] = Certificate(_name, _details, _dob, _ipfsHash, msg.sender);
    }

    function getCertificate(string memory _certId)
        public
        view
        returns (string memory, string memory, string memory, string memory, address)
    {
        Certificate memory cert = certificates[_certId];
        require(bytes(cert.studentName).length != 0, "Certificate not found");
        return (cert.studentName, cert.studentDetails, cert.dateOfBirth, cert.ipfsHash, cert.uploader);
    }
}
````

---

## ⚙️ How It Works

### 🧾 Add Certificate Flow

1. Connect **MetaMask** to the **Ganache** local blockchain.
2. Enter student details and upload the certificate file.
3. File is uploaded to **IPFS** via the backend using **Pinata**.
4. Smart contract stores metadata (name, DOB, IPFS hash) on **Ethereum**.
5. A unique Certificate ID and QR code are generated for verification.

### 🔍 Verify Certificate Flow

1. Enter the **Certificate ID** or scan the **QR code**.
2. The system retrieves data directly from the **blockchain**.
3. Displays the certificate’s **IPFS link** for authenticity verification.

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/Blockchain-Based-Certificate-Storage-And-Verification-System.git
cd Blockchain-Based-Certificate-Storage-And-Verification-System
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory:

```
PINATA_JWT=your_pinata_jwt
PORT=5000
```

### 4️⃣ Compile & Deploy Smart Contract

```bash
truffle compile
truffle migrate
```

### 5️⃣ Connect MetaMask

* Add a **Custom RPC** for your local **Ganache network**.
* Import one of the Ganache accounts.

### 6️⃣ Run the Backend Server

```bash
node server.js
```

### 7️⃣ Access the Application

* Open `public/index.html` → *Add Certificate*
* Open `public/verify.html` → *Verify Certificate*

---

## 🔒 Security Highlights

* Sensitive data (JWT, API keys) stored securely in `.env`.
* Blockchain immutability ensures all records are tamper-proof.
* MetaMask ensures secure, user-verified transactions.

---

## 🌱 Future Enhancements

* 🧩 **React.js Frontend** for a modern and responsive UI.
* 🔑 **Role-Based Access** (Admin/Issuer/Verifier).
* ⏳ **Certificate Expiry & Revocation** mechanisms.
* 🕓 **On-Chain Timestamps** for better tracking and auditing.

---

## 👨‍💻 Author

**K. Inzamam Al Sameer**

🎓 Cyber Security Engineering Student

💻 Blockchain & Full-Stack Developer


