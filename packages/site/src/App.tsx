import { FunctionComponent, ReactNode, useContext } from 'react';
import styled from 'styled-components';
import { Footer, Header } from './components';
import { GlobalStyle } from './styled/theme';
import Root, { ToggleThemeContext } from './Root';
import Main from './pages/Main';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  max-width: 100vw;
`;

type AppProps = {
  children?: ReactNode;
};

const App: FunctionComponent<AppProps> = ({ children }) => {
  // const App: FunctionComponent = () => {
  const toggleTheme = useContext(ToggleThemeContext);

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Header handleToggleClick={toggleTheme} />
        <Main />
        {children}
        <Footer />
      </Wrapper>
    </>
  );
};

export default App;
