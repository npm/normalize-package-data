# Changelog

## [9.0.0](https://github.com/npm/normalize-package-data/compare/v8.0.0...v9.0.0) (2026-05-15)
### ⚠️ BREAKING CHANGES
* `normalize-package-data` now supports node `^22.22.2 || ^24.15.0 || >=26.0.0`
* template-oss-apply
### Features
* [`cbaa5da`](https://github.com/npm/normalize-package-data/commit/cbaa5da307d633eaeba4cac093f1af5a4766e7c1) [#262](https://github.com/npm/normalize-package-data/pull/262) bump to new node engine range (@owlstronaut)
* [`d000032`](https://github.com/npm/normalize-package-data/commit/d0000323f6b4a106cf2975c8c3d6302d9404f342) [#262](https://github.com/npm/normalize-package-data/pull/262) template-oss-apply (@owlstronaut)
### Dependencies
* [`afe6b48`](https://github.com/npm/normalize-package-data/commit/afe6b48a7fcbbd47a3968ba59014d08fa0dd9659) [#262](https://github.com/npm/normalize-package-data/pull/262) `hosted-git-info@10.1.0`
### Chores
* [`6e35b4b`](https://github.com/npm/normalize-package-data/commit/6e35b4b0493a42e065f618c7c0987381c22128b9) [#262](https://github.com/npm/normalize-package-data/pull/262) replace removed _stream_writable with stream for Node 26 compatibility (@owlstronaut)
* [`0642c80`](https://github.com/npm/normalize-package-data/commit/0642c807cd4bf5e93628ec6da19e97a2fb3c5779) [#262](https://github.com/npm/normalize-package-data/pull/262) template-oss-apply (@owlstronaut)
* [`93d9b37`](https://github.com/npm/normalize-package-data/commit/93d9b37b83f952f4b906d4c9de7ed11de51a7cfa) [#262](https://github.com/npm/normalize-package-data/pull/262) bumping @npmcli/template-oss from 4.30.0 to 5.1.0 (@owlstronaut)
* [`aa01d03`](https://github.com/npm/normalize-package-data/commit/aa01d035e74a3d7d83d1cd5466ba4988e910c9e3) [#256](https://github.com/npm/normalize-package-data/pull/256) remove tap (@owlstronaut)
* [`13311b5`](https://github.com/npm/normalize-package-data/commit/13311b5dfcd868c54a0f1120ad5c5a523b56ef52) [#256](https://github.com/npm/normalize-package-data/pull/256) swap from tap to built-in node:test (@owlstronaut)
* [`0b5961e`](https://github.com/npm/normalize-package-data/commit/0b5961e53d9ed76b0a444f7d9e2d176939ae141a) [#253](https://github.com/npm/normalize-package-data/pull/253) bump @npmcli/eslint-config from 5.1.0 to 6.0.0 (#253) (@dependabot[bot])
* [`e01f4b9`](https://github.com/npm/normalize-package-data/commit/e01f4b9d4ee78b5b98c8c7c44cda172e2fcc1461) [#258](https://github.com/npm/normalize-package-data/pull/258) bump @npmcli/template-oss from 4.29.0 to 4.30.0 (#258) (@dependabot[bot], @npm-cli-bot)

## [8.0.0](https://github.com/npm/normalize-package-data/compare/v7.0.1...v8.0.0) (2025-07-24)
### ⚠️ BREAKING CHANGES
* `normalize-package-data` now supports node `^20.17.0 || >=22.9.0`
### Bug Fixes
* [`4b978e0`](https://github.com/npm/normalize-package-data/commit/4b978e07b4c257407a60aef4fa325bea6a773164) [#248](https://github.com/npm/normalize-package-data/pull/248) align to npm 11 node engine range (@owlstronaut)
### Dependencies
* [`7b28c1a`](https://github.com/npm/normalize-package-data/commit/7b28c1a84de9efa04b1f5d6a790e6fb082ef0244) [#248](https://github.com/npm/normalize-package-data/pull/248) `hosted-git-info@9.0.0`

## [7.0.1](https://github.com/npm/normalize-package-data/compare/v7.0.0...v7.0.1) (2025-07-22)
### Bug Fixes
* [`97fb20a`](https://github.com/npm/normalize-package-data/commit/97fb20adabf7a6f22c67733252b2e30da520ed96) [#247](https://github.com/npm/normalize-package-data/pull/247) use `URL.canParse` instead of runtime deprecated `url.parse` api (#247) (@SuperchupuDev)
* [`cc37f25`](https://github.com/npm/normalize-package-data/commit/cc37f25f02b8110ceded0cdfae5e4bb33dd2de0d) [#244](https://github.com/npm/normalize-package-data/pull/244) use `isBuiltin` instead of `builtinModules` (#244) (@SuperchupuDev)
### Chores
* [`acafa71`](https://github.com/npm/normalize-package-data/commit/acafa7127ca8af7cbb60813e63d197d418dd759f) [#245](https://github.com/npm/normalize-package-data/pull/245) bump @npmcli/template-oss from 4.24.4 to 4.25.0 (#245) (@dependabot[bot], @owlstronaut)

## [7.0.0](https://github.com/npm/normalize-package-data/compare/v6.0.2...v7.0.0) (2024-09-24)
### ⚠️ BREAKING CHANGES
* `normalize-package-data` now supports node `^18.17.0 || >=20.5.0`
### Bug Fixes
* [`c3e0c45`](https://github.com/npm/normalize-package-data/commit/c3e0c452c9a7b75bee471c8cac29b40361ea6387) [#238](https://github.com/npm/normalize-package-data/pull/238) align to npm 10 node engine range (@hashtagchris)
### Dependencies
* [`a313806`](https://github.com/npm/normalize-package-data/commit/a313806d61272799b577b5dbe56639047d933480) [#238](https://github.com/npm/normalize-package-data/pull/238) `hosted-git-info@8.0.0`
### Chores
* [`cbf987b`](https://github.com/npm/normalize-package-data/commit/cbf987bc26b974adcc45ded1d3a0d5ad73bc67a7) [#238](https://github.com/npm/normalize-package-data/pull/238) run template-oss-apply (@hashtagchris)
* [`846ae80`](https://github.com/npm/normalize-package-data/commit/846ae80d05f26b22ac2bec3e8bb300ce2e67aa19) [#235](https://github.com/npm/normalize-package-data/pull/235) bump @npmcli/eslint-config from 4.0.5 to 5.0.0 (@dependabot[bot])
* [`2077b44`](https://github.com/npm/normalize-package-data/commit/2077b44f59009fd98ea4d0efd5a353c413cf122b) [#236](https://github.com/npm/normalize-package-data/pull/236) postinstall for dependabot template-oss PR (@hashtagchris)
* [`f314b3d`](https://github.com/npm/normalize-package-data/commit/f314b3d6c28febedb819ecfad8ff5fa730a1c666) [#236](https://github.com/npm/normalize-package-data/pull/236) bump @npmcli/template-oss from 4.23.1 to 4.23.3 (@dependabot[bot])

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
