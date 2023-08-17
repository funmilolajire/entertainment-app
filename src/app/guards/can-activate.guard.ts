import { CanActivateFn, Route, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SupabaseService } from '../supabase.service';

export const canActivateGuard: CanActivateFn = async (route, state) => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  const session = await supabase.checkSession();
  const { path } = route.routeConfig as Route;

  if (session) {
    if (path && ['login', 'signup'].includes(path)) {
      route.data = { isLoggedIn: true };
    }
    console.log('session', session);
    return true;
  }
  return router.createUrlTree(['/login']);
};

// runInInjectionContext(
//   Injector.create({ providers: [] }),
//   () => canActivateGuard
// );
