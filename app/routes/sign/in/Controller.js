import { Controller, History, Url } from 'cx/ui';




export default class extends Controller
{
    signIn() {
        this.store.set('user', 'test');
        sessionStorage.setItem('user', 'test');
        var returnUrl = this.store.get('$route.returnUrl');
        History.pushState({}, null, Url.resolve(returnUrl || '~/'));
    }
}
