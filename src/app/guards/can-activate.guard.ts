import { CanActivateFn, Route, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SupabaseService } from '../supabase.service';

export const canActivateGuard: CanActivateFn = async (route, state) => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  const session = await supabase.checkSession();
  const { path } = route.routeConfig as Route;

  if (path && ['login', 'signup'].includes(path)) {
    route.data = { ...(route.data ? route.data : {}), isLoggedIn: !!session };
    console.log(route.data);
    return true;
  }
  if (session) {
    return true;
  } else {
    return router.parseUrl('/login');
  }
};
