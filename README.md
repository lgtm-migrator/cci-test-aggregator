# CircleCI Test Aggregator

> Aggregates test results from multiple CircleCI pipeline steps

When running builds that depend on external pipelines to complete (such as Project Helix Smoke Tests) it is inconvenient to find the correct URL for the workflow in the CircleCI log messages, open it, find the failed build job and check the test results there. With this utility you can use the CircleCI API to aggregate test results from external pipeline runs (multiple jobs) and report them in the JUnit test format that CircleCI expects.

## Status
[![codecov](https://img.shields.io/codecov/c/github/adobe/cci-test-aggregator.svg)](https://codecov.io/gh/adobe/cci-test-aggregator)
[![CircleCI](https://img.shields.io/circleci/project/github/adobe/cci-test-aggregator.svg)](https://circleci.com/gh/adobe/cci-test-aggregator)
[![GitHub license](https://img.shields.io/github/license/adobe/cci-test-aggregator.svg)](https://github.com/adobe/cci-test-aggregator/blob/master/LICENSE.txt)
[![GitHub issues](https://img.shields.io/github/issues/adobe/cci-test-aggregator.svg)](https://github.com/adobe/cci-test-aggregator/issues)
[![LGTM Code Quality Grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/adobe/cci-test-aggregator.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/adobe/cci-test-aggregator)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Installation

```bash
$ npm install @adobe/cci-test-aggregator
```

## Usage

```bash
$ export SMOKE_TEST_TOKEN="<your circleci token here>"
# Replace the URL with your Pipeline URL
$ npx @adobe/cci-test-aggregator https://circleci.com/api/v2/pipeline/477b38d1-faf7-4156-a48a-9aba71acbc4a/workflow
$ cat junit/junit.xml
```

You can now use the `junit` folder as test artifact in CircleCI.

## Development

### Build

```bash
$ npm install
```

### Test

```bash
$ npm test
```

### Lint

```bash
$ npm run lint
```
