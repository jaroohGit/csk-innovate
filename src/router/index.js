import { createWebHistory, createRouter } from "vue-router";
import routes from './routes';
import appConfig from "../../app.config";

const router = createRouter({
  history: createWebHistory(),
  routes,
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, left: 0 };
    }
  },
});

// Simple JWT-based Authentication Guard
router.beforeEach((routeTo, routeFrom, next) => {
  // Check if route requires authentication
  const authRequired = routeTo.matched.some((route) => route.meta.authRequired);
  
  // Get JWT token from localStorage
  const token = localStorage.getItem('jwt_token');
  
  // Public pages that don't require authentication
  const publicPages = ['/', '/login', '/register', '/forgot-password'];
  const isPublicPage = publicPages.includes(routeTo.path);
  
  console.log('🔒 Router Guard:', {
    path: routeTo.path,
    authRequired,
    hasToken: !!token,
    isPublicPage
  });
  
  // If route requires auth but no token, redirect to login
  if (authRequired && !token) {
    console.log('❌ No token, redirecting to login');
    return next({ 
      name: 'login', 
      query: { redirect: routeTo.fullPath } 
    });
  }
  
  // If logged in and trying to access login page, redirect to dashboard
  if (isPublicPage && token && routeTo.path === '/login') {
    console.log('✅ Already logged in, redirecting to dashboard');
    return next({ name: 'overview-dashboard' });
  }
  
  // Otherwise, allow navigation
  console.log('✅ Navigation allowed');
  next();
});

// Set page title
router.beforeResolve(async (routeTo, routeFrom, next) => {
  try {
    for (const route of routeTo.matched) {
      await new Promise((resolve, reject) => {
        if (route.meta && route.meta.beforeResolve) {
          route.meta.beforeResolve(routeTo, routeFrom, (...args) => {
            if (args.length) {
              next(...args);
              reject(new Error('Redirected'));
            } else {
              resolve();
            }
          });
        } else {
          resolve();
        }
      });
    }
  } catch (error) {
    return;
  }
  
  // Set page title
  const title = routeTo.meta.title || 'Dashboard';
  document.title = title + ' | ' + appConfig.title;
  
  next();
});

export default router;
