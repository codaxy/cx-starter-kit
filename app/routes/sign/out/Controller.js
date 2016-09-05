import {Controller} from 'cx/ui/Controller';
import {Url} from 'cx/app/Url';
import {History} from 'cx/app/History';

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
