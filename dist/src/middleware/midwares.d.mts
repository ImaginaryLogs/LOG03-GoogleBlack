import { NextFunction, Request, Response } from "express";
/**
 * Logs the actions of a function
 * @param {Request} req the requested data
 * @param {Response} res the response of the function
 * @param {string} mes custom made message by the function
 * @param {number} tab number of tabs
 */
export declare function log_actions(req: Request, res: Response, mes?: string, tab?: number): void;
/**
 * Handles errors made by the server via return appropriate responses of 400s
 * @param {Error} error Error caused
 * @param {Request} req Request
 * @param {Response} res Response
 * @param {NextFunction} next Next function down the script
 * @returns {Response} Returns an error response
 */
export declare const error_handler: (error: Error, req: Request, res: Response, next: NextFunction) => Response;
export declare const try_redirect: (controller: Function) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
