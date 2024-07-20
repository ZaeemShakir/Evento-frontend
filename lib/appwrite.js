import { Account, Client, ID } from 'react-native-appwrite';



export const appwriteConfig={
    endpoint:'https://cloud.appwrite.io/v1',
    platform:'com.mscproject.evento',
    projectId:'669c07720007fb79ad96',
    databaseId:'669c0960001071121173',
    user_customerCollectionId:'669c099700116784c79d',
    videosCollectionId:'669c09e5003aa5aa91cd',
    storageId:'669c0c7f0000ae504ff9'
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform) 

    const account = new Account(client);
export const createUser=()=>{
    account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
        .then(function (response) {
            console.log(response);
        }, function (error) {
            console.log(error);
        });
}
    ;