import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { useTheme } from './contexts/theme';
import { AppContextProviderComponent } from './contexts/useAppContext';
import { MetaMaskProvider } from './contexts/MetamaskContext';
import { AppShell, Box, Button, Group, MantineProvider } from '@mantine/core';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Wallet from './components/Wallet';
import { Header } from './components';
import { Footer } from './components/Footer';
import { Notifications } from '@mantine/notifications';

const App = () => {
  const { isDarkTheme, toggleTheme } = useTheme();
  console.log('isDarkTheme: ', isDarkTheme);

  return (
    <>
      <MantineProvider>
        <AppContextProviderComponent>
          <AppShell
            style={{ backgroundColor: isDarkTheme ? '#35194D' : '#E8E0F0' }}
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
                          {/* <Index /> */}
                        </>
                      }
                    />
                    <Route path="/token" element={<Box>Tokens</Box>} />
                    <Route
                      path="/transaction"
                      element={<Box>Transaction</Box>}
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
