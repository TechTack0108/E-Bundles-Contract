import { BaseContract } from 'ethers';
import { DocumentStorage } from './../typechain-types/DocumentStorage';
import { deployments, ethers, getNamedAccounts } from "hardhat"
import { assert, expect } from "chai"

describe("Document Storage", () => {
    let documentStorage: DocumentStorage;
    let deployer: string;

})