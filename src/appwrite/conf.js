import conf from '../conf/conf'
import { Client, ID, Databases, Storage, Query, Account } from 'appwrite'

export class Service {
    Client = new Client();
    databases;
    bucket;

    constructor() {
        this.Client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appWriteProjectId)
        this.databases = new Databases(this.Client)
        this.bucket = new Storage(this.Client)
    }

    async createPost(slug, { title, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appWriteDatabaseID,
                conf.appWriteCollectionId,
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
            alert(error)
        }
    }

    async updatePost(slug, { title, content, featuredImage, status, userId }) {
        try {
            return await this.databases.updateDocument(
                conf.appWriteDatabaseID,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            alert(error)
        }
    }

    async deletePost(slug) {
        try {
            return await this.databases.deleteDocument(
                conf.appWriteDatabaseID,
                conf.appWriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            alert(error)
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appWriteDatabaseID,
                conf.appWriteCollectionId,
                slug
            )
        } catch (error) {
            alert(error)
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status","active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appWriteDatabaseID,
                conf.appWriteCollectionId,
                queries
            )
        } catch (error) {
            alert(error)
            return false;
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appWriteBucketId,
                file
            )
        } catch (error) {
            alert(error)
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appWriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            alert(error)
            return false;
        }
    }

    getFilePreview(fileId) {
            return this.bucket.getFilePreview(
                conf.appWriteBucketId,
                fileId
            )
    }

}