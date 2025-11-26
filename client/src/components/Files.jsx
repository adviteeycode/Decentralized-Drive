import { useState } from "react"
import { ethers } from "ethers"
import Spinner from "./Spinner"




export default function Files({ contract, account, shared, title }) {


  const [allfiles, setAllFiles] = useState([])
  const [otherAddress, setOtherAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState("")
  console.log('files:contract', contract)
  console.log('files:account', account)


  const GetAllFiles = async () => {
    if (!contract || !account) {
      alert("Connect your wallet first");
      return;
    }
    try {
      setLoading(true)
      setStatusMessage(shared ? "Fetching shared files..." : "Fetching your files...")
      if (shared) {
        if (!otherAddress) {
          alert("Enter the owner's address");
          return;
        }
        if (!ethers.utils.isAddress(otherAddress)) {
          alert("Enter a valid Ethereum address");
          return;
        }
        const files = await contract.display(otherAddress);
        console.log('files', files)
        setAllFiles(files)
      } else {
        const files = await contract.display(account)
        setAllFiles(files)
      }
    } catch (e) {
      const reason = e?.error?.message || e?.reason || e?.message || "Unknown error";
      alert(reason.includes("don't have access") ? "You don't have access" : reason);
      setAllFiles([])
    } finally {
      setLoading(false)
      setStatusMessage("")
    }
  }
 
  return (
    <>


    <div className="text-3xl font-bold  shadow-sm text-slate-50   border-bottom-1"> {title} </div>
 
      <div className="grid grid-cols-5   w-2/3   gap-1 left mb-3"> 
      
      { shared ?  <> 
      <button className=" button  p-2 w-full col-span-1 " onClick={GetAllFiles} disabled={loading}>
      Load Files
    </button> 


    <input
        type="text"
        placeholder="Enter Others Address "
        className="w-full  col-span-2   "
        value={otherAddress}
        onChange={(e)=>setOtherAddress(e.target.value)}
      />

    
    </> 
    
     : 
      <button className=" button  p-2 w-48 " onClick={GetAllFiles} disabled={loading}>
      Load Files
    </button>
      }
   
      </div>

      {loading && (
        <div className="mb-6 flex items-center gap-3 text-white">
          <Spinner size="h-5 w-5" />
          <span className="text-sm">{statusMessage || 'Loading...'}</span>
        </div>
      )}



      <ul role="list" className="divide-y divide-gray-100  grid grid-cols-1 md:grid-cols-3  gap-5  ">
        {!loading && allfiles.length === 0 && (
          <li className="col-span-full rounded-xl bg-gray-900/40 p-6 text-center text-sm text-white">
            No files loaded yet. Tap "Load Files" to fetch data.
          </li>
        )}
        {allfiles.map((file) => (
          <li key={file} className="flex justify-between gap-x-1  py-2 px-4 bg-gray-100 rounded-2xl">
            <div className="flex min-w-0 gap-x-4">
              <img className="h-24 w-24 flex-none rounded-full bg-gray-50" src={file} alt=" Image" />
              <div className="min-w-0    ">
                <a href={file} target="_blank"  rel="noopener noreferrer">
                  <p className="text-sm font-semibold leading-6 text-gray-900 whitespace-normal break-words mb-1 "> {file.substring(36)}</p>
                <button className="py-1 px-5 border-black border text-sm  ">    View   </button>
                </a>



              </div>
            </div>

          </li>
        ))}
      </ul>
    </>
  )
}


 