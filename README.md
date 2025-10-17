# Blockchain-Based-Certificate-Storage-And-Verification-System
Blockchain Based Certificate Storage And Verification  System

Overview
This project is a Blockchain-based Certificate Storage And  Verification System built using Ethereum smart contracts. It allows users to upload, store, and verify certificates securely on the blockchain using MetaMask for transactions and IPFS (via Pinata) for file storage.

Features
•	Add Certificate Page — Connects MetaMask, uploads certificates to IPFS, auto-generates certificate ID, stores details on blockchain, and generates QR code.
•	Verify Certificate Page — Allows verification by certificate ID or QR code, fetches certificate details from blockchain, and displays document link and QR code.

Tools & Technologies
1.	MetaMask — For wallet connection & signing blockchain transactions.
2.	Ganache — Local Ethereum blockchain for development/testing.
3.	Truffle — Framework for compiling, deploying, and testing smart contracts.
4.	Node.js + Express — Backend server for file uploads and API handling.
5.	Pinata — To store certificate files on IPFS (decentralized storage).
6.	VS Code — Code editor.
7.	QR Code Generator (JavaScript) — For generating verification QR codes.
   
Project Structure

blockchain-certificates/
│
├── contracts/
│   └── Certificate.sol
├── migrations/
│   └── 2_deploy_contracts.js
├── public/
│   ├── index.html
│   ├── verify.html
│   ├── app.js
├── server.js
├── .env
├── truffle-config.js
├── package.json
└── README.md

Setup Instructions (Step-by-Step)
1.	Install required software: Chrome, MetaMask, Node.js, Ganache, VS Code, Truffle.
2.	Clone the repository and install Node dependencies using npm install.
3.	Create a .env file with your Pinata JWT and port configuration.
4.	Compile and deploy smart contract with Truffle.
5.	Copy contract address and ABI from build/contracts/CertificateStorage.json and paste into app.js.
6.	Start backend using node server.js.
7.	Open MetaMask, add Ganache network, and import Ganache account.
8.	Visit http://localhost:4000/index.html to add and verify certificates.
   
Smart Contract (CertificateStorage.sol)

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

    function getCertificate(string memory _certId) public view returns (
        string memory,
        string memory,
        string memory,
        string memory,
        address
    ) {
        Certificate memory cert = certificates[_certId];
        require(bytes(cert.studentName).length != 0, "Certificate not found");
        return (cert.studentName, cert.studentDetails, cert.dateOfBirth, cert.ipfsHash, cert.uploader);
    }
}

Author

K. Inzamam Al Sameer — Blockchain Developer & web developer

