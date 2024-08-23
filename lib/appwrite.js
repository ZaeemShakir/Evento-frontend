import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.mscproject.evento",
  projectId: "669c07720007fb79ad96",
  databaseId: "669c0960001071121173",
  user_customerCollectionId: "669c099700116784c79d",
  videosCollectionId: "669c09e5003aa5aa91cd",
  storageId: "669c0c7f0000ae504ff9",
  imagesCollectionId:'66c8a5ab002688bf4628',
  postCollectionId:'66c8c3be000e23eea6b9'
};
const client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);
const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
export const createUser = async (email, password, username,usertype) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username,
      usertype
    );
    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(username);
    await SignIn(email, password);
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.user_customerCollectionId,
      ID.unique(),
      { account_id: newAccount.$id, email, username, avatar: avatarUrl,usertype }
    );
    return newUser;
  } catch (error) {
   
    throw new Error(error);
  }
};
export async function SignIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
}
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.user_customerCollectionId,
      [Query.equal("account_id", currentAccount.$id)]
    );
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
   
  }
};
export const getAllPosts=async()=>{
    try{
        const posts =await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videosCollectionId,
            [Query.orderDesc('$createdAt')]
        )
        return posts.documents
    }
    catch(error){
        throw new Error(error)
    }
}
export const getAllCustomPosts=async()=>{
  try{
      const posts =await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.postCollectionId,
          [Query.orderDesc('$createdAt')]
      )
      return posts.documents
  }
  catch(error){
      throw new Error(error)
  }
}
export const getLatestPosts=async()=>{
  try{
      const posts =await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.imagesCollectionId,
          [Query.orderDesc('$createdAt',Query.limit(7))]
      )
      return posts.documents
  }
  catch(error){
      throw new Error(error)
  }
}
export const searchLatestPosts = async (query) => {
  try {
    
    let posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videosCollectionId,
      [Query.search('prompt', query)]
    );


    if (posts.documents.length === 0) {
      posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.videosCollectionId,
        [Query.search('prompt2', query)]
      );
    }

 
    if (posts.documents.length === 0) {
      posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.videosCollectionId,
        [Query.search('prompt3', query)]
      );
    }

  
    if (posts.documents.length === 0) {
      posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.videosCollectionId,
        [Query.search('title', query)]
      );
    }
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};
export const searchLatestImage = async (query) => {
  try {
    
    let posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.imagesCollectionId,
      [Query.search('prompt1', query)]
    );


    if (posts.documents.length === 0) {
      posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.imagesCollectionId,
        [Query.search('prompt2', query)]
      );
    }

 
    if (posts.documents.length === 0) {
      posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.imagesCollectionId,
        [Query.search('prompt3', query)]
      );
    }

  
    if (posts.documents.length === 0) {
      posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.imagesCollectionId,
        [Query.search('title', query)]
      );
    }
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};
export const getUserPosts=async(userId)=>{
  try{
      const posts =await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.videosCollectionId,
          [Query.equal('userCustomers',userId),Query.orderDesc('$createdAt')],
          
      )
      return posts.documents
  }
  catch(error){
      throw new Error(error)
  }
}
export const getUser = async (userId) => {
  try {
    
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.user_customerCollectionId,
      [Query.equal('$id', userId)]
    );
    if (posts.documents.length > 0) {
      console.log(posts.documents[0])
      return posts.documents[0];
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getCustomerPosts=async(userId)=>{
  try{
      const posts =await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.postCollectionId,
          [Query.equal('userCustomers',userId),Query.orderDesc('$createdAt')],
          
      )
      return posts.documents
  }
  catch(error){
      throw new Error(error)
  }
}
export const getUserImages=async(userId)=>{
  try{
      const posts =await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.imagesCollectionId,
          [Query.equal('userCustomers',userId),Query.orderDesc('$createdAt')],
          
      )
      return posts.documents
  }
  catch(error){
      throw new Error(error)
  }
}
export const SignOut =async()=>{
try{
const session= await account.deleteSession('current')
return session
}
catch(error){
  throw new Error(error)
}
}
export const getFilePreview=async(fileId,type)=>{
   let fileUrl;
   try{
    if(type==='video'){
      fileUrl= storage.getFileView(appwriteConfig.storageId,fileId)
    }
      else if(type==='image'){
        fileUrl=storage.getFilePreview(appwriteConfig.storageId,fileId,2000,2000,'top',100)
      }
      else{
        throw new Error('invalid file type')
      }
      if(!fileUrl) throw Error;
      return fileUrl
    }
  
   catch(error){
    throw new Error(error)
   }
}
export const uploadFile=async(file,type)=>{
  
  if(!file) return;
  
  const asset={
    name:file.fileName,
    type:file.mimeType,
    size:file.fileSize,
    uri:file.uri

  }
  
  try{
    const uploadedFile=await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      asset
    );
   
    const fileUrl=await getFilePreview(uploadedFile.$id,type)
  return fileUrl
  }
  catch(error){
    throw new Error(error)
  }
}
export const createVideo=async(form)=>{
try{
 const [thumbnailUrl, videoUrl]=await Promise.all([
  uploadFile(form.thumbnail,'image'),
  uploadFile(form.video,'video')

 ])
 const newPost= await databases.createDocument(
  appwriteConfig.databaseId,appwriteConfig.videosCollectionId,ID.unique(),{
    title:form.title,
    video:videoUrl,
    thumbnail:thumbnailUrl,
    prompt:form.prompt,
    prompt2:form.prompt2,
    prompt3:form.prompt3,
    userCustomers:form.userId
  }
 )
 return newPost;
}
catch(error){
  throw new Error(error)
}
}
export const createImage=async(form)=>{
  
  try{
    const [thumbnailUrl]=await Promise.all([ uploadFile(form.image,'image'),])
   const newPost= await databases.createDocument(
    appwriteConfig.databaseId,appwriteConfig.imagesCollectionId,ID.unique(),{
      title:form.title,
      image:thumbnailUrl,
      prompt1:form.prompt1,
      prompt2:form.prompt2,
      prompt3:form.prompt3,
      userCustomers:form.userId
    }
   )
   return newPost;
  }
  catch(error){
    throw new Error(error)
  }
}
export const createPost=async(form)=>{
    try {
  
      const newPost = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        ID.unique(),
        { event_name:form.event_name,
          event_desc:form.event_desc,
          event_data:form.event_date,
          event_loc:form.event_loc,
          userCustomers:form.userId
        }
      );
      return newPost;
    } catch (error) {
     
      throw new Error(error);
    }
}
export const deleteCurrentPost = async (id) => {
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      id 
    );
    return { success: true }; 
  } catch (error) {
    throw new Error(error.message);
  }
};
