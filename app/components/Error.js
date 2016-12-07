import { Widget, VDOM } from 'cx/ui';

export class Error extends Widget {

   declareData() {
      super.declareData({
         text: undefined
      }, ...arguments);
   }

   render(context, instance, key) {
      var {data} = instance;
      return <div key={key} className="error-indicator">
         {data.text || this.renderChildren(context, instance)}
      </div>;
   }
}
