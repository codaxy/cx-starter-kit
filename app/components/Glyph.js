import {Widget, VDOM} from 'cx/ui/Widget';
import {CSS} from 'cx/ui/CSS';

export class Glyph extends Widget
{
    declareData() {
        super.declareData(...arguments, {
            name: undefined,
            class: {structured: true},
            className: {structured: true},
            style: {structured: true}
        });
    }

    render(context, instance, key) {
        var {data} = instance;
        return <i key={key}
                  className={CSS.expand(data.classNames, `fa fa-${data.name}`)}
                  style={data.style}
                  aria-hidden="true"/>;
    }
}
