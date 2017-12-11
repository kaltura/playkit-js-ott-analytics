// @flow
import {registerPlugin} from 'playkit-js'
import OttAnalytics from './ott-analytics'

declare var __VERSION__: string;
declare var __NAME__: string;

export default OttAnalytics;
export {__VERSION__ as VERSION, __NAME__ as NAME};

/**
 * The plugin name.
 * @type {string}
 * @const
 */
const pluginName: string = "ottAnalytics";

registerPlugin(pluginName, OttAnalytics);
