export const themeSettings: any = (primary: string, secondary: string) => {
    return {
        input: {
            '& input.Mui-disabled': {
                color: 'red',
            },
        },
        palette: {
            primary: {
                main: primary ? primary : '#0E295',
                contrastText: '#fff',
            },
            secondary: {
                main: secondary ? secondary : '#35bb5c',
                contrastText: '#fff',
            },
            error: {
                main: '#ef4037',
            },
        },
        overrides: {
            MuiTouchRipple: {
                childPulsate: {
                    backgroundColor: '#42bfc4',
                },
            },
            MuiButton: {
                variant: [
                    {
                        style: {
                            textTransform: 'none',
                        },
                    },
                ],
            },
            MuiTooltip: {
                arrow: {
                    color: '#435560',
                },
                tooltip: {
                    backgroundColor: '#435560',
                    fontSize: '11px',
                    textAlign: 'justify',
                },
            },
        },
        typography: {
            h1: {
                fontSize: '1.8rem',
                fontWeight: 700,
                color: '#000',
            },
            h2: {
                fontSize: '1.15rem',
                color: '#000',
                fontWeight: 600,
            },
            button: {
                textTransform: 'none',
            },
        },
    };
};
