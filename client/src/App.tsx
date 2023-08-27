import { useMsal } from '@azure/msal-react';
import GamePage from './pages/GamePage';

function App() {
    const { accounts } = useMsal();
    const userName = accounts[0].name

    return (
        <GamePage userName={userName}/>
    );
}

export default App;
