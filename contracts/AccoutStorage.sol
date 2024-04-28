// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract AccountStorage {
    error AccountStorage_NotOwner();

    struct UserProfile {
        address walletAddress;
        LabeledFaceDescriptors labeledFaceDescriptors;
    }

    struct LabeledFaceDescriptors {
        string label;
        string[][] descriptors;
    }

    mapping(string => UserProfile) public s_accountStorage;
    address public immutable i_owner;

    constructor() {
        i_owner = msg.sender;
    }

    function updateStorage(
        string memory ensDomainName,
        UserProfile memory user
    ) public {
        s_accountStorage[ensDomainName] = user;
    }
}
