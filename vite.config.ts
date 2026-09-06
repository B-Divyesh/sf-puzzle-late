import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

const productRoutes = new Set(['/', '/demo', '/privacy', '/terms']);

function isUnknownRoute(url = '/'): boolean {
  const pathname = new URL(url, 'http://localhost').pathname;
  return !productRoutes.has(pathname) && !pathname.split('/').at(-1)?.includes('.');
}

export default defineConfig({
  plugins: [{
    name: 'puzzle-late-route-status',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        if (!isUnknownRoute(request.url) || !request.headers.accept?.includes('text/html')) return next();
        const source = await readFile(resolve(process.cwd(), 'index.html'), 'utf8');
        const html = await server.transformIndexHtml(request.url ?? '/', source);
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/html; charset=utf-8');
        response.end(html);
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use(async (request, response, next) => {
        if (!isUnknownRoute(request.url)) return next();
        const html = await readFile(resolve(process.cwd(), 'dist/index.html'), 'utf8');
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/html; charset=utf-8');
        response.end(html);
      });
    },
  }],
  build: {
    target: 'es2022',
    cssCodeSplit: true,
  },
  test: {
    exclude: ['tests/**', 'node_modules/**'],
  },
});
