/**
 * Copyright 2022 Octorelease Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as core from "@actions/core";
import * as github from "@actions/github";

export async function findCurrentPr(): Promise<any | undefined> {
    const octokit = github.getOctokit(core.getInput("github-token") || process.env.GITHUB_TOKEN as string);
    const result = await octokit.rest.repos.listPullRequestsAssociatedWithCommit({
        ...github.context.repo,
        commit_sha: github.context.sha
    });
    return result.data.find(pr => pr.state === "open" && github.context.payload.ref === `refs/heads/${pr.head.ref}`);
}
