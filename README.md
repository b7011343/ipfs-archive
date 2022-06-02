# ipfs-archive

## An open-source application which will allow you to freely backup your system data to IPFS, by utilising the <a target='_blank' href='https://web3.storage'>web3.storage</a> API.

## Guide
1. Make an account on <a target='_blank' href='https://web3.storage'>web3.storage</a>
2. Generate an API key on your web3.storage account
3. Clone or download this repository
4. Run `npm install`
5. Compile an executable for your particular operating system
    - Windows `electron:package:win`
    - Mac `electron:package:mac`
    - Linux `electron:package:linux`
6. Run the executable and navigate to the settings tab, where you can input your API key
7. Start a backup manually, or configure scheduled backups

## FAQ

### - What is web3.storage?
It is an IPFS gateway that provides 1TB of storage to all users for free. If you exceed this limit, then you are able to request additional space, which you will generally not be charged for.

### - How do I generate a web3.storage API key?
Refer to the following link: https://web3.storage/docs/#get-an-api-token
