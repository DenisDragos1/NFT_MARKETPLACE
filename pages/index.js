import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import Style from "../styles/index.module.css";
import Style1 from "../components/Filter/Filter.module.css";

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
  Loader1,
} from "../components/componentsindex";
import { getTopCreators } from "../TopCreators/TopCreators";
import { SearchBar } from "../SearchPage/searchBarIndex";

//IMPORTING CONTRACT DATA
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const Home = () => {
  const { checkIfWalletConnected, currentAccount, fetchMyNFTsOrListedNFTs, fetchNFTs } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  const [myNFTs, setMyNFTs] = useState([]);
  const [listedNFTs, setListedNFTs] = useState([]);
  const [activeBtn, setActiveBtn] = useState(0); // 0: All, 1: Listed, 2: Own

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  useEffect(() => {
    fetchNFTs().then((items) => {
      if (Array.isArray(items)) {
        setNfts(items.reverse());
        setNftsCopy(items);
      } else {
        console.error("FetchNFTs returned an invalid array:", items);
      }
    }).catch((error) => {
      console.error("Error fetching NFTs:", error);
    });
  }, [fetchNFTs]);

  useEffect(() => {
    if (currentAccount) {
      fetchMyNFTsOrListedNFTs("fetchMyNFTs").then((items) => {
        setMyNFTs(items);
      });

      fetchMyNFTsOrListedNFTs("fetchItemsListed").then((items) => {
        setListedNFTs(items);
      });
    }
  }, [currentAccount, fetchMyNFTsOrListedNFTs]);

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

  const creators = getTopCreators(nfts);

  const openTab = (e) => {
    const btnText = e.target.innerText;
    if (btnText === "Listed NFTs") {
      setActiveBtn(1);
    } else if (btnText === "Own NFTs") {
      setActiveBtn(2);
    } else {
      setActiveBtn(0);
    }
  };

  const renderContent = () => {
    if (activeBtn === 1) {
      return listedNFTs.length === 0 ? <Loader /> : <NFTCard NFTData={listedNFTs} />;
    } else if (activeBtn === 2) {
      return myNFTs.length === 0 ? <Loader /> : <NFTCard NFTData={myNFTs} />;
    } else {
      return nfts.length === 0 ? <Loader /> : <NFTCard NFTData={nfts} />;
    }
  };

  return (
    <div className={Style.homePage}>
      <SearchBar
        onHandleSearch={onHandleSearch}
        onClearSearch={onClearSearch}
      />

      {/* <div className={Style.buttonContainer}>
        <button onClick={openTab} className={activeBtn === 0 ? Style.active : ""}>All NFTs</button>
        <button onClick={openTab} className={activeBtn === 1 ? Style.active : ""}>Listed NFTs</button>
        <button onClick={openTab} className={activeBtn === 2 ? Style.active : ""}>Own NFTs</button>
      </div> */}

      <div className={Style1.filter}>
      <div className={Style1.filter_box}>
        <div className={Style1.filter_box_left}>
          {/* <button onClick={() => {}}>NFTs</button>
          <button onClick={() => {}}>Arts</button>
          <button onClick={() => {}}>Musics</button>
          <button onClick={() => {}}>Sports</button>
          <button onClick={() => {}}>Photography</button> */}
          <button onClick={openTab} className={activeBtn === 0 ? Style.active : ""}>All NFTs</button>
        <button onClick={openTab} className={activeBtn === 1 ? Style.active : ""}>Listed NFTs</button>
        <button onClick={openTab} className={activeBtn === 2 ? Style.active : ""}>Own NFTs</button>
        </div>
        </div>
        </div>

      {renderContent()}

      {/* You can uncomment these sections as needed */}
      {/* <HeroSection />
      <Service />
      <BigNFTSilder />
      <Title
        heading="Audio Collection"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <AudioLive />
      {creators.length == 0 ? (
        <Loader />
      ) : (
        <FollowerTab TopCreator={creators} />
      )}
      <Slider />
      <Collection />
      <Title
        heading="Featured NFTs"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <Filter />
      <Category />
      <Subscribe />
      <Brand />
      <Video /> */}
    </div>
  );
};

export default Home;
