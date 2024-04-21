import { network } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { developmentChains } from "../helper-hardhat-config";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { verify } from "../utils/verify";
import "dotenv/config";

const deployDocumentStorage: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const BLOCK_CONFIRMATIONS = 1;
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const documentStorage = await deploy("DocumentStorage", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: BLOCK_CONFIRMATIONS
    });
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(documentStorage.address, []);
    }
};

export default deployDocumentStorage;
deployDocumentStorage.tags = ["all", "document-storage"];