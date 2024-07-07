import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Loader1.module.css";
import images from "../../img";

const Loader1 = () => {
  return (
    <div className={Style.Loader1}>
      <div className={Style.Loader1_box}>
        <div className={Style.Loader1_box_img}>
          <Image
            src={images.loader1}
            alt="loader1"
            width={400}
            height={400}
            className={Style.Loader1_box_img_img}
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Loader1;
