import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    env: {
        DB_LOCAL_URI: 'mongodb://127.0.0.1:27017/bookit-v2',
        DB_URI: '',
    }
};

export default nextConfig;
