// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract DocumentStorage {
    struct Document {
        string name;
        string hash;
        uint256 timestamp;
        string[] relativeParty;
        string version;
    }

    Document[] public documents;

    function addDocument(string memory _name, string memory _hash, uint256 timestamp, string[] memory _relativeParty, string memory _version) public {
        documents.push(Document(_name, _hash, timestamp, _relativeParty, _version));
    }

    function getDocuments() public view returns (Document[] memory) {
        return documents;
    }

    function getDocument(string memory _hash) public view returns (Document memory) {
        for (uint i = 0; i < documents.length; i++) {
            if (keccak256(abi.encodePacked(documents[i].hash)) == keccak256(abi.encodePacked(_hash))) {
                return documents[i];
            }
        }
        revert("Document not found");
    }
}