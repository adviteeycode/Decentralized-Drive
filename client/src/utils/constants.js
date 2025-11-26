

// ! ||--------------------------------------------------------------------------------||
// ! ||                                 Smart Contract                                 ||
// ! ||--------------------------------------------------------------------------------||

import abi from './upload.json'
const envAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
export const contractAddress = (envAddress && envAddress.trim().length > 0)
	? envAddress.trim()
	: '0xd9145CCE52D386f254917e481eB44e9943F39138';
export const contractAbi = abi;


// ! ||--------------------------------------------------------------------------------||
// ! ||                                   Pinata IPFS                                  ||
// ! ||--------------------------------------------------------------------------------||

export const API_Key =  'e6d5e22dd17d4ab3d141'
export const API_Secret=  '5b54884267fa9b923b3d6c3cc760a893c6bfc35df295ce06d61bf50e77430889'
export const JWT= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmNjcxODdmMS1jOWJhLTRhNTItOGY4OS05MjVlODBiMjRlMmUiLCJlbWFpbCI6ImFiaGkzMTc1eWFkYXZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImU2ZDVlMjJkZDE3ZDRhYjNkMTQxIiwic2NvcGVkS2V5U2VjcmV0IjoiNWI1NDg4NDI2N2ZhOWI5MjNiM2Q2YzNjYzc2MGE4OTNjNmJmYzM1ZGYyOTVjZTA2ZDYxYmY1MGU3NzQzMDg4OSIsImV4cCI6MTc5NTcwNjAzNH0.prAk9TwwZr-uWXoa6pFDiqevmvimYNDJ7gya7TBu_Ew'
