import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, Subscription } from 'rxjs';

export type BreadcrumbItem = {
  label: string;
  url?: string; // se não tiver, é a página atual
};


@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss',
})
export class Breadcrumb implements OnInit, OnDestroy {

  items: BreadcrumbItem[] = [];

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private sub?: Subscription;

  ngOnInit(): void {
    this.build();
    this.sub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => this.build());
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private build(): void {
    this.items = this.createBreadcrumbs(this.route.root);
    // garante que o último item não vire link (página atual)
    if (this.items.length) {
      this.items[this.items.length - 1] = { label: this.items[this.items.length - 1].label };
    }
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: BreadcrumbItem[] = []
  ): BreadcrumbItem[] {
    const children = route.children;
    if (!children.length) return breadcrumbs;

    for (const child of children) {
      const routeUrl = child.snapshot.url.map(s => s.path).join('/');
      const nextUrl = routeUrl ? `${url}/${routeUrl}` : url;

      const label = this.getLabel(child);
      if (label) {
        breadcrumbs.push({ label, url: nextUrl || '/' });
      }

      return this.createBreadcrumbs(child, nextUrl, breadcrumbs);
    }

    return breadcrumbs;
  }

  private getLabel(route: ActivatedRoute): string | null {
    const bc = route.snapshot.data?.['breadcrumb'];
    if (!bc) return null;

    if (typeof bc === 'function') {
      return bc(route.snapshot.data, route.snapshot.params);
    }
    return String(bc);
  }

}
