/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
                port: '',
                pathname: '**',
            }
            // {
            //     protocol: 'https',
            //     hostname: 'avatars.githubusercontent.com',
            // },
            // {
            //     protocol: 'https',
            //     hostname: 'cdn.discordapp.com',

            // }
        ],
    },

}

module.exports = nextConfig
