import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    env: {
        API_URL: "http://localhost:3000",
        DB_LOCAL_URI: 'mongodb://127.0.0.1:27017/bookit-v2',
        DB_URI: '',
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
