// public/app.js

const CONTRACT_ADDRESS = "0x5777a4468c5566789FA96fcc853114b6Ef7F3491";
const CONTRACT_ABI = [[
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "certificates",
      "outputs": [
        {
          "internalType": "string",
          "name": "studentName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "studentDetails",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "dateOfBirth",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "ipfsHash",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "uploader",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_certId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_details",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_dob",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_ipfsHash",
          "type": "string"
        }
      ],
      "name": "addCertificate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_certId",
          "type": "string"
        }
      ],
      "name": "getCertificate",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  ];

let web3, account, contract;

async function connectMetaMask() {
  if (!window.ethereum) return alert("Please install MetaMask extension first.");
  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    account = accounts[0];
    contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    document.getElementById('accountMsg') && (document.getElementById('accountMsg').innerText = "Connected: " + account);
    console.log('Connected account', account);
  } catch (err) {
    console.error(err);
    alert('Could not connect MetaMask: ' + err.message);
  }
}

function generateCertId() { return 'CERT-' + Date.now(); }

async function uploadFileToServer(file) {
  const fd = new FormData();
  fd.append('file', file);
  const res = await fetch('/api/upload', { method: 'POST', body: fd });
  if (!res.ok) { const err = await res.json(); throw new Error(err.error || 'Upload failed'); }
  const data = await res.json();
  return data.ipfsHash;
}

async function onUploadClicked() {
  try {
    if (!contract || !account) return alert('Connect MetaMask first.');
    const name = document.getElementById('name').value.trim();
    const details = document.getElementById('details').value.trim();
    const dob = document.getElementById('dob').value;
    const fileInput = document.getElementById('file');
    if (!name || !dob || !fileInput.files.length) return alert('Enter name, dob and choose a file');

    const file = fileInput.files[0];
    document.getElementById('result').innerText = 'Uploading file to Pinata (may take a few seconds)...';

    const ipfsHash = await uploadFileToServer(file);

    document.getElementById('result').innerText = 'File uploaded to IPFS: ' + ipfsHash + '\nSaving certificate on blockchain (confirm MetaMask)...';

    const certId = generateCertId();

    await contract.methods.addCertificate(certId, name, details, dob, ipfsHash).send({ from: account });

    const verifyUrl = `${window.location.origin}/verify.html?id=${certId}`;
    const infoHtml = `<b>Success!</b><br>Certificate ID: <code>${certId}</code><br>View/Verify link: <a href="${verifyUrl}" target="_blank">${verifyUrl}</a><br>IPFS: <a href="https://gateway.pinata.cloud/ipfs/${ipfsHash}" target="_blank">Open certificate file</a><br><div id="qrArea"></div>`;
    document.getElementById('result').innerHTML = infoHtml;

    QRCode.toDataURL(verifyUrl).then(url => {
      const img = document.createElement('img');
      img.src = url;
      img.style.maxWidth = '220px';
      document.getElementById('qrArea').appendChild(img);
    });

  } catch (err) {
    console.error(err);
    alert('Error: ' + (err.message || err));
    document.getElementById('result').innerText = 'Error: ' + (err.message || err);
  }
}

window.setupAddPage = function() {
  document.getElementById('connectBtn')?.addEventListener('click', connectMetaMask);
  document.getElementById('uploadBtn')?.addEventListener('click', onUploadClicked);
  if (window.ethereum && window.ethereum.selectedAddress) connectMetaMask();
};

window.setupVerifyPage = async function() {
  const params = new URLSearchParams(window.location.search);
  const preId = params.get('id');
  if (preId) document.getElementById('certId').value = preId;

  document.getElementById('verifyBtn')?.addEventListener('click', async () => {
    try {
      if (!window.ethereum) return alert('Install MetaMask (needed to read contract)');
      if (!web3) { await window.ethereum.request({ method: 'eth_requestAccounts' }); web3 = new Web3(window.ethereum); contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS); }
      const id = document.getElementById('certId').value.trim();
      if (!id) return alert('Enter certificate ID');

      const res = await contract.methods.getCertificate(id).call();
      const [name, details, dob, ipfsHash, uploader] = res;
      const out = document.getElementById('output');
      out.innerHTML = `<b>Name:</b> ${name} <br><b>Details:</b> ${details} <br><b>DOB:</b> ${dob} <br><b>Uploader:</b> ${uploader} <br><b>IPFS:</b> <a href="https://gateway.pinata.cloud/ipfs/${ipfsHash}" target="_blank">Open file</a><div id="qrOut"></div>`;
      const verifyUrl = `${window.location.origin}/verify.html?id=${id}`;
      QRCode.toDataURL(verifyUrl).then(url => {
        const img = document.createElement('img');
        img.src = url;
        img.style.maxWidth = '220px';
        document.getElementById('qrOut').appendChild(img);
      });

    } catch (err) {
      console.error(err);
      alert('Verify error: ' + (err.message || err));
    }
  });
};

if (document.getElementById('connectBtn')) window.setupAddPage();
