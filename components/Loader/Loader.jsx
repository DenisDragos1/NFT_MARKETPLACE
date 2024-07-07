import React from "react";
import Style from "./Loader.module.css";
import images from "../../img";

const Loader = () => {
  return (
    <div className={Style.Loader}>
      <div className={Style.Loader_box}>
        <div className={Style.Loader_box_img}>
          <img
            src={images.loader}
            alt="loader"
            className={Style.Loader_box_img_img}
            style={{ objectFit: "cover", width: 400, height: 400 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
