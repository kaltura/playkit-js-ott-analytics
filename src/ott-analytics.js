//@flow
import {BasePlugin} from 'playkit-js'
import {OTTBookmarkService, RequestBuilder} from 'playkit-js-providers/dist/playkit-bookmark-service'

type OttAnalyticsEventType = { [event: string]: string };
const MEDIA_TYPE = 'MEDIA';
const CONCURRENT = 'Concurrent';
const OttAnalyticsEvent: OttAnalyticsEventType = {
  LOAD: 'LOAD',
  PLAY: 'PLAY',
  PAUSE: 'PAUSE',
  FINISH: 'FINISH',
  FIRST_PLAY: 'FIRST_PLAY',
  BITRATE_CHANGE: 'BITRATE_CHANGE',
  HIT: 'HIT'
};

export default class OttAnalytics extends BasePlugin {
  /**
   * The default configuration of the plugin.
   * @type {Object}
   * @static
   */
  static defaultConfig: Object = {
    mediaHitInterval: 30,
    startTime: null,
    disableMediaHit: false,
    disableMediaMark: false
  };

  /**
   * Whether the ima plugin is valid.
   * @static
   * @override
   * @public
   */
  static isValid(): boolean {
    return true;
  }

  _isPlaying: boolean;
  _concurrentFlag: boolean;
  _fileId: number;
  _didFirstPlay: boolean;
  _mediaHitInterval: number;
  _continueTime: number;
  _playFromContinue: boolean;
  _isPlaying: boolean;

  /**
   * @constructor
   * @param {string} name - The plugin name.
   * @param {Player} player - The player instance.
   * @param {Object} config - The plugin config.
   */
  constructor(name: string, player: Player, config: Object) {
    super(name, player, config);
    if (this.config.serviceUrl) {
      this._initializeMembers();
      this._registerListeners();
      this._sendAnalytics(OttAnalyticsEvent.LOAD, this._eventParams);
    } else {
      this.logger.warn('No service URL provided. Tracking aborted');
    }
  }

  /**
   * Destroys the plugin.
   * @override
   * @public
   * @returns {void}
   */
  destroy(): void {
    this.eventManager.destroy();
  }

  /**
   * Registers the player listeners.
   * @private
   * @returns {void}
   */
  _registerListeners(): void {
    const PlayerEvent = this.player.Event;
    this.eventManager.listen(this.player, PlayerEvent.FIRST_PLAY, () => this._onFirstPlay());
    this.eventManager.listen(this.player, PlayerEvent.PLAY, () => this._onPlay());
    this.eventManager.listen(this.player, PlayerEvent.PAUSE, () => this._onPause());
    this.eventManager.listen(this.player, PlayerEvent.ENDED, () => this._onEnded());
    this.eventManager.listen(this.player, PlayerEvent.SEEKED, () => this._onSeeked());
    this.eventManager.listen(this.player, PlayerEvent.VIDEO_TRACK_CHANGED, () => this._onVideoTrackChanged());
    this.eventManager.listen(this.player, PlayerEvent.CHANGE_SOURCE_STARTED, () => this._onChangeSourceStarted());
    this.eventManager.listen(this.player, PlayerEvent.SOURCE_SELECTED, event => this._onSourceSelected(event));
  }

  /**
   * The source selected event listener.
   * @param {Object} event - The event object.
   * @private
   * @returns {void}
   */
  _onSourceSelected(event: Object): void {
    try {
      const source = event.payload.selectedSource[0];
      const parts = source.id.split(',');
      const id = parts[0];
      this._fileId = parseInt(id);
    } catch (e) {
      this.logger.error(e);
    }
  }

  /**
   * The play event listener.
   * @private
   * @returns {void}
   */
  _onPlay(): void {
    this._isPlaying = true;
    this._startMediaHitInterval();
    this._sendAnalytics(OttAnalyticsEvent.PLAY, this._eventParams);
  }

  /**
   * The pause event listener.
   * @private
   * @returns {void}
   */
  _onPause(): void {
    this._isPlaying = false;
    if (this._didFirstPlay) {
      this._sendAnalytics(OttAnalyticsEvent.PAUSE, this._eventParams);
    }
  }

  /**
   * The ended event listener.
   * @private
   * @returns {void}
   */
  _onEnded(): void {
    this._isPlaying = false;
    this._clearMediaHitInterval();
    this._sendAnalytics(OttAnalyticsEvent.FINISH, this._eventParams);
  }

  /**
   * The first play event listener.
   * @private
   * @returns {void}
   */
  _onFirstPlay(): void {
    this._didFirstPlay = true;
    this._sendAnalytics(OttAnalyticsEvent.FIRST_PLAY, this._eventParams);
  }

  /**
   * Sets _playFromContinue to false on seeked event.
   * @private
   * @returns {void}
   */
  _onSeeked(): void {
    this._playFromContinue = false;
  }

  /**
   * Send BITRATE_CHANGE analytic.
   * @private
   * @returns {void}
   */
  _onVideoTrackChanged(): void {
    this._sendAnalytics(OttAnalyticsEvent.BITRATE_CHANGE, this._eventParams);
  }

  /**
   * Sets _didFirstPlay to false on media change.
   * @private
   * @returns {void}
   */
  _onChangeSourceStarted(): void {
    this._didFirstPlay = false;
  }

  /**
   * Get the player params which relevant to analytics request.
   * @private
   * @returns {Object} - The player params
   */
  get _eventParams(): Object {
    return {
      mediaType: MEDIA_TYPE,
      fileId: this._fileId,
      mediaId: this.config.entryId,
      position: this.player.currentTime
    };
  }

  /**
   * Send analytics.
   * @param {string} action - The action
   * @param {string} params - The params
   * @private
   * @returns {void}
   */
  _sendAnalytics(action: string, params: Object): void {
    if (!this._validate(action === OttAnalyticsEvent.HIT)) {
      return;
    }
    const playerData: Object = {
      action: action,
      averageBitrate: 0,
      totalBitrate: 0,
      currentBitrate: 0,
      fileId: params.fileId,
    };
    const bookMark: Object = {
      type: params.mediaType,
      id: params.mediaId,
      position: params.position,
      playerData: playerData
    };
    const request: RequestBuilder = OTTBookmarkService.add(this.config.serviceUrl, this.config.ks, bookMark);
    request.doHttpRequest()
      .then((data) => {
        if (data === CONCURRENT) {
          this._concurrentFlag = true;
        } else {
          this.logger.debug('Analytics event sent', bookMark);
        }
      }, err => {
        this.logger.error('Failed to send analytics event', bookMark, err);
      });
  }

  _validate(isMediaHit: boolean): boolean {
    if (isMediaHit && this.config.disableMediaHit) {
      this.logger.info(`block MediaHit report`);
      return false;
    }
    if (!isMediaHit && this.config.disableMediaMark) {
      this.logger.info(`block MediaMark report`);
      return false;
    }
    if (!this.config.ks) {
      this._logMissingParam('ks');
      return false;
    }
    if (!this.config.entryId) {
      this._logMissingParam('entryId');
      return false;
    }
    if (!this._fileId) {
      this._logMissingParam('fileId');
      return false;
    }
    return true;
  }

  _logMissingParam(missingParam: string): void {
    this.logger.warn(`block report because of missing param ${missingParam}`);
  }

  /**
   * Starts the media hit interval.
   * @private
   * @returns {void}
   */
  _startMediaHitInterval(): void {
    if (!this.player.isLive()) {
      this._clearMediaHitInterval();
      this._mediaHitInterval = setInterval(() => {
        if (this._isPlaying) {
          this._playFromContinue = false;
          if (this._concurrentFlag || this._eventParams.position === 0) {
            return;
          } else {
            this._sendAnalytics(OttAnalyticsEvent.HIT, this._eventParams);
          }
        }
      }, this.config.mediaHitInterval * 1000);
    }
  }

  /**
   * Clears the media hit interval.
   * @private
   * @returns {void}
   */
  _clearMediaHitInterval(): void {
    clearInterval(this._mediaHitInterval);
    this._mediaHitInterval = 0;
  }

  /**
   * Initializes the class members.
   * @private
   * @returns {void}
   */
  _initializeMembers(): void {
    this._isPlaying = false;
    this._concurrentFlag = false;
    this._fileId = 0;
    this._didFirstPlay = false;
    this._mediaHitInterval = 0;
    this._isPlaying = false;
    if (this.config.startTime) {
      this._continueTime = this.config.startTime;
      this._playFromContinue = true;
    } else {
      this._continueTime = 0;
      this._playFromContinue = false;
    }
  }
}
