//@flow
import {BasePlugin, Error, FakeEvent} from 'playkit-js';
import {OTTBookmarkService, RequestBuilder} from 'playkit-js-providers/dist/playkit-bookmark-service';

type OttAnalyticsEventType = {[event: string]: string};
const MEDIA_TYPE = 'MEDIA';
const BookmarkEvent: OttAnalyticsEventType = {
  LOAD: 'LOAD',
  PLAY: 'PLAY',
  STOP: 'STOP',
  PAUSE: 'PAUSE',
  FINISH: 'FINISH',
  FIRST_PLAY: 'FIRST_PLAY',
  BITRATE_CHANGE: 'BITRATE_CHANGE',
  HIT: 'HIT'
};

const BookmarkError = {
  BOOKMARK_ERROR: 'bookmarkerror',
  CONCURRENCY_LIMIT: 'concurrencylimit'
};

const CONCURRENCY_ERROR_CODE: string = '4001';

class OttAnalytics extends BasePlugin {
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
    this._clearMediaHitInterval();
    this.eventManager.destroy();
  }

  _maybeSendStop() {
    if (!(this._isFinished || this._isStopped)) {
      this._isStopped = true;
      this._sendAnalytics(BookmarkEvent.STOP, this._eventParams);
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
    this._sendAnalytics(BookmarkEvent.LOAD, this._eventParams);
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
    this._sendAnalytics(BookmarkEvent.PLAY, this._eventParams);
  }

  /**
   * The pause event listener.
   * @private
   * @returns {void}
   */
  _onPause(): void {
    this._isPlaying = false;
    if (this._didFirstPlay) {
      this._sendAnalytics(BookmarkEvent.PAUSE, this._eventParams);
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
    this._sendAnalytics(BookmarkEvent.FINISH, this._eventParams);
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
    this._sendAnalytics(BookmarkEvent.FIRST_PLAY, this._eventParams);
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
    this._sendAnalytics(BookmarkEvent.BITRATE_CHANGE, this._eventParams);
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
    this.logger.debug('sending bookmark', bookMark);
    request.doHttpRequest().then(
      data => {
        this.logger.debug('bookmark response', data);
        if (this._resultHasError(data)) {
          if (this._getErrorCode(data) === CONCURRENCY_ERROR_CODE) {
            this.player.dispatchEvent(new FakeEvent(BookmarkError.CONCURRENCY_LIMIT, data));
            this.logger.warn('bookmark concurrency block returned');
          } else {
            this.player.dispatchEvent(new FakeEvent(BookmarkError.BOOKMARK_ERROR, data));
            this.logger.warn('bookmark error returned');
          }
        }
      },
      err => {
        this.logger.warn('Failed to send analytics event', bookMark, err);
      }
    );
  }

  /**
   * check if server returned error response
   * @param {object} data - the server response
   * @returns {boolean} - if server returned an error object
   * @private
   */
  _resultHasError(data: Object): boolean {
    return !!(data.result && data.result.error);
  }

  /**
   * get the error code from the server response
   * @param {object} data - the server response
   * @returns {string} - the error code
   * @private
   */
  _getErrorCode(data: Object): string {
    return data.result.error.code;
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
    if (this.config.isAnonymous) {
      this.logger.info(`block report for anonymous user`);
      return false;
    }
    const isMediaHit = action === BookmarkEvent.HIT;
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
          if (this._eventParams.position === 0) {
            this.logger.debug('prevent sending MediaHit');
          } else {
            this._sendAnalytics(BookmarkEvent.HIT, this._eventParams);
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

export {OttAnalytics, BookmarkEvent, BookmarkError};
