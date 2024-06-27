import conf from '../conf/conf'
import { Client, Databases,Storage,Query,ID, Role,Permission } from "appwrite";


export class DatabaseService{
    client=new Client();
    databases;
    bucket;
    constructor()
    {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client)
    }

    async createPost({title,slug,content,featuresImage,status,userId})
    {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuresImage,
                    status,
                    userId,
                }
                )
            
        } catch (error) {
            console.log("creating post error:",error)
        }

    }
    async updatePost(slug,{title,content,featuresImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuresImage,
                    status, 
                }
            )
        } catch (error) {
            console.log("update error",error)
            
        }
    }
    async deletePost(slug)
    {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("error in deleting document",error)
            return false;
        }
    }
    async getPost(slug)
    {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
            
        } catch (error) {
            console.log("error in getting post ",error)
            return false;
            
        }
    }
    async getAllPosts(queries=[Query.equal("status", "active")])
    {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,   
            )
            
        } catch (error) {
            console.log("error in getting posts ",error)
            return false
        }
    }

    async getUserPosts(userId) {
        try {
          return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            // but we do not want all type of docs where docs which are inactive will also come
            // so use Query, these are the indexes on apwrite
            [Query.equal("userId", userId)]
          );
        } catch (error) {
          console.log("Error in Get ALl Posts:: ", error);
          return false;
        }
      }
    

    //file upload services....
    async uploadFile(file)
    {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
                
            )
            
        } catch (error) {
            console.log("error in uploading the file ",error)
            return false
        }
    }

    async deleteFile(fileId)
    {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
            
        } catch (error) {
            console.log("error in deleting the file ",error)
            return false
        }
    }

     getFilePreview(fileId)
    {
        console.log(fileId)
        try {
            const file= this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
            if(file){
                console.log(file)
                return file
            }

        } catch (error) {

            console.log(error)
        }
    }


}
const databaseService=new DatabaseService()
export default databaseService;