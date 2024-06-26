import { network } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { developmentChains } from "../helper-hardhat-config";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { verify } from "../utils/verify";
import "dotenv/config";

const deployDocumentStorage: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const BLOCK_CONFIRMATIONS = 1;
    const PARTY_ADDRESS = ["0xd2826132FBD5962338e2A37DdC5345A6fE3e6640","0xF3B4C77E88998894542A5Df6Fe3FA18F167E8cE2"];
    const NUM_CONFIRMATIONS = 2;
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();   
    const args = [PARTY_ADDRESS,NUM_CONFIRMATIONS];

    const documentStorage = await deploy("DocumentStorage", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: BLOCK_CONFIRMATIONS
    });
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(documentStorage.address, args);  
    }
};

export default deployDocumentStorage;
deployDocumentStorage.tags = ["all", "document-storage"];