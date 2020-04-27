import { Request, Response, Router } from 'express';
import PostModel from '../models/post.models';


class Post {
    public router: Router;
    
    constructor(){
        this.router = Router();
        this.setRoutes();
    }
    
    async getList(req: Request, res: Response){
        const posts = await PostModel.getPosts();
        res.send({ success: true, data: { posts } });
    }
    get(req: Request, res: Response){
        const id: string = req.params.id;
        res.send(`[POSTS][get] SUCCESS -> ${id}`);
    }
    create(req: Request, res: Response){
        res.send(`[POSTS][create] SUCCESS`);
    }
    update(req: Request, res: Response){
        const id: string = req.params.id;
        res.send(`[POSTS][update] SUCCESS -> ${id}`);
    }
    delete(req: Request, res: Response){
        res.send(`[POSTS][delete] SUCCESS`);
    }

    setRoutes(){
        this.router.get(`/`, this.getList);
        this.router.post(`/create/`, this.create);
        this.router.get(`/:id/`, this.get);
        this.router.delete(`/:id/delete/`, this.delete);
        this.router.put(`/:id/update`, this.update);
    }
}

const PostRouter = new Post();
export default PostRouter.router;