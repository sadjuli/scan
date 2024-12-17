import { createProxyMiddleware } from 'http-proxy-middleware';

export default function handler(req, res) {
	const proxy = createProxyMiddleware({
		target: 'http://gateway.scan-interfax.ru',
		changeOrigin: true,
		pathRewrite: {
			'^/proxy': '',                // Убираем "/api" из пути
		},
		onProxyReq: (proxyReq, req) => {
			if (req.method === 'POST') {
				proxyReq.setHeader('Content-Type', 'application/json');
			}
		},
	});

	return proxy(req, res, (err) => {
		if (err) {
			console.error('Ошибка прокси:', err);
			res.status(500).json({ error: 'Ошибка проксирования', details: err.message });
		}
	});
}
