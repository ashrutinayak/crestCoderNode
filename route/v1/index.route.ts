import express from "express"; 
import userRouter from "./user.route";

const router: express.Router = express.Router();

router.get('/', (req, res) => {
    return res.json({ message: 'Hello World!' });
});
router.use('/users', userRouter);

export default router;
 