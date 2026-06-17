import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    env: {
        STRIPE_SECRET_KEY: "sk_test_AdB0pxiYLxR2TPguxODqjGdD00zj4fLcSC",
        API_URL: "http://localhost:3000",
        DB_LOCAL_URI: 'mongodb://127.0.0.1:27017/bookit-v2',
        DB_URI: '',
        CLOUDINARY_CLOUD_NAME: "dfsyknirz",
        CLOUDINARY_API_KEY: "948556831619488",
        CLOUDINARY_API_SECRET: "rVembhQ1TCXKUYni4rXkGzrBqr0",
        NEXTAUTH_DOMAIN: 'http://localhost:3000',
        NEXTAUTH_SECRET: 'srvssvadafabdabdddbtrtrtbbtr553b4bb',
        SMTP_HOST: 'sandbox.smtp.mailtrap.io',
        SMTP_PORT: '2525',
        SMTP_USER: 'f19dd4ec4674f9',
        SMTP_PASSWORD: '8858e84a006b87',
        SMTP_FROM_EMAIL: 'noreply@bookit.com',
        SMTP_FROM_NAME: 'BookIT',
        STRIPE_WEBHOOK_SECRET: 'whsec_26fa2c7a89e632f89a246abd137d4042b193edd973b1d68b9f47df8aefedfe1e'
    },
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'res.cloudinary.com',
                pathname: '**',
            },
        ],
    }
};

export default nextConfig;
