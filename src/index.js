#!/usr/bin/env node
/*
 * Copyright 2019 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
const { fetch } = require('@adobe/helix-fetch');
const builder = require('junit-report-builder');
/**
 * This is the main function
 * @param {string} name name of the person to greet
 * @returns {string} a greeting
 */
async function main() {
  const pipelineURL = process.argv.pop();
  // console.log(process.env.SMOKE_TEST_TOKEN);

  const opts = {
    headers: {
      'Circle-Token': process.env.SMOKE_TEST_TOKEN,
    },
  };

  const pipelineResp = await fetch(pipelineURL, opts);

  const workflowID = (await pipelineResp.json()).items[0].id;

  const projectSlug = (await pipelineResp.json()).items[0].project_slug;

  const jobsURL = `https://circleci.com/api/v2/workflow/${workflowID}/job`;

  const jobsResp = await fetch(jobsURL, opts);

  const jobs = (await jobsResp.json()).items;

  await jobs.reduce(async (tbuilder, job) => {
    if (job.job_number) {
      // console.log(`https://circleci.com/api/v2/project/${projectSlug}/${job.job_number}/tests`);
      const testResponse = await fetch(`https://circleci.com/api/v2/project/${projectSlug}/${job.job_number}/tests`, opts);

      const suite = (await tbuilder).testSuite().name(`CircleCI Build #${job.job_number}`);

      (await testResponse.json()).items.forEach((test) => {
        // console.log(test);
        // {
        // ✅  name: 'Comparing https://pages--davidnuescheler.hlx.page/creativecloud/en/ete/how-adobe-apps-work-together/ against https://pages--davidnuescheler.hlx-4.page/creativecloud/en/ete/how-adobe-apps-work-together/ testing head node',
        // ✅  file: '/home/circleci/project/test/pages/pages.test.js',
        // ✅  classname: 'testing head node',
        //   source: 'unknown',
        // ✅  result: 'success' | 'failure'
        // ✅  run_time: 0.047,
        //   message: null | 'string'
        // }
        const testCase = suite.testCase()
          .className(test.classname)
          .name(test.name)
          .file(test.file)
          .time(test.run_time);

        if (test.result === 'failure') {
          testCase.failure(test.message);
        }
      });

      // return [...(await tests), ...(await testResponse.json()).items]
    }
    return tbuilder;
  }, builder);

  builder.writeTo('junit/junit.xml');
}

main();
