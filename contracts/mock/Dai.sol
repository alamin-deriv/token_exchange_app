// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol';

contract Dai is ERC20, ERC20Detailed {
  constructor() ERC20Detailed('DAI', 'Dai Stablecoin', 18) public {}

  function faucet(address to, uint amount) external {
    _mint(to, amount);
  }
}