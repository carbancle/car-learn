import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export interface CustomRequest extends Request {
  authUser: any;
}

const auth = async (req: CustomRequest, res: Response, next: NextFunction) => {
  // 토큰을 request headers 에서 가져오기
  const authHeader = req.headers["authorization"];

  // Bearer token
  const token = authHeader ? authHeader.split(" ")[1] : "null";
  if (token === null) return res.sendStatus(401);

  try {
    // 토큰이 유효한지 확인
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET 값이 존재하지 않습니다.");
    }
    // typescript 에서 decode의 types 확인이 필요함. 임시로 any 처리
    const decode: any = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decode.userId });
    if (!user) {
      return res.status(400).send("존재하지 않는 유저입니다.");
    }

    // skipLibCheck: true 기준, 전역 변수 express.d.ts 설정 시 type error 확인되지 않으나,
    // nodemon 실행 시 ts2339 에러 확인 됨, (이전 작업과 동일 환경으로 교체해도 발생함...)
    // interface 생성 후 필요한 값을 any type 처리하여 임시 해결
    req.authUser = user;
    next();
  } catch (e) {
    next(e);
  }
};

export { auth };
