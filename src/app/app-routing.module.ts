import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { LayoutComponent } from "./layout/layout.component";
import { AccountsByOwnerComponent} from './accounts/accounts-by-owner/accounts-by-owner.component'

const routes: Routes = [
  {
    path: "login",
    loadChildren: () =>
      import("./pages/authentication/login/login.module").then(
        (m) => m.LoginModule
      ),
  },
  {
    path: "register",
    loadChildren: () =>
      import("./pages/authentication/register/register.module").then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: "forgot-password",
    loadChildren: () =>
      import(
        "./pages/authentication/forgot-password/forgot-password.module"
      ).then((m) => m.ForgotPasswordModule),
  },
  {
    path: "coming-soon",
    loadChildren: () =>
      import("./pages/coming-soon/coming-soon.module").then(
        (m) => m.ComingSoonModule
      ),
  },
  {
    path: "",
    canActivate: [AuthGuard],
    component: LayoutComponent,
    children: [
      // {
      //   path: "",
      //   loadChildren: () =>
      //     import("./pages/dashboard/dashboard.module").then(
      //       (m) => m.DashboardModule
      //     ),
      //   pathMatch: "full",
      // },
      {
        path: "",
        loadChildren: () =>
          import("./accounts/accounts.module").then((m) => m.AccountsModule),
      },
      {
        path: "users",
        loadChildren: () =>
          import("./users/users.module").then((m) => m.UsersModule),
      },
      {
        path: "accounts",
        loadChildren: () =>
          import("./accounts/accounts.module").then((m) => m.AccountsModule),
      },
      {
        path: "favorites",
        loadChildren: () =>
          import("./favorites/favorites.module").then((m) => m.FavoritesModule),
      },
      {
        path: "banking-transactions",
        loadChildren: () =>
          import("./banking-transactions/banking-transactions.module").then(
            (m) => m.BankingTransactionsModule
          ),
      },

      // {
      //   path: 'apps/inbox',
      //   loadChildren: () => import('./pages/apps/inbox/inbox.module').then(m => m.InboxModule),
      // },
      // {
      //   path: 'apps/calendar',
      //   loadChildren: () => import('./pages/apps/calendar/calendar.module').then(m => m.CalendarAppModule),
      // },
      // {
      //   path: 'apps/chat',
      //   loadChildren: () => import('./pages/apps/chat/chat.module').then(m => m.ChatModule),
      // },
      // {
      //   path: 'components',
      //   loadChildren: () => import('./pages/components/components.module').then(m => m.ComponentsModule),
      // },
      // {
      //   path: 'forms/form-elements',
      //   loadChildren: () => import('./pages/forms/form-elements/form-elements.module').then(m => m.FormElementsModule),
      // },
      // {
      //   path: 'forms/form-wizard',
      //   loadChildren: () => import('./pages/forms/form-wizard/form-wizard.module').then(m => m.FormWizardModule),
      // },
      // {
      //   path: 'icons',
      //   loadChildren: () => import('./pages/icons/icons.module').then(m => m.IconsModule),
      // },
      // {
      //   path: 'page-layouts',
      //   loadChildren: () => import('./pages/page-layouts/page-layouts.module').then(m => m.PageLayoutsModule),
      // },
      // {
      //   path: 'maps/google-maps',
      //   loadChildren: () => import('./pages/maps/google-maps/google-maps.module').then(m => m.GoogleMapsModule),
      // },
      // {
      //   path: 'tables/all-in-one-table',
      //   loadChildren: () => import('./pages/tables/all-in-one-table/all-in-one-table.module').then(m => m.AllInOneTableModule),
      // },
      // {
      //   path: 'drag-and-drop',
      //   loadChildren: () => import('./pages/drag-and-drop/drag-and-drop.module').then(m => m.DragAndDropModule)
      // },
      // {
      //   path: 'editor',
      //   loadChildren: () => import('./pages/editor/editor.module').then(m => m.EditorModule),
      // },
      // {
      //   path: 'blank',
      //   loadChildren: () => import('./pages/blank/blank.module').then(m => m.BlankModule),
      // },
      // {
      //   path: 'level1/level2/level3/level4/level5',
      //   loadChildren: () => import('./pages/level5/level5.module').then(m => m.Level5Module),
      // },
    ],
  },
  // { path: "**", redirectTo: "", pathMatch: "full" },
  {
    path: "**",
    loadChildren: () =>
      import("./page-not-found/page-not-found.module").then(
        (m) => m.PageNotFoundModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: "enabled",
      // preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled",
      relativeLinkResolution: "legacy",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
