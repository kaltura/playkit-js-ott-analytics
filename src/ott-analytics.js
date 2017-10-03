//@flow
import {BasePlugin, registerPlugin} from 'playkit-js'
import BookMarkService from  'playkit-js-providers/dist/bookmarkService'

const pluginName = "ottAnalytics";

/**
 * @classdesc
 */
export default class OttAnalytics extends BasePlugin {
  /**
   * @static
   */
  static defaultConfig: Object = {
    baseUrl: 'http://api-preprod.ott.kaltura.com/v4_6/api_v3',
    mediaHitInterval: 30,
    startTime: null
  };

  /**
   * @static
   * @public
   * @returns {boolean} - Whether the plugin is valid.
   */
  static isValid(): boolean {
    return true;
  }

  _isPlaying: Boolean;
  _concurrentFlag: Boolean;
  _fileId: number;
  _didFirstPlay: Boolean;
  _mediaHitInterval: number;
  _continueTime: number;
  _playFromContinue: Boolean;
  _isPlaying: Boolean;


  /**
   * The Kaltura session
   * @private
   */
  _ks: string;

  /**
   * @constructor
   * @param {string} name - The plugin name.
   * @param {Player} player - The player reference.
   * @param {Object} config - The plugin configuration.
   */
  constructor(name: string, player: Player, config: Object) {
    super(name, player, config);
    this._initializeMembers();
    this._registerListeners();

    player.ready().then(() => {
      this._sendAnalytics('LOAD', this._eventParams);
    });
  }

  /**
   * @public
   * @return {void}
   */
  destroy(): void {
    this.eventManager.destroy();
  }

  /**
   * Register the player event listeners
   * @private
   * @return {void}
   */
  _registerListeners(): void {
    let PlayerEvent = this.player.Event;
    this.eventManager.listen(this.player, PlayerEvent.FIRST_PLAY, this._onFirstPlay.bind(this));
    this.eventManager.listen(this.player, PlayerEvent.PLAY, this._onPlay.bind(this));
    this.eventManager.listen(this.player, PlayerEvent.PAUSE, this._onPause.bind(this));
    this.eventManager.listen(this.player, PlayerEvent.ENDED, this._onEnded.bind(this));
    this.eventManager.listen(this.player, PlayerEvent.SEEKED, this._onSeeked().bind(this));
  }

  /**
   * The play event listener
   * @private
   * @return {void}
   */
  _onPlay(): void {
    this._isPlaying = true;
    this._startMediaHitInterval();
    this._sendAnalytics('PLAY', this._eventParams);
  }

  /**
   * The pause event listener
   * @private
   * @return {void}
   */
  _onPause(): void {
    this._isPlaying = false;
    // During player start up, the player trigger "onpause" events
    // We use didFirstPlay flag to ignore them
    if (this._didFirstPlay) {
      this._sendAnalytics('PAUSE', this._eventParams);
    }
  }

  /**
   * The ended event listener
   * @private
   * @return {void}
   */
  _onEnded(): void {
    this._isPlaying = false;
    this._sendAnalytics('FINISH', this._eventParams);
  }

  /**
   * The first play event listener
   * @private
   * @return {void}
   */
  _onFirstPlay(): void {
    this._didFirstPlay = true;
    this._sendAnalytics("FIRST_PLAY", this._eventParams);

  }

  /**
   * Send seek analytic
   * @private
   * @return {void}
   */
  _onSeeked(): void {
    this._playFromContinue = false;
  }


  /**
   * Get the player params which relevant to analytics request
   * @private
   * @return {Object} - The player params
   */
  get _eventParams(): Object {
    this._ks = this.config.ks;
    return {
      mediaType: "MEDIA",
      mediaId: this.config.entryId,
      fileId: this.config.fileId,
      position: this.player.currentTime
    };
  }

  /**
   * Register the player event listeners
   * @param {number} eventType - The event type
   * @private
   * @return {void}
   */
  _sendAnalytics(action: string, params: Object): void {

    let playerData: Object = {
      action: action,
      averageBitrate: 0, totalBitrate: 0,
      currentBitrate: 0, fileId: params.fileId,
    };

    let bookMark: Object = {
      type: params.mediaType,
      id: params.mediaId,
      position: params.position,
      playerData: playerData
    };

    let request: RequestBuilder = BookMarkService.add(this.config.baseUrl, this._ks, bookMark); //StatsService.collect(this.config.playerVersion, this._ks, {"event": statsEvent}, this.config.baseUrl);
    request.doHttpRequest()
      .then((data) => {
          if (data == 'Concurrent') {
            this._concurrentFlag = true;
          }
          else {
            this.logger.debug(`Analytics event sent `, bookMark);
          }

        },
        err => {
          this.logger.error(`Failed to send analytics event `, statsEvent, err);
        });
  }

  _startMediaHitInterval(): void {
    let _this = this;
    this._clearMediaHitInterval();
    this._mediaHitInterval = setInterval(function () {
      if (_this._isPlaying) {
        _this._playFromContinue = false;
        if (_this._concurrentFlag || _this._eventParams.position == 0) {
          return;
        }
        else {
          this._sendAnalytics("HIT", _this._eventParams);
        }

      }
    }, this.config.mediaHitInterval * 1000);
  }

  _clearMediaHitInterval(): void {
    clearInterval(this._mediaHitInterval);
    this._mediaHitInterval = 0;
  }

  /**
   * Initialize the plugin members
   * @private
   * @return {void}
   */
  _initializeMembers(): void {
    this._ks = "";
    this._isPlaying = false;
    this._concurrentFlag = false;
    this._fileId = 0;
    this._didFirstPlay = false;
    this._mediaHitInterval = 0;
    this._isPlaying = false;

    if (this.config.startTime) {
      this._continueTime = this.config.startTime;
      this._playFromContinue = true;
    }
    else {
      this._continueTime = 0;
      this._playFromContinue = false;
    }
  }
}

/**
 * Register the plugin in the playkit-js plugin framework.
 */
registerPlugin(pluginName, OttAnalytics);
