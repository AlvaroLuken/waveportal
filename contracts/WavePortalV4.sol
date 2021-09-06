// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract WavePortalV4 is Initializable {
  uint totalWaves;
  

  event NewWave(address indexed from, uint timestamp, string message);

  struct Wave {
    address wave;
    string message;
    uint timestamp;
  }

  Wave[] waves;
  uint seed;

  mapping(address => uint) public lastWavedAt;

  // V4
  
  function initialize() public payable initializer {
    console.log("Initialized!");
  }

  function wave(string memory _message) public {
    // spam prevention
    require(lastWavedAt[msg.sender] + 30 seconds < block.timestamp, "Please wait 15 mins to wave again");

    totalWaves += 1;
    console.log("%s waved w message %s!", msg.sender, _message);

    waves.push(Wave(msg.sender, _message, block.timestamp));

    // Generate random # - integrate Chainlink VRF soon!
    uint randomNumber = (block.difficulty + block.timestamp + seed) % 100;

    //set the seed
    seed = randomNumber;
    console.log("Random # generated is: ", randomNumber);
    if(randomNumber < 50) {
      // win prize!
      console.log("You won the prize!");
      uint prizeAmount = 0.0001 ether;
      require(prizeAmount <= address(this).balance, "Not enough money left in contract!");
      (bool success,) = (msg.sender).call{value: prizeAmount}("");
      require(success, "Failed to withdraw money from a contract.");
    } else {
      console.log("Better luck next time!");
    }

    emit NewWave(msg.sender, block.timestamp, _message);
    lastWavedAt[msg.sender] = block.timestamp;

    
  }

  function getAllWaves() view public returns(Wave[] memory) {
    return waves;
  }

  function getTotalWaves() view public returns (uint) {
    return totalWaves;  
  }

  function sayHi() pure public returns (uint) {
    return 66;
  }

  receive() external payable {}
  
}