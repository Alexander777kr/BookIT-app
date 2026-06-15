import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    env: {
        API_URL: "http://localhost:3000",
        DB_LOCAL_URI: 'mongodb://127.0.0.1:27017/bookit-v2',
        DB_URI: '',
        CLOUDINARY_CLOUD_NAME: "dfsyknirz",
        CLOUDINARY_API_KEY: "948556831619488",
        CLOUDINARY_API_SECRET: "rVembhQ1TCXKUYni4rXkGzrBqr0",
        NEXTAUTH_DOMAIN: 'http://localhost:3000',
        NEXTAUTH_SECRET: 'srvssvadafabdabdddbtrtrtbbtr553b4bb'
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
