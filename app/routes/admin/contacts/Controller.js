import {Controller} from 'cx/ui/Controller';
import {History} from 'cx/app/History';
import {Url} from 'cx/app/Url';
import {contacts} from './api';

export default class extends Controller {
    init() {
        super.init();

        this.store.init('$page.filter', {
            query: null
        });

        this.addTrigger('load', ['$page.filter'], () => this.reload(), true);

        this.addTrigger('selection', ['$page.selection.id'], id => {
            if (id > 0) {
                var promise = contacts.get(id)
                                      .then(data => {
                                          this.store.set('$page.entry', data);
                                      });
                this.setLoadingIndicator(promise);
            }
        }, true);
    }

    reload(callback) {
        var filter = this.store.get('$page.filter');
        var promise = contacts.query(filter)
                              .then(data => {
                                  this.store.set('$page.contacts', data);
                                  if (data.length > 0)
                                      this.store.init('$page.selection.id', data[0].id); //select first
                              });
        this.setLoadingIndicator(promise);
    }

    onSave(e) {
        var entry = {...this.store.get('$page.entry')},
            action;

        if (entry.add) {
            delete entry.add;
            action = contacts.put(entry)
                             .then(data=> {
                                 this.reload();
                                 this.store.set('$page.selection.id', data.id);
                             });

        }
        else {
            action = contacts.post(entry.id, entry)
                             .then(()=> {
                                 this.reload()
                             });
        }
        this.setSavingIndicator(action);
    }

    onAdd(e) {
        var entry = {
            firstName: 'New',
            lastName: 'Contact',
            displayName: 'New Contact',
            add: true,
            id: -1
        };

        this.store.update('$page.contacts', contacts => [...contacts.filter(c=>!c.add), entry]);
        this.store.set('$page.entry', entry);
        this.store.set('$page.selection.id', entry.id);
    }

    onDelete(e) {
        var entry = {...this.store.get('$page.entry')};

        if (entry.add) {
            this.store.update('$page.contacts', contacts => contacts.filter(c=>!c.add));
        }
        else {
            contacts.delete(entry.id)
                    .then(()=> {
                        this.store.delete('$page.selection.id');
                        this.reload()
                    });
        }
    }

    setSavingIndicator(p) {
        this.store.update('$page.saving', saving => (saving || 0) + 1);
        p.then(()=> {
            this.store.update('$page.saving', saving => saving - 1);
        }).catch(()=> {
            this.store.update('$page.saving', saving => saving - 1);
        })
    }

    setLoadingIndicator(p) {
        this.store.update('$page.loading', loading => (loading || 0) + 1);
        p.then(()=> {
            this.store.update('$page.loading', loading => loading - 1);
        }).catch(()=> {
            this.store.update('$page.loading', loading => loading - 1);
        })
    }
}
