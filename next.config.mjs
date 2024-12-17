import { createProxyMiddleware } from "http-proxy-middleware";

const nextConfig = {
	async rewrites() {
		return [
			{
				source: "/api/:path*", // Перехват локальных API-запросов
				destination: "http://gateway.scan-interfax.ru/api/:path*", // Перенаправление на целевой сервер
			},
		];
	},
};

export default nextConfig
