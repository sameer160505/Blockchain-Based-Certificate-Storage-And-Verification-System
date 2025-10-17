# Blockchain-Based-Certificate-Storage-And-Verification-System
Blockchain Based Certificate Storage And Verification  System

A full-stack decentralized application (DApp) for issuing and verifying certificates securely using Ethereum Blockchain and IPFS.

Overview

This project implements a Blockchain-Based Certificate Verification System where certificates are stored on a decentralized network, ensuring authenticity and preventing forgery. The frontend allows users to add and verify certificates, the backend securely uploads certificates to IPFS via Pinata, and the blockchain layer stores immutable metadata such as student details, IPFS hash, and certificate ID.

Key Features

•	Smart Contract Storage – Stores certificate data on Ethereum (Ganache).
•	Decentralized File Uploads – Uses IPFS via Pinata for permanent file hosting.
•	MetaMask Integration – Handles wallet connection and transaction approval.
•	Secure Backend API – Node.js + Express server uploads to Pinata using JWT.
•	Interactive Frontend – HTML/JS interface for adding and verifying certificates.
•	QR Code Generation – Each certificate includes a scannable QR for verification.
•	Immutable Records – Certificates cannot be altered once uploaded.

Tech Stack

•	Frontend: HTML, CSS, JavaScript, Web3.js – User interface, wallet connection, QR generation
•	Backend: Node.js, Express, Axios, Multer – File upload and Pinata IPFS integration
•	Blockchain: Solidity, Truffle, Ganache – Smart contract and local Ethereum testing
•	Storage: IPFS (Pinata) – Decentralized certificate file storage
•	Wallet: MetaMask – Blockchain transaction management

System Architecture

Frontend (HTML + JS) → Backend (Node.js + Express) → IPFS via Pinata (File Storage) → Blockchain (Truffle + Ganache) → MetaMask (Wallet & Transactions)

Project Structure

contracts/
  └── Certificate.sol – Solidity smart contract
migrations/
  └── 2_deploy_contracts.js – Deployment script
public/
  ├── index.html – Add Certificate Page
  ├── verify.html – Verify Certificate Page
  └── app.js – Frontend logic
server.js – Backend API server
.env – Pinata JWT and environment variables
truffle-config.js – Blockchain configuration
package.json – Node.js dependencies

Smart Contract

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

Working Process

Add Certificate Flow:

•	Connect MetaMask to Ganache.
•	Enter student details and upload the certificate file.
•	File is uploaded to IPFS via backend and Pinata.
•	Smart contract stores IPFS hash and metadata on blockchain.
•	A unique Certificate ID and QR code are generated.

Verify Certificate Flow:

•	Enter Certificate ID or scan QR code.
•	System retrieves certificate data directly from blockchain.
•	IPFS link is displayed for verification.

Installation & Setup

•	Clone the repository using git clone and navigate into the directory.
•	Run 'npm install' to install dependencies.
•	Create a .env file with Pinata JWT and server port.
•	Compile and deploy the smart contract using Truffle.
•	Configure MetaMask to connect to the local Ganache network.
•	Start the backend server using 'node server.js'.
•	Access index.html and verify.html in the browser for testing.

Security Highlights

•	Pinata JWT stored securely in .env (never exposed to frontend).
•	Blockchain immutability ensures certificate data cannot be altered.
•	MetaMask transactions add user-side security and verification.

Future Enhancements

•	React-based frontend for better UI/UX.
•	Certificate revocation or expiration feature.
•	Admin authentication and role-based access.
•	On-chain timestamps for tracking issuance dates.

Author

K. Inzamam Al Sameer
Cyber Security Engineering Student  Blockchain & Full-Stack Developer



