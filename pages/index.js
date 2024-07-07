import React, { useState, useEffect, useContext } from "react";

// INTERNAL IMPORT
import Style from "../styles/index.module.css";
import Style1 from "../components/Filter/Filter.module.css";
import {
  FaFilter,
  FaAngleDown,
  FaAngleUp,
  FaWallet,
  FaMusic,
  FaVideo,
  FaImages,
  FaUserAlt,
} from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import { TiTick } from "react-icons/ti";
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

// IMPORTING CONTRACT DATA
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const Home = () => {
  const { checkIfWalletConnected, currentAccount, fetchMyNFTsOrListedNFTs, fetchNFTs } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  const [myNFTs, setMyNFTs] = useState([]);
  const [listedNFTs, setListedNFTs] = useState([]);
  const [activeBtn, setActiveBtn] = useState(0); // 0: All, 1: Listed, 2: Own
  const [activeCategory, setActiveCategory] = useState("All");
  const [showCategories, setShowCategories] = useState(false); // New state for showing categories

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
    const filteredNFTS = nfts.filter(({ name, category }) =>
      (name && name.toLowerCase().includes(value.toLowerCase())) || 
      (category && category.toLowerCase().includes(value.toLowerCase()))
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
      setActiveCategory("All");
    } else if (btnText === "Own NFTs") {
      setActiveBtn(2);
      setActiveCategory("All");
    } else if (btnText === "All NFTs") {
      setActiveBtn(0);
      setActiveCategory("All");
    } else {
      setActiveBtn(0);
      setActiveCategory(btnText);
    }
  };

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const renderContent = () => {
    const LoaderComponent = currentAccount ? Loader1 : Loader;
    let filteredNFTs = nfts;

    if (activeCategory !== "All") {
      filteredNFTs = nfts.filter(nft => nft.category === activeCategory);
    }

    if (activeBtn === 1) {
      filteredNFTs = listedNFTs.filter(nft => activeCategory === "All" || nft.category === activeCategory);
      return filteredNFTs.length === 0 ? <LoaderComponent /> : <NFTCard NFTData={filteredNFTs} />;
    } else if (activeBtn === 2) {
      filteredNFTs = myNFTs.filter(nft => activeCategory === "All" || nft.category === activeCategory);
      return filteredNFTs.length === 0 ? <LoaderComponent /> : <NFTCard NFTData={filteredNFTs} />;
    } else {
      return filteredNFTs.length === 0 ? <LoaderComponent /> : <NFTCard NFTData={filteredNFTs} />;
    }
  };

  return (
    <div className={Style.homePage}>
      <SearchBar
        onHandleSearch={onHandleSearch}
        onClearSearch={onClearSearch}
      />
      
      <div className={Style1.filter}>
        <div className={Style1.filter_box}>
          <div className={Style1.filter_box_left}>
            <button onClick={openTab} className={activeBtn === 0 && activeCategory === "All" ? Style.active : ""}>All NFTs</button>
            <button onClick={openTab} className={activeBtn === 1 ? Style.active : ""}>Listed NFTs</button>
            <button onClick={openTab} className={activeBtn === 2 ? Style.active : ""}>Own NFTs</button>
            <button onClick={toggleCategories} className={showCategories ? Style.active : ""}>Category {showCategories ? <FaAngleUp /> : <FaAngleDown />}</button>
          </div>
        </div>
        {showCategories && (
          <div className={Style1.category_dropdown}>
            <div className={Style1.filter_box}>
            <div className={Style1.filter_box_left}>
            <button onClick={openTab} className={activeCategory === "Digital" ? Style.active : ""}>Digital</button>
            <button onClick={openTab} className={activeCategory === "Art" ? Style.active : ""}>Art</button>
            <button onClick={openTab} className={activeCategory === "Music" ? Style.active : ""}>Music</button>
            <button onClick={openTab} className={activeCategory === "Sports" ? Style.active : ""}>Sports</button>
            <button onClick={openTab} className={activeCategory === "Education" ? Style.active : ""}>Education</button>
          </div>
          </div>
          </div>
        )}
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
