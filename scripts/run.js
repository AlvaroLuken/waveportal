async function main() {
  const [owner, randoPerson] = await ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy();
  await waveContract.deployed();

  console.log("Contract deployed to: ", waveContract.address);
  console.log("Contract deployed by: ", owner.address);

  let waveCount = await waveContract.getTotalWaves();
  console.log(waveCount.toNumber());

  let waveTx = await waveContract.wave("A message!");
  await waveTx.wait();

  waveTx = await waveContract.connect(randoPerson).wave("A random person waving!");
  await waveTx.wait();

  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);

  waveCount = await waveContract.getTotalWaves();
  console.log("Wave count after: ", waveCount.toNumber())
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });