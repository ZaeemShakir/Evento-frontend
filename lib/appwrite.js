import { Alert } from "react-native";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";
{/*configuration needed to use appwrite*/}
{/*it consist of all the IDs required when developing the application*/}
export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.mscproject.evento",
  projectId: "669c07720007fb79ad96",
  databaseId: "669c0960001071121173",
  user_customerCollectionId: "669c099700116784c79d",
  videosCollectionId: "669c09e5003aa5aa91cd",
  storageId: "669c0c7f0000ae504ff9",
  imagesCollectionId:'66c8a5ab002688bf4628',
  postCollectionId:'66c8c3be000e23eea6b9',
  chatCollectionId:'66cf8ce60032b8f98d16',
  messageCollectionId:'66cf8fc5003e2087fe16',
  reviewCollectionId:'66d10aa2000693891565'
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
    //getting the file url according to the type
    if(type==='video'){
      fileUrl= storage.getFileView(appwriteConfig.storageId,fileId)
    }
      else if(type==='image'){
        //if the file is an image setting up the dimenstions of the file
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
  //distributing the asset according to the file data
  const asset={
    name:file.fileName,
    type:file.mimeType,
    size:file.fileSize,
    uri:file.uri
  }
  //uploading the asset to the database
  try{
    const uploadedFile=await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      asset
    );
    //getting the url of the uploaded file
    const fileUrl=await getFilePreview(uploadedFile.$id,type)
  return fileUrl
  }
  catch(error){
    throw new Error(error)
  }
}
export const createVideo=async(form)=>{
try{
  // sending the uri ad thumbnail of the video to be stored in the storage of appwrite
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
    //sending the image to be stored in the storage and getting the url in return
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
       // creating a job post for the user
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
export const searchLatestJobs = async (query) => {
  try {
    //search post according to event name
    let posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.search('event_name', query)]
    );
    //search post according to description
    if (posts.documents.length === 0) {
      posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        [Query.search('event_desc', query)]
      );
    }
    //search post according to event location
    if (posts.documents.length === 0) {
      posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        [Query.search('event_loc', query)]
      );
    }
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};
export const applyJob = async (documentId, userId) => {
  try {
    // Fetch the current document to get existing applicants
    const document = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      documentId
    );
    // Check if the 'vendor_application' field exists in the document
    if (!document.vendor_appliation) {
      throw new Error('Field `vendor_application` does not exist in the document');
    }
    // Check if the document already contains the userId
    const applicants = document.vendor_appliation || [];
    if (applicants.includes(userId)) {
      throw new Error('User has already applied');
    }
    // Update the document with the new userId
    const response = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      documentId,
      {
        vendor_appliation: [...applicants, userId], // add userId
      }
    );
    return { success: true, data: response };
  } catch (error) {
    throw new Error(error.message);
  }
};
export const startChatting = async (user1_id, user2_id) => {
  try {
    //creating a chat room id
      const chat_id = [user1_id, user2_id].sort().join('_');
      //checking if the chat id is valid or not
      const validChatId = chat_id.length > 36 ? chat_id.substring(0, 36) : chat_id;
      //checking if the chat id exist 
      const existingChats = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.chatCollectionId,
        [Query.equal('chat_id', validChatId)]
      ); 
      //if it doesnot creating a chat room
      if (existingChats.total === 0) {
        const response = await databases.createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.chatCollectionId,
          validChatId,
          {
            chat_id: validChatId,
            user1_id,
            user2_id,
          }
        );
        return { success: true, data: response };
      } else {
        //if the chat id already exist
        const chat = existingChats.documents[0];
        return { success: true, data: chat };
      }
    } catch (error) {
      console.error('Error initializing chat:', error.message);
      throw new Error(error.message);
    }
};
export const sendMessage = async (chat_id, sender_id, messageContent) => {
  try {
    
    const response = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.messageCollectionId,
      ID.unique(), 
      {
        chat_id,
        sender_id,
        body: messageContent,
        timestamp: new Date().toISOString()
      }
    );
    return { success: true, data: response };
  } catch (error) {
    console.error('Error sending message:', error.message);
    throw new Error(error.message);
  }
};
export const getMessages = async (chat_id) => {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.messageCollectionId,
      [Query.equal('chat_id', chat_id)],
      ['timestamp']
    );
    return response.documents ;
  } catch (error) {
    console.error('Error retrieving messages:', error.message);
    throw new Error(error.message);
  }
};
export const getChats = async (Id) => {
  try {
    //checking if the request is made by customer
    let response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.chatCollectionId,
      [Query.equal('user1_id', Id)],
    );
  // checking if the request is made by vendor
    if(response.total===0){
       response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.chatCollectionId,
        [Query.equal('user2_id', Id)],
      );
    }
    //getting the chats using chat id 
    if(response.total===0){
      response = await databases.listDocuments(
       appwriteConfig.databaseId,
       appwriteConfig.chatCollectionId,
       [Query.equal('chat_id', Id)],
     );
   }
    return  response.documents ;
  } catch (error) {
    console.error('Error retrieving messages:', error.message);
    throw new Error(error.message);
  }
};
export const getUserReview=async(userId)=>{
  try{
      const posts =await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.reviewCollectionId,
          [Query.equal('user_id',userId),Query.orderDesc('$createdAt')],
      )
      return posts.documents
  }
  catch(error){
      throw new Error(error)
  }
}

export const createReview=async(user_id,body,rating,reviewer_id)=>{
  try {
    console.log(user_id,body,rating,reviewer_id)
    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.reviewCollectionId,
      ID.unique(),
      { user_id:user_id,
        body:body,
        rating:rating,
        reviewer_id:reviewer_id,
        timestamp:new Date().toISOString()
      }
    );
    return newPost;
  } catch (error) {
   
    throw new Error(error);
  }
}