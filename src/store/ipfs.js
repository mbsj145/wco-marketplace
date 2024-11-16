import { create as ipfsHttpClient } from 'ipfs-http-client';
// const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');
import axios  from "axios";
export const CreateIPFS = (fileImg) => {
    return new Promise(async (resolve, reject)=>{
            // const added = await client.add(data);
            // const uri = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
          const formData = new FormData();
          formData.append("file", fileImg);
          const resFile = await axios({
              method: "post",
              url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
              data: formData,
              headers: {
                  'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzYWUwZDgyZi1mMGEzLTRiYjUtYTk0ZS1jOGYzOGFjNGU2M2IiLCJlbWFpbCI6Im1ic2oxNDVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjNiOGM1YWQzYjlkOGIyZDZkMGFkIiwic2NvcGVkS2V5U2VjcmV0IjoiZjA2OGNiNzE4ZmNiNWRjMzI1MWYzYWQ0ZmMyNzg4ZTM2ZGJjY2Y1MmY0ZTgwZTdlMzRjY2RhNTAxZGFiZTlmMiIsImlhdCI6MTY3NzM1MjAwNH0.66ReU19p6L5Xa8eT-f1tvtcfpVXDRA2_SbVtmGacqI0",
                  'pinata_api_key': `3b8c5ad3b9d8b2d6d0ad`,
                  'pinata_secret_api_key': `f068cb718fcb5dc3251f3ad4fc2788e36dbccf52f4e80e7e34ccda501dabe9f2`,
                  "Content-Type": "multipart/form-data"
              },
          });
          const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
          return resolve(ImgHash);
    })
};

export const CreateIPFSMetadata = (data) => {
  return new Promise(async (resolve, reject)=>{
          // const added = await client.add(data);
          // const uri = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

        const resFile = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
            data: data,
            headers: {
                'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzYWUwZDgyZi1mMGEzLTRiYjUtYTk0ZS1jOGYzOGFjNGU2M2IiLCJlbWFpbCI6Im1ic2oxNDVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjNiOGM1YWQzYjlkOGIyZDZkMGFkIiwic2NvcGVkS2V5U2VjcmV0IjoiZjA2OGNiNzE4ZmNiNWRjMzI1MWYzYWQ0ZmMyNzg4ZTM2ZGJjY2Y1MmY0ZTgwZTdlMzRjY2RhNTAxZGFiZTlmMiIsImlhdCI6MTY3NzM1MjAwNH0.66ReU19p6L5Xa8eT-f1tvtcfpVXDRA2_SbVtmGacqI0",
                'pinata_api_key': `3b8c5ad3b9d8b2d6d0ad`,
                'pinata_secret_api_key': `f068cb718fcb5dc3251f3ad4fc2788e36dbccf52f4e80e7e34ccda501dabe9f2`,
                'Content-Type': 'application/json', 
            },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        return resolve(ImgHash);
  })
};