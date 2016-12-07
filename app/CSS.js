import { CSS as CSSBase, CSSHelper } from 'cx/ui';

export class CSS extends CSSBase {

}

CSS.classPrefix = 'cs';
CSSHelper.register('cs', CSS);