'use client';
import { ReactNode, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

const theme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: '#ff1744',
        },
        background: {
            default: '#fff',
        },
    },
});

interface LayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement!.removeChild(jssStyles);
        }
    }, []);

    return (
        <html lang="en">
            <head>
                <title>Event Management System</title>
            </head>
            <body style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Container>
                        {children}
                    </Container>
                </ThemeProvider>
            </body>
        </html>
    );
}
