/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_API_URL: 'http://localhost:8080',
        NEXT_PUBLIC_TOKEN_TYPE: 'Bearer ',
    },
}

module.exports = nextConfig
