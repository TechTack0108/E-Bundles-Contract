import { BaseContract } from 'ethers';
import { DocumentStorage } from './../typechain-types/DocumentStorage';
import { deployments, ethers, getNamedAccounts } from "hardhat"
import { assert, expect } from "chai"

describe("Document Storage", () => {
    let documentStorage: DocumentStorage;
    let deployer: string;

//     beforeEach(async () => {
//         // Deploy the contract
//         await deployments.fixture(["all"]);
//
//         deployer = (await getNamedAccounts()).deployer;
//
//         const documentStorageContract = await deployments.get("DocumentStorage");
//         documentStorage = await ethers.getContractAt(documentStorageContract.abi,
//             documentStorageContract.address,
//             await ethers.getSigner(deployer)) as BaseContract as DocumentStorage;
//     })
})