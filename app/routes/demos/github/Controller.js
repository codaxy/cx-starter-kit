import { Controller } from 'cx/ui';
import base64 from 'base-64';

export default class extends Controller {
    init() {
        super.init();

        var store = this.store;

        store.init("$page", {
            tab: 'readme',
            search: {
                query: '',
                lang: 'javascript',
                langName: 'JavaScript'
            },
            langs: [{
                id: 'javascript',
                text: 'JavaScript'
            }, {
                id: 'csharp',
                text: 'C#'
            }, {
                id: 'php',
                text: 'PHP'
            }, {
                id: 'java',
                text: 'Java'
            }, {
                id: 'go',
                text: 'Go'
            }, {
                id: 'ruby',
                text: 'Ruby'
            }]
        });

        this.addTrigger('search', ['$page.search'], function(search) {
            var qs = search.query;
            if (search.lang)
                qs += '+language:' + search.lang;

            if (qs) {
                store.set('$page.loading', 'in-progress');
                fetch(`https://api.github.com/search/repositories?q=${qs}&sort=stars&order=desc`)
                .then(r=>r.json())
                .then(d=> {
                    store.set('$page.repos', d.items);
                    store.set('$page.loading', 'done');
                });
            }
        }, true);

        this.addComputable('$page.selected.repo', ['$page.selected.id', '$page.repos'], function (selected, repos) {
            return repos && repos.find(a=>a.id == selected);
        });

        this.addTrigger('tabLoader', ['$page.selected.repo', '$page.tab'], function (repo, tab) {
            if (repo) {
                switch (tab) {
                    case 'readme':
                        store.set('$page.selected.info.readme.status', 'loading');
                        fetch('https://api.github.com/repos/' + repo.owner.login + '/' + repo.name + '/readme')
                            .then(r=>r.json())
                            .then(r=> {
                                if (r.content)
                                    store.set('$page.selected.info.readme', {
                                        text: base64.decode(r.content),
                                        status: 'ok'
                                    });
                                else
                                    store.set('$page.selected.info.readme', {
                                        error: r.message,
                                        status: 'error'
                                    });
                            })
                            .catch(error=> {
                                store.set('$page.selected.info.readme', {
                                    error,
                                    status: 'error'
                                });
                            });
                        break;
                    case 'commits':
                    case 'contributors':
                        store.set('$page.selected.info.commits.status', 'loading');
                        fetch('https://api.github.com/repos/' + repo.owner.login + '/' + repo.name + '/commits')
                            .then(r=>r.json())
                            .then(r=> {
                                if (r.message)
                                    store.set('$page.selected.info.commits', {
                                        status: 'error',
                                        error: r.message
                                    });
                                else
                                    store.set('$page.selected.info.commits', {
                                        list: r,
                                        status: 'ok'
                                    });
                            })
                            .catch(err=> {
                                store.set('$page.selected.info.commits.status', 'error');
                                store.set('$page.selected.info.commits.error', err);
                            });
                        break;
                }
            }
        }, true);

        this.addComputable('$page.selected.info.contributors', ['$page.selected.info.commits'], function (commits) {
            if (!commits || commits.status != 'ok')
                return null;
            
            var cache = {};
            commits.list.forEach(x=> {
                var login = x.commit.committer.name;
                var c = cache[login];
                if (!c)
                    c = cache[login] = {
                        login,
                        author: x.author,
                        commits: 0
                    }
                c.commits++;
            });

            return Object.keys(cache).map(k=>cache[k]);
      });
    }    
}