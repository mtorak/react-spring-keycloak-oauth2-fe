
import { useEffect } from 'react'
import Cards from './Cards'
import keycloak from './keycloak/keycloak';
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web';

import './App.css'

function App() {
  return (
    <ReactKeycloakProvider authClient={keycloak}>
      <SecuredContent />
    </ReactKeycloakProvider>
  );
}

const SecuredContent = () => {

  const { keycloak } = useKeycloak();
  const isLoggedIn = keycloak.authenticated;

  useEffect(() => {
    if (isLoggedIn == false)
      keycloak.login();
  }, [isLoggedIn, keycloak]);

  if (!isLoggedIn)
    return <div>Not logged In</div>

  return (
    <div>
      <h2>Springboot app using Keycloak authentication provider</h2>
      <Cards />
    </div>
  );
}

export default App
