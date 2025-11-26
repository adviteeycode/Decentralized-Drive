import { useState } from "react";
import { ethers } from "ethers";
import "./Display.css";

const Display = ({ contract, account }) => {
  const [items, setItems] = useState([]);
  const [otherAddress, setOtherAddress] = useState("");

  const getData = async () => {
    if (!contract) {
      alert("Connect your wallet first");
      return;
    }
    const target = otherAddress && otherAddress.trim() !== "" ? otherAddress.trim() : account;
    if (!target) {
      alert("No address available. Connect wallet or enter address.");
      return;
    }
    if (otherAddress && !ethers.utils.isAddress(otherAddress.trim())) {
      alert("Enter a valid Ethereum address");
      return;
    }
    try {
      const dataArray = await contract.display(target);
      if (!dataArray || dataArray.length === 0) {
        alert("No image to display");
        setItems([]);
        return;
      }
      setItems([...dataArray]);
    } catch (e) {
      // Handle common ethers v5 CALL_EXCEPTION with empty data
      const code = e?.code;
      const reason = e?.error?.message || e?.reason || e?.message || "Unknown error";
      if (code === "CALL_EXCEPTION" && (!e?.error || e?.error?.data === "0x")) {
        alert("Call reverted. Check access permissions, address, network, and contract address.");
      } else if (reason.includes("don't have access")) {
        alert("You don't have access");
      } else {
        alert(reason);
      }
      setItems([]);
    }
  };

  return (
    <>
      <div className="image-list">
        {items.map((item, i) => (
          <a href={item} key={i} target="_blank" rel="noopener noreferrer">
            <img src={item} alt="uploaded" className="image-list" />
          </a>
        ))}
      </div>
      <input
        type="text"
        placeholder="Enter Address"
        className="w-full"
        value={otherAddress}
        onChange={(e) => setOtherAddress(e.target.value)}
      />
      <button className="center button" onClick={getData}>
        Get Data
      </button>
    </>
  );
};

export default Display;
