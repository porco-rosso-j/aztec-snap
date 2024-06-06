import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import {
  useTheme,
  AppContextProviderComponent,
  MetaMaskProvider,
} from './contexts';
import { AppShell, MantineProvider } from '@mantine/core';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Wallet, Bridge, Swap } from './pages';
import { Header, Footer } from './components';
import { Notifications } from '@mantine/notifications';
const App = () => {
  const { isDarkTheme, toggleTheme } = useTheme();

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
                    <Route
                      path="/bridge"
                      element={
                        <>
                          <Bridge isDarkTheme={isDarkTheme} />
                        </>
                      }
                    />
                    <Route
                      path="/swap"
                      element={
                        <>
                          <Swap isDarkTheme={isDarkTheme} />
                        </>
                      }
                    />
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
