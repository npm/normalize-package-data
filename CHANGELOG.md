# Changelog

## [6.0.2](https://github.com/npm/normalize-package-data/compare/v6.0.1...v6.0.2) (2024-06-25)

### Dependencies

* [`43bab20`](https://github.com/npm/normalize-package-data/commit/43bab2087123dd105235bee9e4d99a84fa179bd3) [#224](https://github.com/npm/normalize-package-data/pull/224) replace `is-core-module` with node builtin (#224) (@SuperchupuDev, @wraithgar)

## [6.0.1](https://github.com/npm/normalize-package-data/compare/v6.0.0...v6.0.1) (2024-05-04)

### Bug Fixes

* [`27688b4`](https://github.com/npm/normalize-package-data/commit/27688b4e35adbff465eb333374854fe19ac1795d) [#217](https://github.com/npm/normalize-package-data/pull/217) linting: no-unused-vars (@lukekarrys)

### Documentation

* [`c5b90cd`](https://github.com/npm/normalize-package-data/commit/c5b90cdaaee99adefb805a1e84289ff66e23cc38) [#214](https://github.com/npm/normalize-package-data/pull/214) readme: fix broken badge URL (#214) (@10xLaCroixDrinker)

### Chores

* [`3c74f51`](https://github.com/npm/normalize-package-data/commit/3c74f51a1a754e34023bfb8db25418c75d3642e7) [#217](https://github.com/npm/normalize-package-data/pull/217) bump @npmcli/template-oss to 4.22.0 (@lukekarrys)
* [`02de832`](https://github.com/npm/normalize-package-data/commit/02de832d320573c142659fece85fc7fb8a022ac5) [#217](https://github.com/npm/normalize-package-data/pull/217) postinstall for dependabot template-oss PR (@lukekarrys)
* [`f6b1f8c`](https://github.com/npm/normalize-package-data/commit/f6b1f8cff7a0eb346b82c76c9191bab2ae7d197e) [#216](https://github.com/npm/normalize-package-data/pull/216) bump @npmcli/template-oss from 4.21.3 to 4.21.4 (@dependabot[bot])

## [6.0.0](https://github.com/npm/normalize-package-data/compare/v5.0.0...v6.0.0) (2023-08-15)

### ⚠️ BREAKING CHANGES

* support for node 14 has been removed

### Bug Fixes

* [`2338ad0`](https://github.com/npm/normalize-package-data/commit/2338ad01a93ad731f100aaa385da81f5adfe1903) [#186](https://github.com/npm/normalize-package-data/pull/186) drop node14 support (@lukekarrys)

### Dependencies

* [`7b0f828`](https://github.com/npm/normalize-package-data/commit/7b0f82848d2a09c213d9749ffac70975fb5e61ca) [#185](https://github.com/npm/normalize-package-data/pull/185) bump hosted-git-info from 6.1.1 to 7.0.0

## [5.0.0](https://github.com/npm/normalize-package-data/compare/v4.0.1...v5.0.0) (2022-10-12)

### ⚠️ BREAKING CHANGES

* `normalize-package-data` is now compatible with the following semver range for node: `^14.17.0 || ^16.13.0 || >=18.0.0`

### Features

* [`c299178`](https://github.com/npm/normalize-package-data/commit/c299178b90a1be97a93bebd17204664c2f8d640e) [#156](https://github.com/npm/normalize-package-data/pull/156) postinstall for dependabot template-oss PR (@lukekarrys)

### Dependencies

* [`8a9c5ee`](https://github.com/npm/normalize-package-data/commit/8a9c5ee4f0e57e239069b44c9d89e8987efaaf40) [#164](https://github.com/npm/normalize-package-data/pull/164) `hosted-git-info@6.0.0` (#164)

## [4.0.1](https://github.com/npm/normalize-package-data/compare/v4.0.0...v4.0.1) (2022-08-15)


### Bug Fixes

* linting ([#146](https://github.com/npm/normalize-package-data/issues/146)) ([850038e](https://github.com/npm/normalize-package-data/commit/850038e68baa8155f55f9169977cb631fecbe1d4))

## [4.0.0](https://www.github.com/npm/normalize-package-data/compare/v3.0.3...v4.0.0) (2022-03-14)


### ⚠ BREAKING CHANGES

* this drops support for node 10 and non-LTS versions of node 12 and node 14

### Bug Fixes

* do not overwrite bundled dependency ranges with * ([#128](https://www.github.com/npm/normalize-package-data/issues/128)) ([b8e4604](https://www.github.com/npm/normalize-package-data/commit/b8e460412c45a334c71f874d8fe118522ae73c95))
* safer regex ([abcdb36](https://www.github.com/npm/normalize-package-data/commit/abcdb36f5bbeeb4d1e0a0aafac6aaf8b3e8488b3))


### Documentation

* Missprint in readme ([#127](https://www.github.com/npm/normalize-package-data/issues/127)) ([ac078ea](https://www.github.com/npm/normalize-package-data/commit/ac078eaa9bc3f41c971bdf5539e46b2738820156))


* @npmcli/template-oss@2.9.2 ([80daf4a](https://www.github.com/npm/normalize-package-data/commit/80daf4a771c0cae08695466f0b766f6989b31525))


### Dependencies

* bump hosted-git-info from 4.1.0 to 5.0.0 ([#135](https://www.github.com/npm/normalize-package-data/issues/135)) ([289674d](https://www.github.com/npm/normalize-package-data/commit/289674dc86fca6e2685d505b9e735bdc6ef84ea6))
* update is-core-module requirement from ^2.5.0 to ^2.8.1 ([#132](https://www.github.com/npm/normalize-package-data/issues/132)) ([b3ec77e](https://www.github.com/npm/normalize-package-data/commit/b3ec77e1413c17713ccd984ad2702679cc02f6eb))
* update semver requirement from ^7.3.4 to ^7.3.5 ([#133](https://www.github.com/npm/normalize-package-data/issues/133)) ([e0a56dc](https://www.github.com/npm/normalize-package-data/commit/e0a56dc76afa0da4e147afe8892c5b0306f1a77a))
* update validate-npm-package-license requirement ([#131](https://www.github.com/npm/normalize-package-data/issues/131)) ([fe7dc60](https://www.github.com/npm/normalize-package-data/commit/fe7dc60d74e8cdaaf8b0015e67a57b4aa5366f63))
