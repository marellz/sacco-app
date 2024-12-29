import { NextFunction } from "express";

const verify = (req: Request, res: Response, next: NextFunction) : void  => {
    next();
}

export default verify;