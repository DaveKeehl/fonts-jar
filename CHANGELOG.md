# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2023-02-03
### Added
- Support for filtering fonts based on the origin websites
- Tooltips for toolbar buttons
- Support for Adobe Fonts
- Completely overhauled and made a lot easier the process of adding new supported websites
### Changed
- Manifest key is now overridden to have a consistent extension ID
- Publish workflow now automates releases
- Updated dependencies
- Put back caret down icon in sort method and sort direction buttons in toolbar
- Content scripts now use Plasmo CSUI to inject React components within the supported websites
### Removed
- No longer using background service worker
- No longer internally storing font variants and variable axis count
### Fixed
- Collection input field in collections manager modal is now set to `width: 100%` to prevent horizontal overflow

## [0.3.0] - 2023-01-15
### Added
- Support for collections
### Changed
- Rewrote extension with [Plasmo](https://github.com/PlasmoHQ/plasmo)
### Fixed
- Typeface family name is now trimmed before being added to the favorites list

## [0.2.0] - 2023-01-04
### Added
- Created utility function `isUrlLegal` and refactored parts of the codebase to use it
### Changed
- Website ignore regex is now optional
- Improved website types
- Fixed typos
- Strengthened regex to ignore websites
- Refactored code to increase code quality
- Updated selectors to match the updated Google Fonts website
- Updated github workflow

## [0.1.1] - 2022-05-31
### Changed
- Added links to release number
### Fixed
- Previewing a typeface does not trigger new buttons to be added on screen anymore

## [0.1.0] - 2022-04-03
- Initial beta release

[0.1.0]: https://github.com/DaveKeehl/fonts-jar/releases/tag/0.1.0
[0.1.1]: https://github.com/DaveKeehl/fonts-jar/compare/0.1.0...0.1.1
[0.2.0]: https://github.com/DaveKeehl/fonts-jar/compare/0.1.1...0.2.0
[0.3.0]: https://github.com/DaveKeehl/fonts-jar/compare/0.2.0...0.3.0
[0.4.0]: https://github.com/DaveKeehl/fonts-jar/compare/0.3.0...0.4.0