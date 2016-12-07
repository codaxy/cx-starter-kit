import { Widget, VDOM } from 'cx/ui';

export class LoadingIndicator extends Widget {
   render(context, instance, key) {
      return <LoadingIndicatorComponent key={key} instance={instance} />
   }
}

class LoadingIndicatorComponent extends VDOM.Component {
   render() {
      var {instance} = this.props;
      var {widget} = instance;
      var {CSS} = widget;

      var classNames = CSS.block("loading-indicator", {}, {
         loading: this.state && this.state.loading,
         absolute: widget.absolute
      });

      return <div className={classNames}>
         <div className={CSS.element("loading-indicator", "slider")}>
            <div/>
         </div>
         { !widget.absolute && "Loading..." }
      </div>;
   }

   componentDidMount() {
      setTimeout(()=> {
         this.setState({
            loading: true
         });
      }, 5);
   }
}
