async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account: ", deployer.address);

  let balance = (await deployer.getBalance());

  console.log("Account balance is: ", ethers.utils.formatEther(balance));
  
  const Token = await ethers.getContractFactory("WavePortal");
  const token = await Token.deploy();

  console.log("WavePortal address is at: ", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });