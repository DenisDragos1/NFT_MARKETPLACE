import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import Style from "../styles/index.module.css";
import {
  HeroSection,
  Service,
  BigNFTSilder,
  Subscribe,
  Title,
  Category,
  Filter,
  NFTCard,
  Collection,
  AudioLive,
  FollowerTab,
  Slider,
  Brand,
  Video,
  Loader,
} from "../components/componentsindex";
import { getTopCreators } from "../TopCreators/TopCreators";
import { SearchBar } from "../SearchPage/searchBarIndex";

//IMPORTING CONTRCT DATA
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const Home = () => {
  const { checkIfWalletConnected, currentAccount } = useContext(
    NFTMarketplaceContext
  );
  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  const { fetchNFTs } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  // useEffect(() => {
  //  //  if (currentAccount) {
  //   fetchNFTs().then((items) => {
  //     console.log(nfts);
  //     setNfts(items.reverse());
  //     setNftsCopy(items);
  //   });
  //    //}
  // }, []);
  useEffect(() => {
    fetchNFTs().then((items) => {
      console.log(items); // Verify the value of items
      if (Array.isArray(items)) {
        // Only setNfts if items is a valid array
        setNfts(items.reverse()); // Reverse the array if it's not empty
        setNftsCopy(items);
      } else {
        console.log("FetchNFTs returned an invalid array:", items);
        // Optionally handle the case where items is not an array
      }
    }).catch((error) => {
      console.error("Error fetching NFTs:", error);
      // Optionally handle the fetchNFTs error
    });
  }, []);
  
  const onHandleSearch = (value) => {
    const filteredNFTS = nfts.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredNFTS.length === 0) {
      setNfts(nftsCopy);
    } else {
      setNfts(filteredNFTS);
    }
  };

  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy);
    }
  };
  //CREATOR LIST

  const creators = getTopCreators(nfts);
  // console.log(creators);

  return (
    <div className={Style.homePage}>
      <SearchBar
        onHandleSearch={onHandleSearch}
        onClearSearch={onClearSearch}
      />
      {/* <HeroSection />
      <Service /> */}
      {/* <BigNFTSilder /> */}
      {/* <Title
        heading="Audio Collection"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <AudioLive />
      {creators.length == 0 ? (
        <Loader />
      ) : (
        <FollowerTab TopCreator={creators} />
      )}

      <Slider /> */}
      {/* <Collection /> */}
      {/* <Title
        heading="Featured NFTs"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      /> */}
      {/* <Filter /> */}
      {nfts.length == 0 ? <Loader /> : <NFTCard NFTData={nfts} />}

      {/* <Title
        heading="Browse by category"
        paragraph="Explore the NFTs in the most featured categories."
      /> */}
      {/* <Category />
      <Subscribe />
      <Brand />
      <Video /> */}
    </div>
  );
};

export default Home;
