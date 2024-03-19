import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { useTheme } from './contexts/theme';
import { AppContextProviderComponent } from './contexts/useAppContext';
import { MetaMaskProvider } from './contexts/MetamaskContext';
import { AppShell, Box, MantineProvider } from '@mantine/core';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Wallet from './components/Wallet';
import { Header, Footer } from './components';
import { Notifications } from '@mantine/notifications';

const App = () => {
  const { isDarkTheme, toggleTheme } = useTheme();
  console.log('isDarkTheme: ', isDarkTheme);

  return (
    <>
      <MantineProvider>
        <AppContextProviderComponent>
          <AppShell
            style={{
              backgroundColor: isDarkTheme ? '#251D37' : '#CEAAFD',
              background: isDarkTheme
                ? 'linear-gradient(135deg, #251D37, #340651)'
                : 'linear-gradient(135deg, #CEAAFD, #F9F5FD)',
            }}
          >
            <AppShell.Main>
              <Notifications />
              <MetaMaskProvider>
                <HashRouter>
                  <Header isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <>
                          <Wallet isDarkTheme={isDarkTheme} />
                        </>
                      }
                    />
                    <Route path="/bridge" element={<Box>bridge</Box>} />
                    <Route path="/defi" element={<Box>defi</Box>} />
                  </Routes>
                  <Footer isDarkTheme={isDarkTheme} />
                </HashRouter>
              </MetaMaskProvider>
            </AppShell.Main>
          </AppShell>
        </AppContextProviderComponent>
      </MantineProvider>
    </>
  );
};

export default App;
