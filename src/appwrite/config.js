import conf from "../conf/conf.js";
import {Client,Databases,Storage ,Query,ID} from "appwrite"
// import * as Appwrite from "appwrite";

export class Service{
client =new Client();
databases;
bucket;
constructor(){
    this.client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId)
    this.databases=new Databases(this.client)
    this.bucket=new Storage(this.client)
}

async create({title,slug ,content,featuredImage,status,userId}){

try {
    return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
           title,
           content,
           featuredImage,
           status,
           userId 
        }
    )
} catch (error) {
    console.log("appwrite service::createpost error",error)
}

}


async updatePost(slug,{title,content,featuredImage,status}) {
    try {
        return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status
            }
        )
    } catch (error) {
        console.log("appwrite error::update post error",error)
    }

}

async deletePost(slug){
    try {
        await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )
        return true;
    } catch (error) {
        console.log("appwrite error in delete post ",error)
   return false
    }
}


async getPost(slug){
    try {
        return await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )
    } catch (error) {
        console.log("appwrite service error in get post",error)
   return false;
    }
}

async getPosts(queries=[Query.equal("status","active")]){

    try {
        return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries
        )
    } catch (error) {
        console.log("appwrite error in getting the list of post",error)
    return false
    }
}

// files upload services
async uploadFile(file){
    try {
        return await this.bucket.createFile(
            conf.appwriteBucket_id,
            ID.unique(),
            file
        )
    } catch (error) {
        console.log("aapwrite error in file upload",error)
    }
}

async deleteFile(fileId){
    try {
        await this.bucket.deleteFile(conf.appwriteBucket_id,fileId)
        return true;
    } catch (error) {
        console.log("appwrite error in delteing file",error)
      return false;
    }
}

// peviewing is so fast so we dont need for awaiting
getFilePreview(fileId){
    return this.bucket.getFilePreview(
        conf.appwriteBucket_id,
        fileId
    )
}

}

const service=new Service()
export default service