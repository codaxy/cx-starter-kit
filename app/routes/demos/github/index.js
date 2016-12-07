import { HtmlElement, List, Text, Link, PureContainer, LookupField, TextField, Tab } from 'cx/widgets';
import { FirstVisibleChildLayout, KeySelection } from 'cx/ui';
import { Format } from 'cx/util';

import {LoadingIndicator} from 'app/components/LoadingIndicator';
import {Error} from 'app/components/Error';
import marked from 'marked';



import {applyOuterLayout} from 'app/layouts/dynamicLayout';

import Controller from './Controller';

Format.register('marked', text => marked(text));

export default <cx>
    <main class="csb-github"
          controller={Controller}>
        <div putInto="header">
            <ul class="csb-breadcrumb">
                <li class="cse-breadcrumb-item"><Link href="~/">Home</Link></li>
                <li class="cse-breadcrumb-item">Demos</li>
                <li class="cse-breadcrumb-item">GitHub Explorer</li>
            </ul>
        </div>
        <div class="cse-github-list">
            <div class="flex-row">
                <LookupField options:bind="$page.langs"
                             value:bind="$page.search.lang"
                             text:bind="$page.search.langName"
                             placeholder="Any Language"
                             style="margin-right: 5px;"/>
                <TextField value:bind='$page.search.query'
                           mode="edit"
                           class="flex-1"
                           placeholder="Search GitHub repository name..."
                           reactOn="enter blur"/>
            </div>

            <PureContainer layout={FirstVisibleChildLayout}>
                <LoadingIndicator visible:expr='{$page.loading} == "in-progress"'/>
                <i visible:expr='{$page.repos} && {$page.repos}.length == 0'>No results found.</i>
                <List records:bind="$page.repos"
                      class="flex-1"
                      selection={{
                          type: KeySelection,
                          bind: '$page.selected.id'
                      }}>
                    <div class="gh-repo">
                        <img src:bind='$record.owner.avatar_url'
                             alt="avatar"/>
                        <div class="description">
                            <h4 text:bind="$record.full_name"></h4>
                            <div innerHtml:tpl="{$record.description:marked}"></div>
                        </div>
                    </div>
                </List>
            </PureContainer>
        </div>
        <div class="cse-github-repo" visible:expr="{$page.selected.repo} != null">
            <header>
                <h3>
                    <a href:tpl="https://github.com/{$page.selected.repo.full_name}"
                       target="_blank"
                       text:bind="$page.selected.repo.full_name">
                    </a>
                </h3>
                <div innerHtml:tpl="{$page.selected.repo.description:marked}"/>
                <nav>
                    <Tab value:bind="$page.tab" tab="readme" mod="classic">
                        <LoadingIndicator visible:expr='{$page.selected.info.readme.status} == "loading"' absolute/>
                        Readme
                    </Tab>
                    <Tab value:bind="$page.tab" tab="contributors" mod="classic">
                        <LoadingIndicator visible:expr='{$page.selected.info.commits.status} == "loading"' absolute/>
                        Contributors
                    </Tab>
                    <Tab value:bind="$page.tab" tab="commits" mod="classic">
                        <LoadingIndicator visible:expr='{$page.selected.info.commits.status} == "loading"' absolute/>
                        Commits
                    </Tab>
                </nav>
            </header>
            <section>
                <div visible:expr='{$page.tab} == "readme"' layout={FirstVisibleChildLayout}>
                    <Error visible:expr='{$page.selected.info.readme.status} == "error"'
                           text:bind="$page.selected.info.readme.error"/>
                    <div class="gh-readme" innerHtml:tpl="{$page.selected.info.readme.text:marked}"/>
                </div>

                <div visible:expr='{$page.tab} == "contributors"'
                     layout={FirstVisibleChildLayout}
                     trimWhitespace={true}>

                    <Error visible:expr='{$page.selected.info.commits.status} == "error"'
                           text:bind="$page.selected.info.commits.error"/>
                    <div class="gh-readme" visible:expr='{$page.selected.info.commits.status} == "ok"'>
                        <p>Information based on last 30 commits.</p>

                        <List records:bind="$page.selected.info.contributors">
                            <img src:bind='$record.author.avatar_url'
                                 alt="avatar"
                                 style={{height: "16px"}}/>
                            <Text tpl=" {$record.login} - {$record.commits} commit(s)"/>
                        </List>
                    </div>
                </div>

                <div visible:expr='{$page.tab} == "commits"'
                     layout={FirstVisibleChildLayout}
                     trimWhitespace={true}>
                    <Error visible:expr='{$page.selected.info.commits.status} == "error"'
                           text:bind="$page.selected.info.commits.error"/>
                    <div class="gh-readme" visible:expr='{$page.selected.info.commits.status} == "ok"'>
                        <p>Information based on last 30 commits.</p>
                        <List records:bind="$page.selected.info.commits.list">
                            <Text tpl="{$record.commit.message}"/>
                        </List>
                    </div>
                </div>
            </section>
        </div>
    </main>
</cx>;