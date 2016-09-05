import {CSS as CSSBase} from 'cx/ui/CSS';
import {CSSHelper} from 'cx/ui/CSSHelper';

export class CSS extends CSSBase {

}

CSS.classPrefix = 'cs';
CSSHelper.register('cs', CSS);