import type { Config } from 'tailwindcss'

const config: Config = {
    content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                bg: '#0D1117',
                surface: '#111827',
                ink: '#0B1220',
                primary: '#0056B8',
                accent: '#00C2FF',
                success: '#10B981',
                warning: '#F59E0B',
                error: '#EF4444',
                muted: '#6B7280'
            },
            borderRadius: { xl: '0.75rem', '2x1': '1rem'},
            boxShadow: { card: '0 8px 32px rgba(0,0,0,0.35)' }
        }
    },
    plugins: []
}
export default config