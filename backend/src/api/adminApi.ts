import express, { Request, Response } from "express";

const PrivateAPIRouter = express.Router();

PrivateAPIRouter.get("/test", async (req: Request, res: Response) => {
  return res.status(200).json({ message: "Test from admin api" });
});

export default PrivateAPIRouter;
