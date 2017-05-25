import * as async from "async";
import * as request from "request";
import * as graph from "fbgraph";
import {IWordHandler, WordHandler} from "../components/wordHandler";

import {Response, Request, NextFunction} from "express";


/**
 * GET /api
 * List of API examples.
 */
export let getApi = (req: Request, res: Response) => {
  res.render("api/index", {
    title: "API Examples"
  });
};

export let getNouns = (req: Request, res: Response) => {
  const wordHandler: IWordHandler = new WordHandler();
  wordHandler.getNouns(req.body).then(i => {res.write(i); });
};
