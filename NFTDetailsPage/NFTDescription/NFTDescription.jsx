import React, { useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaWallet } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

//INTERNAL IMPORT
import Style from "./NFTDescription.module.css";
import images from "../../img";
import { Button } from "../../components/componentsindex.js";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const NFTDescription = ({ nft }) => {
  const [social, setSocial] = useState(false);
  const [NFTMenu, setNFTMenu] = useState(false);
  const [history, setHistory] = useState(true);
  const [provanance, setProvanance] = useState(false);
  const [owner, setOwner] = useState(false);

  const router = useRouter();

  const openSocial = () => {
    setSocial(!social);
    setNFTMenu(false);
  };

  const openNFTMenu = () => {
    setNFTMenu(!NFTMenu);
    setSocial(false);
  };

  const openTabs = (e) => {
    const btnText = e.target.innerText;
    setHistory(btnText === "Bid History");
    setProvanance(btnText === "Provenance");
    setOwner(btnText === "Owner");
  };

  const openOwner = () => {
    setOwner(!owner);
    setHistory(!owner);
    setProvanance(false);
  };

  const { buyNFT, currentAccount } = useContext(NFTMarketplaceContext);

  const fetchMetadata = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.pdfFile;
    } catch (error) {
      console.error("Error fetching metadata:", error);
      return null;
    }
  };

  const viewPDF = async () => {
    const pdfUrl = await fetchMetadata(nft.tokenURI);
    if (pdfUrl) {
      window.open(pdfUrl, "_blank");
    } else {
      alert("Failed to load PDF.");
    }
  };

  return (
    <div className={Style.NFTDescription}>
      <div className={Style.NFTDescription_box}>
        <div className={Style.NFTDescription_box_share}>
          <div className={Style.NFTDescription_box_share_box}></div>
        </div>
        <div className={Style.NFTDescription_box_profile}>
          <h1>
            {nft.name} #{nft.tokenId}
          </h1>
          <div className={Style.NFTDescription_box_profile_box}>
            <div className={Style.NFTDescription_box_profile_box_left}>
              <Image
                src={images.user1}
                alt="profile"
                width={40}
                height={40}
                style={{ objectFit: "cover" }}
                className={Style.NFTDescription_box_profile_box_left_img}
              />
              <div className={Style.NFTDescription_box_profile_box_left_info}>
                <small>Creator</small> <br />
                <Link href={{ pathname: "/author" }}>
                  <span>
                    Karli Costa <MdVerified />
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className={Style.NFTDescription_box_profile_biding}>
            <div className={Style.NFTDescription_box_profile_biding_box_price}>
              <div className={Style.NFTDescription_box_profile_biding_box_price_bid}>
                <p>
                  {nft.price} ETH <span></span>
                </p>
              </div>
            </div>
            <div className={Style.NFTDescription_box_profile_biding_box_button}>
              {currentAccount === nft.seller.toLowerCase() ? (
                <Button
                  icon={<FaWallet />}
                  btnName="View PDF"
                  handleClick={viewPDF}
                  classStyle={Style.button}
                />
              ) : currentAccount === nft.owner.toLowerCase() ? (
                <>
                  <Button
                    icon={<FaWallet />}
                    btnName="List on Marketplace"
                    handleClick={() =>
                      router.push(
                        `/reSellToken?id=${nft.tokenId}&tokenURI=${nft.tokenURI}&price=${nft.price}`
                      )
                    }
                    classStyle={Style.button}
                  />
                  <Button
                    icon={<FaWallet />}
                    btnName="View PDF"
                    handleClick={viewPDF}
                    classStyle={Style.button}
                  />
                </>
              ) : (
                <>
                  <Button
                    icon={<FaWallet />}
                    btnName="Buy NFT"
                    handleClick={() => buyNFT(nft)}
                    classStyle={Style.button}
                  />
                  <p>You must buy this NFT to view the PDF.</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDescription;
