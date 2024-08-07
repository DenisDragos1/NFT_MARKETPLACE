import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

// INTERNAL IMPORT
import Style from "./DropZone.module.css";
import images from "../../img";

const DropZone = ({ title, heading, subHeading, setImage, uploadToPinata }) => {
  const [fileUrl, setFileUrl] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    
    // Verifică tipul de fișier
    if (file.type.startsWith('image/')) {
      const url = await uploadToPinata(file);
      setFileUrl(url);
      setImage(file); // Set the actual file instead of the URL
    } else {
      alert('Please upload a valid image file');
    }
  }, [uploadToPinata, setImage]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 104857600, // 100 MB
  });

  return (
    <div className={Style.DropZone}>
      <div className={Style.DropZone_box} {...getRootProps()}>
        <input {...getInputProps()} />
        <div className={Style.DropZone_box_input}>
          <p>{title}</p>
          <div className={Style.DropZone_box_input_img}>
            <Image
              src={images.upload}
              alt="upload"
              width={100}
              height={100}
              objectFit="contain"
              className={Style.DropZone_box_input_img_img}
            />
          </div>
          <p>{heading}</p>
          <small>{subHeading}</small>
        </div>
      </div>

      {fileUrl && (
        <aside className={Style.DropZone_box_aside}>
          <div className={Style.DropZone_box_aside_box}>
            <Image src={fileUrl} alt="nft image" width={200} height={200} />
          </div>
        </aside>
      )}
    </div>
  );
};

export default DropZone;
