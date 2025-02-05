import { NextFunction, Request, Response } from "express";

const logger = (req: Request, _res: Response, next: NextFunction) => {
    console.log(new Date().toISOString(), req.method, req.url, req.body, req.ip)
    next()
}

export default logger