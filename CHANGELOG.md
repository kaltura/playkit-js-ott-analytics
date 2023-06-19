# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### 1.1.5 (2023-06-07)


### Bug Fixes

* **FEC-13123:** replace travis with github actions - fixed providers canary ([#94](https://github.com/kaltura/playkit-js-ott-analytics/issues/94)) ([fabc383](https://github.com/kaltura/playkit-js-ott-analytics/commit/fabc383))



### 1.1.4 (2023-05-17)


### Bug Fixes

* **FEC-13123:** replace travis with github actions ([#91](https://github.com/kaltura/playkit-js-ott-analytics/issues/91)) ([6894565](https://github.com/kaltura/playkit-js-ott-analytics/commit/6894565))



### 1.1.3 (2023-05-07)



### [1.1.2](https://github.com/kaltura/playkit-js-ott-analytics/compare/v1.1.1...v1.1.2) (2023-02-22)


### Bug Fixes

* **FEC-12773:** cont. update yarn.lock ([#88](https://github.com/kaltura/playkit-js-ott-analytics/issues/88)) ([236298f](https://github.com/kaltura/playkit-js-ott-analytics/commit/236298f))
* **FEC-127873:** incase of CATCHUP, START_OVER and RECORDING use bookmark mediaId as programId ([#87](https://github.com/kaltura/playkit-js-ott-analytics/issues/87)) ([5673cc3](https://github.com/kaltura/playkit-js-ott-analytics/commit/5673cc3))



### [1.1.1](https://github.com/kaltura/playkit-ott-analytics/compare/v1.1.0...v1.1.1) (2022-08-04)


### Build System

* set prerelease false ([27becd5](https://github.com/kaltura/playkit-ott-analytics/commit/27becd5))



## [1.1.0](https://github.com/kaltura/playkit-ott-analytics/compare/v1.0.3...v1.1.0) (2021-11-10)


### Features

* **FEC-11611:** [Web] Pass the program ID when sending a bookmark ([#64](https://github.com/kaltura/playkit-ott-analytics/issues/64)) ([700f1d7](https://github.com/kaltura/playkit-ott-analytics/commit/700f1d7))



### [1.0.3](https://github.com/kaltura/playkit-ott-analytics/compare/v1.0.2...v1.0.3) (2021-10-27)


### Bug Fixes

* **FEC-11621:** Analytics plugins send position 0 even startTime set ([#63](https://github.com/kaltura/playkit-ott-analytics/issues/63)) ([bdf53af](https://github.com/kaltura/playkit-ott-analytics/commit/bdf53af))


### Build System

* fix node 17 issue ([9d01e50](https://github.com/kaltura/playkit-ott-analytics/commit/9d01e50))



### [1.0.2](https://github.com/kaltura/playkit-ott-analytics/compare/v1.0.1...v1.0.2) (2021-09-30)


### Bug Fixes

* **FEC-11541:** position in live ott is wrong ([#58](https://github.com/kaltura/playkit-ott-analytics/issues/58)) ([8f2a8f5](https://github.com/kaltura/playkit-ott-analytics/commit/8f2a8f5))


### Build System

* **FEC-10700:** Improvement for CI/CD ([#56](https://github.com/kaltura/playkit-ott-analytics/issues/56)) ([5f78d48](https://github.com/kaltura/playkit-ott-analytics/commit/5f78d48))
* **FEC-11389:** reduce builds from travis ([4c43a12](https://github.com/kaltura/playkit-ott-analytics/commit/4c43a12))



### [1.0.1](https://github.com/kaltura/playkit-ott-analytics/compare/v1.0.0...v1.0.1) (2020-11-03)


### Build System

* canary change provider dep to master ([#44](https://github.com/kaltura/playkit-ott-analytics/issues/44)) ([757be8e](https://github.com/kaltura/playkit-ott-analytics/commit/757be8e))
* remove plugins that already exist on preset-env ([#43](https://github.com/kaltura/playkit-ott-analytics/issues/43)) ([af3bf33](https://github.com/kaltura/playkit-ott-analytics/commit/af3bf33))



# [1.0.0](https://github.com/kaltura/playkit-ott-analytics/compare/v0.6.0...v1.0.0) (2020-09-08)


### Features

* **FEC-10347:** expose kaltura player as a global variable instead of UMD ([#38](https://github.com/kaltura/playkit-ott-analytics/issues/38)) ([0a1114f](https://github.com/kaltura/playkit-ott-analytics/commit/0a1114f211c9998e5ce9ec1b4e712b43519c1753))


### BREAKING CHANGES

* **FEC-10347:** This package is not UMD anymore



## [0.6.2](https://github.com/kaltura/playkit-ott-analytics/compare/v0.6.1...v0.6.2) (2020-09-08)



### [0.6.1](https://github.com/kaltura/playkit-ott-analytics/compare/v0.6.0...v0.6.1) (2020-09-07)


### Build System

* **FEC-10064:** add automatic release notes ([#41](https://github.com/kaltura/playkit-ott-analytics/issues/41)) ([af11b17](https://github.com/kaltura/playkit-ott-analytics/commit/af11b17))


### Tests

* faster unit tests ([#39](https://github.com/kaltura/playkit-ott-analytics/issues/39)) ([d188c03](https://github.com/kaltura/playkit-ott-analytics/commit/d188c03))



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
