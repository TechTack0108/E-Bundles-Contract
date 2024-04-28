// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract DocumentStorage {
    // Error
    error DocumentStorage_Error_InvalidOwner();
    error DocumentStorage_Error_InvalidTransactionId();
    error DocumentStorage_Error_AlreadyConfirm();
    error DocumentStorage_Error_TransactionAlreadyExecute();
    error DocumentStorage_Error_InvalidVersion();

    // Events
    event TransactionSubmitted(uint256 indexed transactionId, Document document);
    event TransactionConfirmed(uint256 indexed transactionId);
    event DocumentAdded(uint256 indexed transactionId);

    // State variables
    address[] public owners;
    mapping(address => bool) public isOwner;
    uint256 public num_confirmation;
    mapping(uint256 => mapping(address=>bool)) public isConfirmed;
    Transaction[] public transactions;
    Document[] public documents;

    struct Document {
        string name;
        string uri;
        string timestamp;
    }

    struct Transaction{
        Document document;
        bool executed;
    }


    constructor(address[] memory _owners, uint256 numConfirmationRequired) {
        require(_owners.length >= numConfirmationRequired, "Invalid number of owners");
        num_confirmation = numConfirmationRequired;
        for(uint i = 0; i < _owners.length; i++) {
            if(_owners[i] == address(0) || isOwner[_owners[i]]) {
                revert DocumentStorage_Error_InvalidOwner();
            }     
            isOwner[_owners[i]] = true;
            owners.push(_owners[i]);
        }
    }

    // MultiSig Wallet
    function submitTransaction(Document memory document) public {
        uint256 transactionId = transactions.length;
        transactions.push(Transaction(document, false));
        confirmTransaction(transactionId);
        emit TransactionSubmitted(transactionId, document);
    }

    function confirmTransaction(uint256 transactionId) public {
        if(transactionId >= transactions.length) {
            revert DocumentStorage_Error_InvalidTransactionId();
        }
        if(!isConfirmed[transactionId][msg.sender]) {
            isConfirmed[transactionId][msg.sender] = true;
        }
        else{
            revert DocumentStorage_Error_AlreadyConfirm();
        }
        emit TransactionConfirmed(transactionId);
        if(isTransactionConfirmed(transactionId)) {
            executeTransaction(transactionId);
        }
    }

    function isTransactionConfirmed(uint256 transactionId) internal view returns (bool)  {
        if(transactionId >= transactions.length) {
            revert DocumentStorage_Error_InvalidTransactionId();
        }
        uint256 confirmationCount = 0;
        for(uint i = 0; i < owners.length; i++) {
            if(isConfirmed[transactionId][owners[i]]) {
                confirmationCount++;
            }
        }
        return confirmationCount >= num_confirmation;
    }

    function executeTransaction(uint256 transactionId) internal{
        if(transactionId >= transactions.length) {
            revert DocumentStorage_Error_InvalidTransactionId();
        }
        if(transactions[transactionId].executed) {
            revert DocumentStorage_Error_TransactionAlreadyExecute();
        }
        transactions[transactionId].executed = true;
        Document memory document = transactions[transactionId].document;
        documents.push(document);
        emit DocumentAdded(transactionId);
    }

    function getDocument(uint256 version) public view returns (Document memory) {
        if(version > documents.length) {
            revert DocumentStorage_Error_InvalidVersion();
        }
        return documents[version-1];
    }
    
    function getLastestDocumentVersion() public view returns (Document memory) {
        return documents[documents.length-1];
    }
}