import moment from 'moment';
import 'moment-timezone';
import {DynamicConfig} from "./dynamic_config";
import {StaticConfig} from "./static_config";
import {Express} from "express";


function StartServices(app: Express, _: number,
                       __: StaticConfig,
                       dyn: DynamicConfig) {
    
    dyn.logger.trace('registering GET `/now/:timezone` endpoint');
    app.get('/now/:timezone', (req, res) => {
        const logger = dyn.logger;
        logger.info('hit `/now/:timezone`');
        const format = dyn.cfg.format;
        const timezone = req.params.timezone;
        
        logger.trace('obtained timezone', timezone);
        
        logger.trace('obtaining current time...')
        const now = moment().tz(timezone);
        logger.trace('obtained now time', now);
        
        const nowFormatted = now.format(format);
        res.send({
            now: nowFormatted,
        });
    })
    dyn.logger.trace('GET `/now/:timezone` endpoint registered');
}

export {StartServices}
