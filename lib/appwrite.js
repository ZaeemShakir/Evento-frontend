import { Account, Avatars, Client, Databases, ID } from 'react-native-appwrite';



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
    const avatars=new Avatars(client);
    const databases=new Databases(client)
export const createUser= async(email,password,username)=>{
   try{
        const newAccount=await account.create(
            ID.unique(),
            email,
            password,
            username

        )
        if(!newAccount) throw Error;
        const avatarUrl= avatars.getInitials(username)
        await SignIn(email, password)
        const newUser=await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.user_customerCollectionId,
            ID.unique(),
           { account_id:newAccount.$id,
            email,
            username,avatar:avatarUrl
           }
        )
        return newUser
   }
   catch(error){
    console.log(error)
    throw new Error(error);
   }

}
export const SignIn=async(email,password)=>{
    try{
        const session=await account.createEmailPasswordSession(email,password)
        return session
    }   
    catch(error){
        throw new  Error(error)
    }
}
    ;