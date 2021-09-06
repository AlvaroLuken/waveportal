const { ethers, upgrades } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account: ", deployer.address);

  let balance = (await deployer.getBalance());

  console.log("Account balance is: ", ethers.utils.formatEther(balance));

  const WavePortal = await ethers.getContractFactory("WavePortalV3");
  const instance = await upgrades.deployProxy(WavePortal, []);
  
  await instance.deployed();

  console.log("WavePortalV3 Proxy address is at: ", instance.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });