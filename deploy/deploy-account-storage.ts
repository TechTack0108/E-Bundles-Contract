import { network } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { developmentChains } from "../helper-hardhat-config";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { verify } from "../utils/verify";
import "dotenv/config";

const deployAccountStorage: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const BLOCK_CONFIRMATIONS = 1;
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();   

    const accountStorage = await deploy("AccountStorage", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: BLOCK_CONFIRMATIONS
    });
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(accountStorage.address, []);  
    }
};

export default deployAccountStorage;
deployAccountStorage.tags = ["all", "account-storage"];