/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: { unoptimized: true },
    env: {
        NEXT_PUBLIC_API_URL: "https://vietphuong.shop",
        // NEXT_PUBLIC_API_URL: "http://localhost:8080",
        NEXT_PUBLIC_TOKEN_TYPE: "Bearer "
    }
}

module.exports = nextConfig
