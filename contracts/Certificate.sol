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

    // Mapping from Certificate ID => Certificate details
    mapping(string => Certificate) public certificates;

    /// @notice Add a new certificate
    /// @param _certId Unique certificate ID
    /// @param _name Student name
    /// @param _details Student details (course, dept, etc.)
    /// @param _dob Student date of birth
    /// @param _ipfsHash IPFS hash of uploaded certificate file
    function addCertificate(
        string memory _certId,
        string memory _name,
        string memory _details,
        string memory _dob,
        string memory _ipfsHash
    ) public {
        Certificate memory cert = Certificate({
            studentName: _name,
            studentDetails: _details,
            dateOfBirth: _dob,
            ipfsHash: _ipfsHash,
            uploader: msg.sender
        });

        certificates[_certId] = cert;
    }

    /// @notice Retrieve a certificate by ID
    /// @param _certId Certificate ID
    /// @return name, details, dob, ipfsHash, uploader
    function getCertificate(string memory _certId)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            address
        )
    {
        Certificate memory cert = certificates[_certId];
        return (
            cert.studentName,
            cert.studentDetails,
            cert.dateOfBirth,
            cert.ipfsHash,
            cert.uploader
        );
    }
}
