import { Request, Response, Router } from 'express';


class Posts {
    public router: Router;
    private RESOURCE: string;
    
    constructor(){
        this.router = Router();
        this.RESOURCE = 'posts'; 
        this.setRoutes();
    }
    
    getList(req: Request, res: Response){
        res.send(`[POSTS][getList] SUCCESS`);
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
        this.router.get(`/${this.RESOURCE}/`, this.getList);
        this.router.post(`/${this.RESOURCE}/create/`, this.create);
        this.router.get(`/${this.RESOURCE}/:id/`, this.get);
        this.router.delete(`/${this.RESOURCE}/:id/delete/`, this.delete);
        this.router.post(`/${this.RESOURCE}/:id/update`);
    }
}

const PostsRouter = new Posts();
export default PostsRouter.router;