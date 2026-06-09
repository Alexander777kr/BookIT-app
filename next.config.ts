import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    env: {
        API_URL: "http://localhost:3000",
        DB_LOCAL_URI: 'mongodb://127.0.0.1:27017/bookit-v2',
        DB_URI: '',
    },
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'res.cloudinary.com',
            }
        ]
    }
};

export default nextConfig;
