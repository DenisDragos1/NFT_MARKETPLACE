import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

const DropZone = ({ setImage, setPdfFile, uploadToPinata }) => {
  const [fileUrl, setFileUrl] = useState(null);
  const [fileType, setFileType] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const url = await uploadToPinata(file);

    if (file.type.startsWith("image/")) {
      setFileUrl(url);
      setImage(url);
      setFileType("image");
    } else if (file.type === "application/pdf") {
      setFileUrl(url);
      setPdfFile(url); // Utilizați setPdfFile pentru a seta URL-ul fișierului PDF
      setFileType("pdf");
    }

    console.log(url);
  }, [setImage, setPdfFile, uploadToPinata]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*, application/pdf",
    maxSize: 5000000,
  });

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag and drop your files here, or click to select files</p>
      </div>
      {fileUrl && (
        <div>
          {fileType === "image" ? (
            <img src={fileUrl} alt="uploaded image" style={{ width: "100%" }} />
          ) : (
            <embed src={fileUrl} type="application/pdf" width="100%" height="600px" />
          )}
        </div>
      )}
    </div>
  );
};

export default DropZone;
