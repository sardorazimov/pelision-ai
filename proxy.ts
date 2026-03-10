import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/', 
  '/sign-in(.*)', 
  '/sign-up(.*)',
  '/api/webhooks/clerk(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
  // Eğer gidilen yer public listesinde DEĞİLSE (dashboard gibi), orayı koru
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // 2. ÖNEMLİ: Bu matcher, Clerk'in iç dosyalarını (trpc, internal vb.) da kapsamalı
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};