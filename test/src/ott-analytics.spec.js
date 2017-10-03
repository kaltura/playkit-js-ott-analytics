//eslint-disable-next-line no-unused-vars
import KAnalyticsPlugin from '../../src/ott-analytics'
import {loadPlayer} from 'playkit-js'
import * as TestUtils from 'playkit-js/test/src/utils/test-utils'

describe('OttAnalyticsPlugin', function () {
  let player, sandbox, sendSpy, config;


  /**
   * @param {string} ks - ks
   * @param {Object} event - event
   * @return {void}
   */
  function verifyPayloadProperties(ks, event) {
    ks.should.equal(player.config.session.ks);
    event.partnerId.should.equal(player.config.session.partnerID);
    // event.uiConfId.should.equal(player.config.session.uiConfID);
    event.entryId.should.equal(player.config.id);
    if (event.duration) {
      event.duration.should.equal(player.duration);
    }
  }

  before(function () {
      config = {
        id: 258550,
        name: "I Am Legend",
        session: {
          partnerID: 198,
          ks: "djJ8MTk4fBH9A_-eHtAOXoqaZmryD4n6n0aoCEyG2WCaNcb2hyGOK8ad6jh_sy3JVcLN4hReEn5cCVTrjk-kxn3Z7fRrcrU_g4wq5dqMDKLNJCyasCnmAEwyhamtC27JlBjUSgn8S8qBNky6EZCmJKUY1rYEKV2xF9qTY9g-Cx7qP9OFUGPQVjsHSzKrfbA0Iy1XFVItUQ=="
        },
        sources: {
          progressive: [],
          dash: [],
          hls: [
            {
              mimetype: "application/x-mpegURL",
              url: "http://api-preprod.ott.kaltura.com/v4_6/api_v3/service/assetFile/action/playManifest/partnerId/198/assetId/258550/assetType/media/assetFileId/392026/contextType/PLAYBACK/ks/djJ8MTk4fBH9A_-eHtAOXoqaZmryD4n6n0aoCEyG2WCaNcb2hyGOK8ad6jh_sy3JVcLN4hReEn5cCVTrjk-kxn3Z7fRrcrU_g4wq5dqMDKLNJCyasCnmAEwyhamtC27JlBjUSgn8S8qBNky6EZCmJKUY1rYEKV2xF9qTY9g-Cx7qP9OFUGPQVjsHSzKrfbA0Iy1XFVItUQ==/a.mp4",
              id: "392026,applehttp"
            }
          ]
        },
        duration: 1000,
        type: "Unknown",
        dvr: false,
        metadata: {},
        plugins: {
          'ottAnalytics': {
            entryId: "258550",
            fileId: "392026",
            ks: "djJ8MTk4fBH9A_-eHtAOXoqaZmryD4n6n0aoCEyG2WCaNcb2hyGOK8ad6jh_sy3JVcLN4hReEn5cCVTrjk-kxn3Z7fRrcrU_g4wq5dqMDKLNJCyasCnmAEwyhamtC27JlBjUSgn8S8qBNky6EZCmJKUY1rYEKV2xF9qTY9g-Cx7qP9OFUGPQVjsHSzKrfbA0Iy1XFVItUQ==",
            partnerId: 198
          }
        }
      }
    }
  );

  /*beforeEach(function () {
    sandbox = sinon.sandbox.create();
    sendSpy = sandbox.spy(XMLHttpRequest.prototype, 'send');
    player = loadPlayer(config);
  });

  afterEach(function () {
    sandbox.restore();
    player.destroy();
    TestUtils.removeVideoElementsFromTestPage();
  });

  it('should send widget loaded', () => {
    let payload = sendSpy.lastCall.args[0];
    verifyPayloadProperties(payload.ks, payload.event);
    payload.event.seek.should.be.false;
    payload.event.eventType.should.equal(1);
  });

  it('should send media loaded', (done) => {
    player.ready().then(() => {
      let payload = sendSpy.lastCall.args[0];
      verifyPayloadProperties(payload.ks, payload.event);
      payload.event.seek.should.be.false;
      payload.event.eventType.should.equal(2);
      done();
    });
    player.load();
  });

  it('should send first play', (done) => {
    player.addEventListener(player.Event.FIRST_PLAY, () => {
      let payload = sendSpy.lastCall.args[0];
      verifyPayloadProperties(payload.ks, payload.event);
      payload.event.seek.should.be.false;
      payload.event.eventType.should.equal(3);
      done();
    });
    player.play();
  });

  it('should send replay', (done) => {
    player.addEventListener(player.Event.FIRST_PLAY, () => {
      player.currentTime = player.duration - 1;
    });
    player.addEventListener(player.Event.ENDED, () => {
      player.addEventListener(player.Event.PLAY, () => {
        let payload = sendSpy.lastCall.args[0];
        verifyPayloadProperties(payload.ks, payload.event);
        payload.event.seek.should.be.true;
        payload.event.eventType.should.equal(16);
        done();
      });
      player.play();
    });
    player.play();
  });

  it('should send seek on playing', (done) => {
    player.addEventListener(player.Event.FIRST_PLAY, () => {
      player.currentTime = player.duration / 2;
    });
    player.addEventListener(player.Event.SEEKED, () => {
      let payload = sendSpy.lastCall.args[0];
      verifyPayloadProperties(payload.ks, payload.event);
      payload.event.seek.should.be.false;
      payload.event.eventType.should.equal(17);
      done();
    });
    player.play();
  });

  it('should send seek before playing', (done) => {
    player.addEventListener(player.Event.LOADED_METADATA, () => {
      player.currentTime = player.duration / 2;
    });
    player.addEventListener(player.Event.SEEKED, () => {
      let payload = sendSpy.lastCall.args[0];
      verifyPayloadProperties(payload.ks, payload.event);
      payload.event.seek.should.be.false;
      payload.event.eventType.should.equal(17);
      done();
    });
    player.load();
  });*/









});
