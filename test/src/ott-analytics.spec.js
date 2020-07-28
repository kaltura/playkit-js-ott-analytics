import '../../src/index';
import {loadPlayer, Error, FakeEvent, EventType} from '@playkit-js/playkit-js';
import * as TestUtils from './utils/test-utils';
import {OttAnalytics, BookmarkEvent, BookmarkError} from '../../src/ott-analytics';

describe('OttAnalyticsPlugin', function () {
  let player, sandbox, sendSpy, config;
  const mediaType = 'media test';

  /**
   * @param {string} ks - ks
   * @param {Object} bookmark - event
   * @return {void}
   */
  function verifyPayloadProperties(ks, bookmark) {
    ks.should.equal(player.config.session.ks);
    bookmark.id.should.equal(player.config.id);
    if (bookmark.duration) {
      bookmark.duration.should.equal(player.duration);
    }
  }

  before(function () {
    config = {
      logLevel: 'DEBUG',
      id: 258457,
      name: 'Big Hero 6',
      session: {
        partnerId: 198,
        ks:
          'djJ8MTk4fPIz_ugsVrW8JwEX7detBwnuNZq2YVowN9VlB1d8gkHLY1wR6-GaeGYBxD6XBQ6SvDw6crDHhFpvsi7jcudRS2t1bSNFgIT5H2sZrHAGg_uasYXV6YHsm43_d_PsKgmnunAjFniOYXggUo8cT9RtSPo='
      },
      sources: {
        progressive: [
          {
            id: '391837,url',
            url: 'https://www.w3schools.com/tags/movie.mp4',
            mimetype: 'video/mp4'
          }
        ],
        dash: [],
        hls: [
          {
            id: '397008,applehttp',
            url:
              '//api-preprod.ott.kaltura.com/v4_7/api_v3/service/assetFile/action/playManifest/partnerId/198/assetId/258457/assetType/media/assetFileId/397008/contextType/TRAILER/a.m3u8',
            mimetype: 'application/x-mpegURL'
          }
        ],
        type: 'Vod',
        duration: 1000,
        dvr: false,
        metadata: {
          mediaType: mediaType,
          '0': {key: 'Genre', value: 'Comedy|Action|Adventure|Animation|Family|Editor|'},
          '1': {key: 'Parental Rating', value: 'G|R|'},
          '2': {key: 'QUALITY', value: 'hd|sd|'},
          '3': {key: 'Free', value: 'yes|no|adi|'},
          '4': {key: 'Source', value: 'Web3|Editor|'},
          '5': {key: 'Country', value: ''},
          '6': {key: 'QUALITY', value: ''},
          '7': {key: 'Epg ID', value: ''},
          '8': {key: 'Release year', value: 2012},
          '9': {key: 'Catchup allowed', value: false},
          description:
            '*** Free *** The special bond that develops between plus-sized inflatable robot Baymax, and prodigy Hiro Hamada, who team up with a group of friends to form a band of high-tech heroes.'
        }
      }
    };
    config.plugins = {
      ottAnalytics: {
        entryId: config.id,
        fileId: '392026',
        ks: config.session.ks,
        partnerId: config.session.partnerId,
        mediaHitInterval: 2
      }
    };
  });

  beforeEach(function () {
    sandbox = sinon.createSandbox();
    sendSpy = sandbox.spy(XMLHttpRequest.prototype, 'send');
    config.plugins.ottAnalytics.ks = config.session.ks;
    config.plugins.ottAnalytics.isAnonymous = false;
    config.plugins.ottAnalytics.serviceUrl = '//api-preprod.ott.kaltura.com/v4_7/api_v3';
  });

  afterEach(function () {
    sandbox.restore();
    player.destroy();
    TestUtils.removeVideoElementsFromTestPage();
  });

  it('should do nothing if service URL not provided', () => {
    config.plugins.ottAnalytics.serviceUrl = undefined;
    player = loadPlayer(config);
    (!sendSpy.lastCall).should.be.true;
  });

  it('should not send reports for anonymous users', () => {
    config.plugins.ottAnalytics.isAnonymous = true;
    player = loadPlayer(config);
    sendSpy.callCount.should.equal(0);
  });

  it('should send media loaded on calling to load method', done => {
    player = loadPlayer(config);
    player.addEventListener(player.Event.MEDIA_LOADED, () => {
      const payload = JSON.parse(sendSpy.lastCall.args[0]);
      verifyPayloadProperties(payload.ks, payload.bookmark);
      payload.bookmark.playerData.action.should.equal('LOAD');
      done();
    });
    player.load();
  });

  it('should send media loaded when preload is set to "auto"', done => {
    config.playback = {preload: 'auto'};
    player = loadPlayer(config);
    player.addEventListener(player.Event.MEDIA_LOADED, () => {
      const payload = JSON.parse(sendSpy.lastCall.args[0]);
      verifyPayloadProperties(payload.ks, payload.bookmark);
      payload.bookmark.playerData.action.should.equal('LOAD');
      config.playback = {preload: 'none'};
      done();
    });
  });

  it('should send first play', done => {
    player = loadPlayer(config);
    player.addEventListener(player.Event.FIRST_PLAY, () => {
      const payload = JSON.parse(sendSpy.lastCall.args[0]);
      verifyPayloadProperties(payload.ks, payload.bookmark);
      payload.bookmark.playerData.action.should.equal('FIRST_PLAY');
      done();
    });
    player.play();
  });

  it('should send pause', done => {
    player = loadPlayer(config);
    player.addEventListener(player.Event.PAUSE, () => {
      const payload = JSON.parse(sendSpy.lastCall.args[0]);
      verifyPayloadProperties(payload.ks, payload.bookmark);
      payload.bookmark.playerData.action.should.equal('PAUSE');
      done();
    });
    player.play();
    setTimeout(function () {
      player.pause();
    }, 1000);
  });

  it('should send ended', done => {
    player = loadPlayer(config);
    player.addEventListener(player.Event.FIRST_PLAY, () => {
      player.currentTime = player.duration - 1;
    });
    player.addEventListener(player.Event.ENDED, () => {
      const payload = JSON.parse(sendSpy.lastCall.args[0]);
      verifyPayloadProperties(payload.ks, payload.bookmark);
      payload.bookmark.playerData.action.should.equal('FINISH');
      done();
    });
    player.play();
  });

  it('should send media hit', done => {
    player = loadPlayer(config);
    player.addEventListener(player.Event.FIRST_PLAY, () => {
      player.currentTime = player.duration - (player.duration + 1.5);
    });
    player.addEventListener(player.Event.TIME_UPDATE, () => {
      const payload = JSON.parse(sendSpy.lastCall.args[0]);
      verifyPayloadProperties(payload.ks, payload.bookmark);
      if (player.currentTime == 1.5) {
        payload.bookmark.playerData.action.should.equal('HIT');
      }
      done();
    });
    player.play();
  });

  it('should not send media hit if configured to disable', done => {
    config.plugins.ottAnalytics.disableMediaHit = true;
    player = loadPlayer(config);
    const timeupdateHandler = () => {
      if (player.currentTime > 3) {
        player.pause();
        let error = null;
        sendSpy.getCalls().forEach(call => {
          const payload = JSON.parse(call.args);
          try {
            payload.bookmark.playerData.action.should.not.equal('HIT');
          } catch (e) {
            error = e;
          }
        });
        player.removeEventListener(player.Event.TIME_UPDATE, timeupdateHandler);
        config.plugins.ottAnalytics.disableMediaHit = false;
        done(error);
      }
    };
    player.addEventListener(player.Event.TIME_UPDATE, timeupdateHandler);
    player.play();
  });

  it('should not send media mark if configured to disable', done => {
    config.plugins.ottAnalytics.disableMediaMark = true;
    player = loadPlayer(config);
    const timeupdateHandler = () => {
      if (player.currentTime > 3) {
        player.pause();
        let error = null;
        sendSpy.getCalls().forEach(call => {
          const payload = JSON.parse(call.args);
          try {
            payload.bookmark.playerData.action.should.equal('HIT');
          } catch (e) {
            error = e;
          }
        });
        player.removeEventListener(player.Event.TIME_UPDATE, timeupdateHandler);
        config.plugins.ottAnalytics.disableMediaMark = false;
        done(error);
      }
    };
    player.addEventListener(player.Event.TIME_UPDATE, timeupdateHandler);
    player.play();
  });

  it('should not send media hit if media type is LIVE', done => {
    config.sources.type = 'Live';
    player = loadPlayer(config);
    const timeoutHandler = () => {
      player.pause();
      let error = null;
      sendSpy.getCalls().forEach(call => {
        const payload = JSON.parse(call.args);
        try {
          payload.bookmark.playerData.action.should.not.equal('HIT');
        } catch (e) {
          error = e;
        }
      });
      config.sources.type = 'Vod';
      done(error);
    };
    setTimeout(timeoutHandler, 3000);
    player.play();
  });

  it('should not send media hit/mark after critical player error', done => {
    player = loadPlayer(config);
    this.numberOfReprots = 0;
    const timeoutHandler = () => {
      const error = new Error(Error.Severity.CRITICAL, Error.Category.PLAYER, Error.Code.RUNTIME_ERROR_METHOD_NOT_IMPLEMENTED, 'static canPlayDrm');
      player.dispatchEvent(new FakeEvent(EventType.ERROR, error));
      this.numberOfReprots = sendSpy.getCalls().length;
      setTimeout(errorTimeoutHandler, 3000);
    };
    const errorTimeoutHandler = () => {
      player.pause();
      try {
        sendSpy.getCalls().length.should.equal(this.numberOfReprots);
        done();
      } catch (e) {
        done(e);
      }
    };
    setTimeout(timeoutHandler, 3000);
    player.play();
  });

  it('should get media type from config', done => {
    player = loadPlayer(config);
    player.addEventListener(player.Event.FIRST_PLAY, () => {
      try {
        const payload = JSON.parse(sendSpy.lastCall.args[0]);
        payload.bookmark.type.should.equal(mediaType);
        done();
      } catch (err) {
        done(err);
      }
    });
    player.play();
  });

  it('should get default value for mediaType when mediaType doesnt exist in config', done => {
    let configMedia = config;
    delete configMedia.sources.metadata.mediaType;
    player = loadPlayer(configMedia);
    player.addEventListener(player.Event.FIRST_PLAY, () => {
      try {
        const payload = JSON.parse(sendSpy.lastCall.args[0]);
        payload.bookmark.type.should.equal('MEDIA');
        done();
      } catch (err) {
        done(err);
      }
    });
    player.play();
  });
});

describe('_sendAnalytics', () => {
  let config, xhr, requests, ottAnalytics, playerMock, spy;
  before(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];

    xhr.onCreate = xhr => {
      requests.push(xhr);
    };

    spy = sinon.spy(playerMock, 'dispatchEvent');

    playerMock = {
      Event: {},
      currentTime: () => 0,
      dispatchEvent: () => {},
      addEventListener: sinon.spy(),
      removeEventListener: sinon.spy(),
      isLive: () => false
    };

    config = {
      serviceUrl: '123',
      entryId: '123',
      isAnonymous: false,
      mediaHitInterval: 2
    };
  });

  beforeEach(function () {
    ottAnalytics = new OttAnalytics('ottAnalytics', playerMock, config);
    ottAnalytics._fileId = 123;
  });

  afterEach(function () {
    ottAnalytics.destroy();
    ottAnalytics = null;
    requests = [];
    spy.resetHistory();
  });

  it('should stop sending requests after destroy and clear interval', done => {
    let numberOfCalls, ottAnalyticsSpy;
    const checkStopWorking = () => {
      try {
        ottAnalyticsSpy.callCount.should.equal(numberOfCalls);
        done();
      } catch (err) {
        done(err);
      }
    };
    const destroyPlugin = () => {
      ottAnalytics.destroy();
      try {
        (ottAnalytics._mediaHitInterval === null).should.be.true;
        numberOfCalls = ottAnalyticsSpy.callCount;
        //interval in ottAnalytics is config.mediaHitInterval * 1000 so I waited to make sure it's not timing issue
        setTimeout(checkStopWorking, config.mediaHitInterval * 2000);
      } catch (err) {
        done(err);
      }
    };
    ottAnalyticsSpy = sinon.spy(ottAnalytics, '_sendAnalytics');
    ottAnalytics._onMediaLoaded();
    ottAnalytics._onFirstPlay();
    ottAnalytics._onPlay();
    setTimeout(destroyPlugin, 1000);
  });

  it('should stop sending requests after reset and clear interval', done => {
    let numberOfCalls, ottAnalyticsSpy;
    const checkStopWorking = () => {
      try {
        ottAnalyticsSpy.callCount.should.equal(numberOfCalls);
        done();
      } catch (err) {
        done(err);
      }
    };
    const resetPlugin = () => {
      ottAnalytics.reset();
      try {
        (ottAnalytics._mediaHitInterval === null).should.be.true;
        numberOfCalls = ottAnalyticsSpy.callCount;
        //interval in ottAnalytics is config.mediaHitInterval * 1000 so I waited to make sure it's not timing issue
        setTimeout(checkStopWorking, config.mediaHitInterval * 2000);
      } catch (err) {
        done(err);
      }
    };
    ottAnalyticsSpy = sinon.spy(ottAnalytics, '_sendAnalytics');
    ottAnalytics._onMediaLoaded();
    ottAnalytics._onFirstPlay();
    ottAnalytics._onPlay();
    setTimeout(resetPlugin, 1000);
  });

  it('should not send any event when server respond with result true valid response', done => {
    const response = {result: true, executionTime: 0};
    ottAnalytics._sendAnalytics(BookmarkEvent.HIT, ottAnalytics._eventParams);
    requests[0].respond(200, {'Content-Type': 'application/json'}, JSON.stringify(response));
    setTimeout(() => {
      try {
        playerMock.dispatchEvent.should.have.not.been.called;
        done();
      } catch (e) {
        done(e);
      }
    }, 0);
  });

  it('should send bookmark error event when server respond with an error', done => {
    const response = {
      executionTime: 0.0213399,
      result: {
        error: {
          code: '1',
          message: 'Error',
          objectType: 'KalturaAPIException'
        }
      }
    };
    ottAnalytics._sendAnalytics(BookmarkEvent.HIT, ottAnalytics._eventParams);
    requests[0].respond(200, {'Content-Type': 'application/json'}, JSON.stringify(response));
    setTimeout(() => {
      try {
        playerMock.dispatchEvent.should.have.been.calledOnce;
        const error = playerMock.dispatchEvent.args[0][0];
        error.type.should.equal(BookmarkError.BOOKMARK_ERROR);
        done();
      } catch (e) {
        done(e);
      }
    }, 0);
  });

  it('should send bookmark concurrency event when server respond with concurrency error', done => {
    const response = {
      executionTime: 0.0213399,
      result: {
        error: {
          code: '4001',
          message: 'Concurrent play limitation',
          objectType: 'KalturaAPIException'
        }
      }
    };
    ottAnalytics._sendAnalytics(BookmarkEvent.HIT, ottAnalytics._eventParams);
    requests[0].respond(200, {'Content-Type': 'application/json'}, JSON.stringify(response));
    setTimeout(() => {
      try {
        playerMock.dispatchEvent.should.have.been.calledOnce;
        const error = playerMock.dispatchEvent.args[0][0];
        error.type.should.equal(BookmarkError.CONCURRENCY_LIMIT);
        done();
      } catch (e) {
        done(e);
      }
    }, 0);
  });
});

describe('STOP event', () => {
  let config, xhr, requests, ottAnalytics, playerMock, spy;
  before(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];

    xhr.onCreate = xhr => {
      requests.push(xhr);
    };

    playerMock = {
      Event: {},
      currentTime: 0,
      dispatchEvent: () => {},
      addEventListener: sinon.spy(),
      removeEventListener: sinon.spy(),
      isLive: () => false
    };

    spy = sinon.spy(playerMock, 'dispatchEvent');

    config = {
      serviceUrl: '123',
      entryId: '123',
      isAnonymous: false
    };
  });

  beforeEach(function () {
    ottAnalytics = new OttAnalytics('ottAnalytics', playerMock, config);
    ottAnalytics._fileId = 123;
  });

  afterEach(function () {
    ottAnalytics.destroy();
    ottAnalytics = null;
    requests = [];
    spy.resetHistory();
  });

  it('should be called if player was reset before media ended', () => {
    spy = sinon.spy(ottAnalytics, '_sendAnalytics');
    ottAnalytics._onMediaLoaded();
    ottAnalytics._onFirstPlay();
    ottAnalytics._onPlay();
    ottAnalytics.reset();
    spy.args[3][0].should.equal('STOP');
  });

  it('should be called if player was destroyed before media ended', () => {
    spy = sinon.spy(ottAnalytics, '_sendAnalytics');
    ottAnalytics._onMediaLoaded();
    ottAnalytics._onFirstPlay();
    ottAnalytics._onPlay();
    ottAnalytics.destroy();
    spy.should.have.been.calledWithMatch('STOP', sinon.match.object);
  });

  it('should be called only once if player was reset and then destroyed before media ended', () => {
    spy = sinon.spy(ottAnalytics, '_sendAnalytics');
    ottAnalytics._onMediaLoaded();
    ottAnalytics._onFirstPlay();
    ottAnalytics._onPlay();
    ottAnalytics.reset();
    ottAnalytics.destroy();
    spy.should.have.callCount(4);
    spy.should.have.been.calledWithMatch('STOP', sinon.match.object);
  });

  it('should not be called on reset if media has ended', () => {
    spy = sinon.spy(ottAnalytics, '_sendAnalytics');
    ottAnalytics._onMediaLoaded();
    ottAnalytics._onFirstPlay();
    ottAnalytics._onPlay();
    ottAnalytics._onEnded();
    ottAnalytics.reset();
    spy.should.have.callCount(4);
    spy.should.have.not.been.calledWithMatch('STOP', sinon.match.object);
  });

  it('should not be called on destroy if media has ended', () => {
    spy = sinon.spy(ottAnalytics, '_sendAnalytics');
    ottAnalytics._onMediaLoaded();
    ottAnalytics._onFirstPlay();
    ottAnalytics._onPlay();
    ottAnalytics._onEnded();
    ottAnalytics.destroy();
    spy.should.have.callCount(4);
    spy.should.have.not.been.calledWithMatch('STOP', sinon.match.object);
  });

  it('should be able to stop a media again after change media or replay', () => {
    spy = sinon.spy(ottAnalytics, '_sendAnalytics');
    ottAnalytics._onMediaLoaded();
    ottAnalytics._onFirstPlay();
    ottAnalytics._onPlay();
    ottAnalytics.reset();
    ottAnalytics._onPlay();
    ottAnalytics.reset();
    spy.should.have.callCount(6);
    const firstReset = spy.getCall(3);
    const secondReset = spy.getCall(5);
    firstReset.args[0].should.equal('STOP');
    secondReset.args[0].should.equal('STOP');
  });
});
