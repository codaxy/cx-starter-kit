import { Widget, VDOM, CSS } from 'cx/ui';

export class Glyph extends Widget
{
    declareData() {
        super.declareData(...arguments, {
            name: undefined
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

Glyph.prototype.styled = true;
