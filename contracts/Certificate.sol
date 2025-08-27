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
