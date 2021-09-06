const { ethers, upgrades } = require("hardhat");

const proxyAddress = "0xd0cFF590AC9E8F608358A1ACe405b8F9A3D0b8b5";

async function main() {
  const WavePortalV4 = await ethers.getContractFactory("WavePortalV4");
  const upgraded = await upgrades.upgradeProxy(proxyAddress, WavePortalV4);
  console.log((await upgraded.getTotalWaves()).toString());

  console.log(upgraded.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });