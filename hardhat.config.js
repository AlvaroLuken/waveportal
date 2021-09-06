require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('@openzeppelin/hardhat-upgrades');
require("dotenv").config();

module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_URL,
      accounts: [process.env.RINKEBY_PRIVATE_KEY]
    },
    ropsten: {
      url: process.env.ROPSTEN_URL,
      accounts: [process.env.ROPSTEN_PRIVATE_KEY]
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      accounts: ["0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY
  }
};
