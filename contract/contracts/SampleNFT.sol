// SPDX-License-Identifier: None
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721 {
    uint256 public tokenMinted;

    constructor() ERC721("SmartAds Shoes", "SAS") {}

    function publicMint() external {
        tokenMinted += 1;
        super._safeMint(msg.sender, tokenMinted);
    }
}
