export const MainBoxStyle = (isDarkTheme: boolean) => {
  return {
    maxWidth: '650px',
    height: '650px',
    padding: '50px',
    margin: 'auto',
    marginTop: '3.5rem',
    marginBottom: '1.5rem',
    boxShadow: 'rgb(0 0 0 / 8%) 0rem 0.37rem 0.62rem',
    borderRadius: '1.37rem',
    backgroundColor: isDarkTheme ? '#2E213E' : 'white',
    background: isDarkTheme
      ? 'radial-gradient(at center bottom, #1a1a1a, #281b31)'
      : 'radial-gradient(at center bottom, #FFFFFF, #F2F0FF)',
  };
};
