# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.6.0](https://github.com/kaltura/playkit-ott-analytics/compare/v0.5.3...v0.6.0) (2020-08-05)


### Build System

* github bad certificate ([#31](https://github.com/kaltura/playkit-ott-analytics/issues/31)) ([4b30082](https://github.com/kaltura/playkit-ott-analytics/commit/4b30082))


### Features

* **FEC-10057:** move the plugin manager to kaltura player ([#37](https://github.com/kaltura/playkit-ott-analytics/issues/37)) ([30a3165](https://github.com/kaltura/playkit-ott-analytics/commit/30a3165))
* **FEC-10290:** upgrade NPM packages ([#36](https://github.com/kaltura/playkit-ott-analytics/issues/36)) ([a113d01](https://github.com/kaltura/playkit-ott-analytics/commit/a113d01))
* **FEC-10291:** migrate analytics plugins injection from kaltura Player to server ([#35](https://github.com/kaltura/playkit-ott-analytics/issues/35)) ([3c9510b](https://github.com/kaltura/playkit-ott-analytics/commit/3c9510b))



<a name="0.5.3"></a>
## [0.5.3](https://github.com/kaltura/playkit-ott-analytics/compare/v0.5.2...v0.5.3) (2019-10-31)


### Bug Fixes

* Chrome failed on travis - update travis.yml ([#23](https://github.com/kaltura/playkit-ott-analytics/issues/23)) ([2b633a5](https://github.com/kaltura/playkit-ott-analytics/commit/2b633a5))



<a name="0.5.2"></a>
## [0.5.2](https://github.com/kaltura/playkit-ott-analytics/compare/v0.5.1...v0.5.2) (2019-08-19)


### Bug Fixes

* **FEC-9270:** report OTT media type in bookmark service ([#22](https://github.com/kaltura/playkit-ott-analytics/issues/22)) ([8d2149c](https://github.com/kaltura/playkit-ott-analytics/commit/8d2149c))



<a name="0.5.1"></a>
## [0.5.1](https://github.com/kaltura/playkit-ott-analytics/compare/v0.5.0...v0.5.1) (2019-07-19)


### Bug Fixes

* **FEC-9230:** interval wasn't cleared on destroy ([#20](https://github.com/kaltura/playkit-ott-analytics/issues/20)) ([4f11384](https://github.com/kaltura/playkit-ott-analytics/commit/4f11384))



<a name="0.5.0"></a>
# [0.5.0](https://github.com/kaltura/playkit-ott-analytics/compare/v0.4.0...v0.5.0) (2018-11-20)


### Features

* **FEC-8695:** add STOP bookmark event ([#19](https://github.com/kaltura/playkit-ott-analytics/issues/19)) ([085a40e](https://github.com/kaltura/playkit-ott-analytics/commit/085a40e))



<a name="0.4.0"></a>
# [0.4.0](https://github.com/kaltura/playkit-ott-analytics/compare/v0.3.1...v0.4.0) (2018-11-19)


### Features

* **FEC-8687:** handle OTT BE API exception response ([#18](https://github.com/kaltura/playkit-ott-analytics/issues/18)) ([fac89a1](https://github.com/kaltura/playkit-ott-analytics/commit/fac89a1))



<a name="0.3.1"></a>
## [0.3.1](https://github.com/kaltura/playkit-ott-analytics/compare/v0.3.0...v0.3.1) (2018-11-15)


### Bug Fixes

* **FEC-8558:** redundant json.parse causes crash ([#17](https://github.com/kaltura/playkit-ott-analytics/issues/17)) ([548fd03](https://github.com/kaltura/playkit-ott-analytics/commit/548fd03))



<a name="0.3.0"></a>
# [0.3.0](https://github.com/kaltura/playkit-ott-analytics/compare/v0.1.5...v0.3.0) (2018-11-05)


### Features

* **FEC-8558:** concurrency handling ([#15](https://github.com/kaltura/playkit-ott-analytics/issues/15)) ([52e0c5b](https://github.com/kaltura/playkit-ott-analytics/commit/52e0c5b))
* **FEC-8642:** enable experimental live OTT concurency ([#16](https://github.com/kaltura/playkit-ott-analytics/issues/16)) ([079b586](https://github.com/kaltura/playkit-ott-analytics/commit/079b586))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/kaltura/playkit-ott-analytics/compare/v0.1.5...v0.2.0) (2018-10-18)


### Features

* **FEC-8558:** concurrency handling ([#15](https://github.com/kaltura/playkit-ott-analytics/issues/15)) ([52e0c5b](https://github.com/kaltura/playkit-ott-analytics/commit/52e0c5b))



<a name="0.1.5"></a>
## [0.1.5](https://github.com/kaltura/playkit-ott-analytics/compare/v0.1.3...v0.1.5) (2018-06-25)


### Bug Fixes

* **FEC-8349:** OTT analytics - no event send for logged user ([#11](https://github.com/kaltura/playkit-ott-analytics/issues/11)) ([eda23fc](https://github.com/kaltura/playkit-ott-analytics/commit/eda23fc))



<a name="0.1.4"></a>
## [0.1.4](https://github.com/kaltura/playkit-ott-analytics/compare/v0.1.3...v0.1.4) (2018-06-24)


### Bug Fixes

* **FEC-8331:** use isAnonymous flag from config instead of ks ([#9](https://github.com/kaltura/playkit-ott-analytics/issues/9)) ([90c72af](https://github.com/kaltura/playkit-ott-analytics/commit/90c72af))
* **FEC-8336:**  stop sending reports after critical player error ([#10](https://github.com/kaltura/playkit-ott-analytics/issues/10)) ([ad4dbb9](https://github.com/kaltura/playkit-ott-analytics/commit/ad4dbb9))


<a name="0.1.3"></a>
## [0.1.3](https://github.com/kaltura/playkit-ott-analytics/compare/v0.1.2...v0.1.3) (2018-06-20)


### Bug Fixes

* output logger warning instead of error ([#5](https://github.com/kaltura/playkit-ott-analytics/issues/5)) ([57f9abc](https://github.com/kaltura/playkit-ott-analytics/commit/57f9abc))
* **FEC-8327:** don't send report if mandatory params are not set ([#7](https://github.com/kaltura/playkit-ott-analytics/issues/7)) ([2bf346a](https://github.com/kaltura/playkit-ott-analytics/commit/2bf346a))
* **FEC-8328:** send load event only on media loaded ([#8](https://github.com/kaltura/playkit-ott-analytics/issues/8)) ([9eb5d7a](https://github.com/kaltura/playkit-ott-analytics/commit/9eb5d7a))



<a name="0.1.2"></a>
## [0.1.2](https://github.com/kaltura/playkit-ott-analytics/compare/v0.1.1...v0.1.2) (2018-05-26)


### Bug Fixes

* **FEC-8235:** remove default service url from OTT provider and analytics ([#4](https://github.com/kaltura/playkit-ott-analytics/issues/4)) ([e3f5ec9](https://github.com/kaltura/playkit-ott-analytics/commit/e3f5ec9))



<a name="0.1.1"></a>
## [0.1.1](https://github.com/kaltura/playkit-ott-analytics/compare/v0.1.0...v0.1.1) (2018-02-06)


### Bug Fixes

* remove explicit protocol from serviceUrl ([385a094](https://github.com/kaltura/playkit-ott-analytics/commit/385a094))
* **webpack:** playkit core & providers externals root value ([#2](https://github.com/kaltura/playkit-ott-analytics/issues/2)) ([3f6bbd0](https://github.com/kaltura/playkit-ott-analytics/commit/3f6bbd0))



<a name="0.1.0"></a>
# 0.1.0 (2018-01-09)


### Features

* init ott analytics plugin ([#1](https://github.com/kaltura/playkit-ott-analytics/issues/1)) ([d7a18f7](https://github.com/kaltura/playkit-ott-analytics/commit/d7a18f7))
