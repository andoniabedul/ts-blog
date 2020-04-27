import PostSchema from '../schemas/post.schema';

class Post {
    constructor(){}
    public async getPosts(){
        const posts = await PostSchema.find();
        return posts;
    }
    public async getPost(url: string){
        const post = await PostSchema.find({ url });
        return post;
    } 
}

const PostModel = new Post();
export default PostModel;