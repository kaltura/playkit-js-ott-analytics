//@flow
import {BasePlugin, Error, FakeEvent} from 'playkit-js';
import {OTTBookmarkService, RequestBuilder} from 'playkit-js-providers/dist/playkit-bookmark-service';

type OttAnalyticsEventType = {[event: string]: string};
const MEDIA_TYPE = 'MEDIA';
const OttAnalyticsEvent: OttAnalyticsEventType = {
  LOAD: 'LOAD',
  PLAY: 'PLAY',
  STOP: 'STOP',
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
    isAnonymous: true,
    startTime: null,
    disableMediaHit: false,
    disableMediaMark: false,
    experimentalEnableLiveMediaHit: false
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

  _isPlaying: boolean = false;
  _isFinished: boolean = false;
  _isStopped: boolean = false;
  _concurrentFlag: boolean = false;
  _fileId: number = 0;
  _didFirstPlay: boolean = false;
  _mediaHitInterval: ?number = null;
  _playerDidError: boolean = false;

  /**
   * @constructor
   * @param {string} name - The plugin name.
   * @param {Player} player - The player instance.
   * @param {Object} config - The plugin config.
   */
  constructor(name: string, player: Player, config: Object) {
    super(name, player, config);
    if (this.config.serviceUrl) {
      this._registerListeners();
    } else {
      this.logger.warn('No service URL provided. Tracking aborted');
    }
  }

  /**
   * reset the plugin.
   * @override
   * @public
   * @returns {void}
   */
  reset(): void {
    this._clearMediaHitInterval();
    this._maybeSendStop();
    this._didFirstPlay = false;
    this._playerDidError = false;
  }

  /**
   * Destroys the plugin.
   * @override
   * @public
   * @returns {void}
   */
  destroy(): void {
    this._maybeSendStop();
    this.eventManager.destroy();
  }

  _maybeSendStop() {
    if (!(this._isFinished || this._isStopped)) {
      this._isStopped = true;
      this._sendAnalytics(OttAnalyticsEvent.STOP, this._eventParams);
    }
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
    this.eventManager.listen(this.player, PlayerEvent.ERROR, e => this._onError(e));
    this.eventManager.listen(this.player, PlayerEvent.VIDEO_TRACK_CHANGED, () => this._onVideoTrackChanged());
    this.eventManager.listen(this.player, PlayerEvent.SOURCE_SELECTED, event => this._onSourceSelected(event));
    this.eventManager.listen(this.player, PlayerEvent.MEDIA_LOADED, () => this._onMediaLoaded());
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
      this.logger.warn('Unable to parse file ID');
    }
  }

  /**
   * The media loaded event listener.
   * @private
   * @returns {void}
   */
  _onMediaLoaded(): void {
    this._sendAnalytics(OttAnalyticsEvent.LOAD, this._eventParams);
  }

  /**
   * The play event listener.
   * @private
   * @returns {void}
   */
  _onPlay(): void {
    this._isPlaying = true;
    this._isStopped = false;
    this._isFinished = false;
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
    this._isFinished = true;
    this._clearMediaHitInterval();
    this._sendAnalytics(OttAnalyticsEvent.FINISH, this._eventParams);
  }

  /**
   * The error event listener.
   * @param {FakeEvent} event - player eventgit chec
   * @private
   * @returns {void}
   */
  _onError(event: FakeEvent): void {
    if (event.payload && event.payload.severity === Error.Severity.CRITICAL) {
      this._isPlaying = false;
      this._playerDidError = true;
      this._clearMediaHitInterval();
    }
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
    if (!this._validate(action)) {
      return;
    }
    const playerData: Object = {
      action: action,
      averageBitrate: 0,
      totalBitrate: 0,
      currentBitrate: 0,
      fileId: params.fileId
    };
    const bookMark: Object = {
      type: params.mediaType,
      id: params.mediaId,
      position: params.position,
      playerData: playerData
    };
    const request: RequestBuilder = OTTBookmarkService.add(this.config.serviceUrl, this.config.ks, bookMark);
    request.doHttpRequest().then(
      data => {
        try {
          // Handle this format: {"result": {"error": {"objectType": "KalturaAPIException","code": 4001,"message": "Concurrent play limitation"}}}
          if (data.result && data.result.error && data.result.error.code && data.result.error.code === 4001) {
            this._concurrentFlag = true;
            this.player.dispatchEvent(new FakeEvent('phoenixConcurrentBlock', data));
            this.logger.debug('Analytics concurrency block returned', data);
          } else {
            this.logger.debug('Analytics event sent', bookMark);
          }
        } catch (e) {
          this.logger.debug('Analytics response parsing failed', data);
        }
      },
      err => {
        this.logger.warn('Failed to send analytics event', bookMark, err);
      }
    );
  }

  _validate(action: string): boolean {
    if (this._playerDidError) {
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
    if (this._concurrentFlag) {
      this.logger.info(`concurreny mode - block analytics`); // block analytics when in concurrency mode
      return false;
    }
    if (this.config.isAnonymous) {
      this.logger.info(`block report for anonymous user`);
      return false;
    }
    const isMediaHit = action === OttAnalyticsEvent.HIT;
    if (isMediaHit && this.config.disableMediaHit) {
      this.logger.info(`block MediaHit report`);
      return false;
    }
    if (!isMediaHit && this.config.disableMediaMark) {
      this.logger.info(`block MediaMark report`);
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
    if (!this.player.isLive() || this.config.experimentalEnableLiveMediaHit) {
      this._clearMediaHitInterval();
      this._mediaHitInterval = setInterval(() => {
        if (this._isPlaying) {
          if (this._concurrentFlag || this._eventParams.position === 0) {
            this.logger.debug('prevent sending MediaHit');
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
    if (this._mediaHitInterval) {
      clearInterval(this._mediaHitInterval);
      this._mediaHitInterval = null;
    }
  }
}
