import express, { Request, Response } from "express";

const PrivateAPIRouter = express.Router();

PrivateAPIRouter.get("/test", async (req: Request, res: Response) => {
  return res.status(200).json({ message: "Test from admin api" });
});

PrivateAPIRouter.get("/races", async (req: Request, res: Response) => {
  return res.status(200).json([
    {
      date: "2020-06-09T00:00:00.000Z",
      description: "test1 lad os lige test",
      distances: ["21.1km", "10 km"],
      length: 3,
      host: "FunRunByFlemming",
      place: "Løsning & Hedensted",
      results: {
        "21.1km": [
          { contestantName: "Ida Skjødt", contestantTime: "00:36:09" },
        ],
        "10 km": [{ contestantName: "Ida Skjødt", contestantTime: "00:36:09" }],
      },
      state: 0,
      title: "Test1 - det bedste testløb",
    },
    {
      date: "2020-08-09T00:00:00.000Z",
      description: "test2 lad os lige test",
      distances: ["21.1km", "10 km"],
      length: 3,
      host: "FunRunByFlemming",
      place: "Løsning & Hedensted",
      results: {
        "21.1km": [
          { contestantName: "Ida Skjødt", contestantTime: "00:36:09" },
        ],
        "10 km": [{ contestantName: "Ida Skjødt", contestantTime: "00:36:09" }],
      },
      state: 0,
      title: "Test2 - det anden bedste testløb",
    },
    {
      date: "2021-09-09T00:00:00.000Z",
      description: "test3 Bare lige lidt est",
      distances: ["21.1km", "10 km"],
      length: 3,
      host: "FunRunByFlemming",
      place: "Løsning & Hedensted",
      results: {
        "21.1km": [
          { contestantName: "Lasse Skjødt", contestantTime: "00:46:09" },
          { contestantName: "Frederik Skjødt", contestantTime: "01:46:09" },
        ],
        "10 km": [
          { contestantName: "Klaus Martin", contestantTime: "00:26:09" },
        ],
      },
      state: 0,
      title: "Test3 - hvem gider...",
    },
  ]);
});

export default PrivateAPIRouter;
