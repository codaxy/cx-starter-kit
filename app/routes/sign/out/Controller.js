import { Controller, Url, History } from 'cx/ui';




export default class extends Controller
{
    init()
    {
        super.init();
        this.store.delete('user');
        sessionStorage.removeItem('user');
        History.pushState({}, null, Url.resolve('~/'));
    }
}
