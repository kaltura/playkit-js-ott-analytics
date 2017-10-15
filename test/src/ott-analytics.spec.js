//eslint-disable-next-line no-unused-vars
import OttAnalyticsPlugin from '../../src/ott-analytics'
import {loadPlayer} from 'playkit-js'
import * as TestUtils from 'playkit-js/test/src/utils/test-utils'

describe('OttAnalyticsPlugin', function () {
  let player, sandbox, sendSpy, config;
  this.timeout(50000);

  /**
   * @param {string} ks - ks
   * @param {Object} event - event
   * @return {void}
   */
  function verifyPayloadProperties(ks, bookmark) {
    // let payload = JSON.parse(eventData)
    ks.should.equal(player.config.session.ks);
    // let bookmark = payload.bookmark;
    bookmark.id.should.equal(player.config.id);
    if (bookmark.duration) {
      bookmark.duration.should.equal(player.duration);
    }
  }

  before(function () {
      config = {
        id: 258550,
        name: "I Am Legend",
        session: {
          partnerID: 198,
          ks: "djJ8MTk4fCrazdfPq20pi3nT4doGK16zOLAGteLKufJYsdB0U4W4NnplgIfZpeMpsiTZBbj6WaKi7n2p0_M7WRMjA4gGEQCP0gh2LjlB5vW_kdfmnYPxAgHU-l4VQHIcNobc3v-Fv4aPaaCTak2ZYHuI5EO76Thvz3OyyKp9M_qs--ptrftnEpqAig8b5R0dv51y-v30Jw=="
        },
        sources: {
          progressive: [
            {
              mimetype: "video/mp4",
              url: "http://api-preprod.ott.kaltura.com/v4_6/api_v3/service/assetFile/action/playManifest/partnerId/198/assetId/258550/assetType/media/assetFileId/392026/contextType/PLAYBACK/ks/djJ8MTk4fCrazdfPq20pi3nT4doGK16zOLAGteLKufJYsdB0U4W4NnplgIfZpeMpsiTZBbj6WaKi7n2p0_M7WRMjA4gGEQCP0gh2LjlB5vW_kdfmnYPxAgHU-l4VQHIcNobc3v-Fv4aPaaCTak2ZYHuI5EO76Thvz3OyyKp9M_qs--ptrftnEpqAig8b5R0dv51y-v30Jw==/a.mp4",
              id: "392026,url"
            }
          ],
          dash: [],
          hls: []
        },
        duration: 149.491,
        type: "Unknown",
        dvr: false,
        metadata: {},
        plugins: {
          'ottAnalytics': {
            entryId: 258550,
            fileId: "392026",
            ks: "djJ8MTk4fCrazdfPq20pi3nT4doGK16zOLAGteLKufJYsdB0U4W4NnplgIfZpeMpsiTZBbj6WaKi7n2p0_M7WRMjA4gGEQCP0gh2LjlB5vW_kdfmnYPxAgHU-l4VQHIcNobc3v-Fv4aPaaCTak2ZYHuI5EO76Thvz3OyyKp9M_qs--ptrftnEpqAig8b5R0dv51y-v30Jw==",
            partnerId: 198,
            mediaHitInterval: 2
          }
        }
      }
    }
  );

  beforeEach(function () {
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
    let payload = JSON.parse(sendSpy.lastCall.args[0]);
    verifyPayloadProperties(payload.ks, payload.bookmark);
    payload.bookmark.playerData.action.should.equal("LOAD");
  });


 /* it('should send first play', (done) => {
    player.addEventListener(player.Event.FIRST_PLAY, () => {
      let payload = JSON.parse(sendSpy.lastCall.args[0]);
      verifyPayloadProperties(payload.ks, payload.bookmark);
      payload.bookmark.playerData.action.should.equal("FIRST_PLAY");
      done();
    });
    player.play();
  });

  it('should send pause', (done) => {
      player.addEventListener(player.Event.PAUSE, () => {
        let payload = JSON.parse(sendSpy.lastCall.args[0]);
        verifyPayloadProperties(payload.ks, payload.bookmark);
        payload.bookmark.playerData.action.should.equal("PAUSE");
        done();
      });
      player.play();
      setTimeout(function(){ player.pause(); }, 1000);

    });


  it('should send ended', (done) => {
    player.addEventListener(player.Event.FIRST_PLAY, () => {
      player.currentTime = player.duration - 1;
    });
    player.addEventListener(player.Event.ENDED, () => {
      let payload = JSON.parse(sendSpy.lastCall.args[0]);
      verifyPayloadProperties(payload.ks, payload.bookmark);
      payload.bookmark.playerData.action.should.equal("FINISH");
      done();
    });
    player.play();
  });


  it('should send media hit', (done) => {
    player.addEventListener(player.Event.FIRST_PLAY, () => {
      player.currentTime = player.duration - (player.duration + 1.5);
    });
    player.addEventListener(player.Event.TIME_UPDATE, () => {
      let payload = JSON.parse(sendSpy.lastCall.args[0]);
      verifyPayloadProperties(payload.ks, payload.bookmark);
      if(player.currentTime == 1.5){
        payload.bookmark.playerData.action.should.equal("HIT");
      }
      done();
    });
    player.play();
  });*/

});
