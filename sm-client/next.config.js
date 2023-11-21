const {z} = require("zod");
/** @type {import('next').NextConfig} */
const nextConfig = {
    evn: {
        // This is optional because it's only used in development.
        // See https://next-auth.js.org/deployment.
        NEXTAUTH_URL: z.string().url().optional(),
        NEXTAUTH_SECRET: z.string().min(1),
        DATABASE_URL: z.string().min(1),
        SMTP_FROM: z.string().min(1),
        POSTMARK_API_TOKEN: z.string().min(1),
        POSTMARK_SIGN_IN_TEMPLATE: z.string().min(1),
        POSTMARK_ACTIVATION_TEMPLATE: z.string().min(1),
        STRIPE_API_KEY: z.string().min(1),
        STRIPE_WEBHOOK_SECRET: z.string().min(1),
        STRIPE_PRO_MONTHLY_PLAN_ID: z.string().min(1),
        NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
    },
}

module.exports = nextConfig
