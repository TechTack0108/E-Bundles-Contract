import { BaseContract } from 'ethers';
import { DocumentStorage } from './../typechain-types/DocumentStorage';
import { deployments, ethers, getNamedAccounts } from "hardhat"
import { assert, expect } from "chai"

describe("Document Storage", () => {
    let documentStorage: DocumentStorage;
    let deployer: string;

    beforeEach(async () => {
        // Deploy the contract
        await deployments.fixture(["all"]);

        deployer = (await getNamedAccounts()).deployer;

        const documentStorageContract = await deployments.get("DocumentStorage");
        documentStorage = await ethers.getContractAt(documentStorageContract.abi,
            documentStorageContract.address,
            await ethers.getSigner(deployer)) as BaseContract as DocumentStorage;
    })

    describe("Add a document", () => {
        it("should add a document", async () => {
            const name = "test";
            const hash = "0x123456";
            const timeStamp = 1112123;

            const transaction = await documentStorage.addDocument(name, hash, timeStamp, relativeParty, version);
            await transaction.wait(1);

            const document = await documentStorage.getDocument(hash);
            assert.equal(document.name, name);
            assert.equal(document.timestamp.toString(), timeStamp.toString());
            assert.equal(document.relativeParty.length, relativeParty.length);
            assert.equal(document.version, version);
        }
        )
    })
})