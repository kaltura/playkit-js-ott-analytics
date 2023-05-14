// @flow
import {registerPlugin} from '@playkit-js/kaltura-player-js';
import {OttAnalytics} from './ott-analytics';

declare var __VERSION__: string;
declare var __NAME__: string;

const VERSION = __VERSION__;
const NAME = __NAME__;

export default OttAnalytics;
export {VERSION, NAME};

/**
 * The plugin name.
 * @type {string}
 * @const
 */
const pluginName: string = 'ottAnalytics';

registerPlugin(pluginName, OttAnalytics);
