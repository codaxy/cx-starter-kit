import {HtmlElement} from 'cx/ui/HtmlElement';
import {Controller} from 'cx/ui/Controller';
import {Link} from 'cx/ui/nav/Link';
import {MessageLayout} from 'app/layouts/MessageLayout';
import {Md} from 'app/components/Md';

export default <cx>
    <main visible:expr="!{user}" outerLayout={MessageLayout} >
        <h3>Welcome to Cx Starter Kit</h3>
        <p>This is the default page.</p>
        <p>
            <Link href="~/sign/in">Sign In</Link>
        </p>
    </main>

    <main visible:expr="!!{user}" style="padding: 30px">

        <div putInto="header">
            <ul class="csb-breadcrumb">
                <li class="cse-breadcrumb-item"><Link href="~/">Home</Link></li>
            </ul>
        </div>

        <Md>
            ### Welcome to Cx Starter Kit

            This is a sample application created to help developers by:

            - providing a starting point for new projects
            - being a repository of best practices
            - demonstrating usage of:
                - Widgets
                - Layouts
                - Charts
                - Routing
            - providing ready to use examples of typical application pages
                - admin pages
                - dashboard pages
            - recommending scalable project structure
            - explain advanced webpack usage
                - hot reload
                - production builds
                - code splitting
                - on demand code loading
            - providing a sample CSS structure

            The source code is available from [GitHub](https://github.com/codaxy/cx-starter-kit).

            This project wouldn't be possible without a number of other open-source products:

            * [React](https://facebook.github.io/react/)
            * [Babel](https://babeljs.io/)
            * [webpack](https://webpack.github.io/)
            * [marked](https://github.com/chjj/marked)
            * [casual](https://github.com/boo1ean/casual)
        </Md>
    </main>
</cx>

