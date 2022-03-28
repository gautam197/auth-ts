import { Request, Response, NextFunction } from "express";
import {omit} from "lodash";
import { createUser } from "../service/user.service";
import log from "../logger";

export async function createUserHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await createUser(req.body);
    return res.send(omit(user.toJSON()));
  } catch (e: any) {

    if(e){
        log.error(e);
        return res.status(409).send(e.message);
    }else{
        return res.status(500).json({
            "message": "Internal server error"
        })
    }
  }
}
