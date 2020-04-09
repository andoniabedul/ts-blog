import { Request, Response, Router } from 'express';

class Index {
    public router: Router;
    constructor(){
        this.router = Router();
        this.setRoutes();
    }

    setRoutes() {
        this.router.get('/', (req: Request, res: Response)=> res.send('Hello'))
    }
}


const IndexRouter = new Index();
export default IndexRouter.router;