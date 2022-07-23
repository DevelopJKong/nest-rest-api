import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class CoreMiddleware implements NestMiddleware {
    async use(req:Request,res:Response,next:NextFunction) {

        next();
    }
}