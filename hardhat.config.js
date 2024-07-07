require("@nomicfoundation/hardhat-toolbox");

const NEXT_PUBLIC_POLYGON_MUMBAI_RPC =
  "https://sepolia.infura.io/v3/03a349dbb206457ab852d116b1606a6f";
const NEXT_PUBLIC_PRIVATE_KEY = "47c42ec62c8479dad6567ad2fe7743c845b7f6f67a9976baf1862e0439c0ec8c";
/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.17",
  
  networks: {
    hardhat: {},
    sepolia: {
      url: NEXT_PUBLIC_POLYGON_MUMBAI_RPC,
      accounts: [`0x${NEXT_PUBLIC_PRIVATE_KEY}`],
    },
  },

};
