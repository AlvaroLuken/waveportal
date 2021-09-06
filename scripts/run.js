const { parseEther } = require("ethers/lib/utils");

async function main() {
  const [owner, randoPerson] = await ethers.getSigners();
  //const waveContractFactory = await hre.ethers.getContractFactory("WavePortalV2");
  //const waveContract = await waveContractFactory.deploy();

  const WavePortalV2 = await ethers.getContractFactory("WavePortalV2");
  const instance = await upgrades.deployProxy(WavePortalV2, []);
  
  await instance.deployed();
  await owner.sendTransaction({
    to: instance.address,
    value: parseEther("1")
  });

  console.log("Contract deployed to: ", instance.address);
  console.log("Contract deployed by: ", owner.address);

  let contractBalance = await hre.ethers.provider.getBalance(instance.address);
  console.log("Contract balance is: ", ethers.utils.formatEther(contractBalance));

  let waveCount = await instance.getTotalWaves();
  console.log(waveCount.toNumber());

  let waveTx = await instance.wave("A message!");
  await waveTx.wait();

  waveTx = await instance.connect(randoPerson).wave("A random person waving!");
  await waveTx.wait();

  contractBalance = await hre.ethers.provider.getBalance(instance.address);
  console.log("Contract balance is: ", ethers.utils.formatEther(contractBalance));

  let allWaves = await instance.getAllWaves();
  console.log(allWaves);

  waveCount = await instance.getTotalWaves();
  console.log("Wave count after: ", waveCount.toNumber())
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });