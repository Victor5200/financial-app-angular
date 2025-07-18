import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.warn('Access denied: No token found');
    return false;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));

    if (payload.exp && payload.exp < Date.now() / 1000) {
      console.warn('Access denied: Token has expired');
      return false;
    }
  } catch (error) {
    console.error('Access denied: Invalid token format', error);
    return false;
  }

  return true;
};
