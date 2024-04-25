var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import styles from 'ansi-styles';
import dotenv from 'dotenv';
import * as proc from 'process';
dotenv.config({});
const http_method_colors = {
    'GET': styles.green,
    'POST': styles.yellow,
    'DELETE': styles.red,
};
/**
 * Get time at current process.
 * @returns retuns time stamp
 */
function get_time() {
    const date = new Date();
    const hour = date.getHours();
    const mins = date.getMinutes();
    const time_info = `${("0" + hour).slice(-2)}${mins}:${("0" + mins).slice(-2)}${mins} `;
    return time_info;
}
/**
 * Logs the actions of a function
 * @param {Request} req the requested data
 * @param {Response} res the response of the function
 * @param {string} mes custom made message by the function
 * @param {number} tab number of tabs
 */
export function log_actions(req, res, mes = "", tab = 0) {
    if (proc.env.LOG_MID == 'n') {
        return;
    }
    const method = req.method;
    const color_code = http_method_colors;
    const logging_data = `${get_time()} | ${color_code}${method} ${styles.white}${req.originalUrl}`;
    var tab_chars = '\t';
    for (var steps = 0; steps < tab + 1; steps++) {
        tab_chars = tab_chars + '\t';
    }
    const head_style = `${{ http_method_colors }[method]}${tab_chars}`;
    console.log(logging_data);
    switch (method) {
        case 'GET':
            console.log(`${head_style}└─╢ RES: ${styles.white}${mes}`);
            break;
        case 'POST':
            console.log(`${head_style}└─╢ REQ: ${styles.white}===============|`);
            console.log(Request.toString);
            break;
        case 'DELETE':
            console.log(`${head_style}└─╢ DEL: ${styles.white}---------------|`);
            console.log(Request.toString);
            break;
        default:
            console.log("ERROR");
            break;
    }
}
/**
 * Handles errors made by the server via return appropriate responses of 400s
 * @param {Error} error Error caused
 * @param {Request} req Request
 * @param {Response} res Response
 * @param {NextFunction} next Next function down the script
 * @returns {Response} Returns an error response
 */
export const error_handler = (error, req, res, next) => {
    const method = req.method;
    // Take note, 'y'es or 'n'o values only
    const head_style = `${{ http_method_colors }[method]}`;
    var error_mes = `${get_time()} ${styles.redBright}[!]: SERVER ERROR${styles.white}`;
    console.log(`${get_time()} ${styles.yellow}${req.baseUrl} ${head_style}`);
    if (process.env.LOG_MID == 'y') {
        error_mes = `${styles.red}└─╢ ERR (${error.name}): ${styles.white}${error.message}`;
        console.log(error_mes);
        console.error(error);
    }
    console.log(error_mes);
    switch (error.name) {
        case 'ERR_INVALID_ARG_TYPE':
            return res.status(400).send('No input');
        case 'ENOENT':
            return res.status(400).send('Bad input address');
    }
    return res.status(400).send('Unknown');
};
export const try_redirect = (controller) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield controller(req, res);
    }
    catch (error) {
        return next(error);
    }
});
//# sourceMappingURL=midwares.js.map