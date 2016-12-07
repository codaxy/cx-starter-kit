import { HtmlElement } from 'cx/widgets';
import { Url, History } from 'cx/ui';
import marked from 'marked';
import {removeCommonIndent} from './removeCommonIndent';

var renderer = new marked.Renderer();

renderer.link = function(href, title, text) {
   href = Url.resolve(href);
   return marked.Renderer.prototype.link.call(this, href, title, text);
}

export class Md extends HtmlElement {

   attachProps(context, instance, props) {
      super.attachProps(context, instance, props);
      props.onClick = (e) => {
         if (e.target.tagName == 'A') {
            if (Url.isLocal(e.target.href) && e.target.href.indexOf('#') == -1) {
               if (!History.pushState({}, null, e.target.href))
                  e.preventDefault();
            }
         }
      }
   }

   add(text) {
      if (typeof text != 'string') {
         if (Array.from(arguments).every(a=>typeof a == 'string'))
            return this.add(Array.from(arguments).join(''));

         return super.add(...arguments);
      }

      var withoutIndent = removeCommonIndent(text);
      if (!withoutIndent)
         return null;

      var md = marked(withoutIndent, {renderer: renderer});

      return super.add({
         type: HtmlElement,
         innerHtml: md
      });
   }
}

Md.prototype.className = 'csb-md';
