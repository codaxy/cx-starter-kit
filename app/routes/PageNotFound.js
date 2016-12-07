import { HtmlElement, Link } from 'cx/widgets';

export const PageNotFound = <cx>
  <main class="content-pad">
    <div putInto="header">
      <ul class="csb-breadcrumb">
        <li class="cse-breadcrumb-item"><Link href="~/">Home</Link></li>
        <li class="cse-breadcrumb-item">Page Not Found</li>
      </ul>
    </div>
    <h3>404 :(</h3>
    <p>
      Page that you're looking for could not be found or you may not have sufficient privileges to see it.
    </p>
    <Link href="~/">Home</Link>
  </main>
</cx>;
