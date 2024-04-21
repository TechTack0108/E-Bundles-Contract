import { DocumentStorage } from './../typechain-types/DocumentStorage';
import { deployments, ethers, getNamedAccounts } from "hardhat";
import { BaseContract } from "ethers";

async function addDocument(name: string, hash: string, timeStamp:string, relativeParty: string[], version: string) {
    const { deployer } = await getNamedAccounts();
    let documentStorageContract = await deployments.get("DocumentStorage");
    const DocumentStorage: DocumentStorage = await ethers.getContractAt(documentStorageContract.abi,
        documentStorageContract.address,
        await ethers.getSigner(deployer)) as BaseContract as DocumentStorage;
    const transaction = await DocumentStorage.addDocument(name, hash, timeStamp, relativeParty, version);
    await transaction.wait(1);
    console.log("add document success")
}
