import {Controller} from 'cx/ui/Controller';
import {History} from 'cx/app/History';
import {Url} from 'cx/app/Url';

export default class extends Controller
{
    signIn() {
        this.store.set('user', 'test');
        sessionStorage.setItem('user', 'test');
        var returnUrl = this.store.get('$route.returnUrl');
        History.pushState({}, null, Url.resolve(returnUrl || '~/'));
    }
}
