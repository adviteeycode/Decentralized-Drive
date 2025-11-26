import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";
import { API_Key, API_Secret } from "../utils/constants";
import { useAuth } from "../context/AuthContext";
import { recordFileUsage } from "../services/storageUsage";
import Spinner from "./Spinner";


const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || isUploading) {
      return;
    }
    setIsUploading(true);
    if (file) {
      const selectedFile = file;
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: API_Key,
            pinata_secret_api_key: API_Secret,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        await contract.add(account, ImgHash);
        if (user) {
          await recordFileUsage({
            user,
            bytes: selectedFile.size,
            filename: selectedFile.name,
          });
        }
      
        // alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
      } catch (e) {
        console.error(e);
        alert("Unable to upload image to Pinata");
      }
    }
    setIsUploading(false);
    // alert("Successfully Image Uploaded");
    setFileName("No image selected");
    setFile(null);
  };
  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object
    // console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };
  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">Image: {fileName}</span>
        <button type="submit" className="upload flex items-center justify-center gap-2" disabled={!file || isUploading}>
          {isUploading ? (
            <>
              <Spinner size="h-5 w-5" />
              Uploading...
            </>
          ) : (
            "Upload File"
          )}
        </button>
      </form>
    </div>
  );
};
export default FileUpload;