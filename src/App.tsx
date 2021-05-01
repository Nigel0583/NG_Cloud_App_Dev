import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs
} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {homeOutline, podiumOutline, calendarOutline} from 'ionicons/icons';
import Latest from './pages/Latest';
import Standings from './pages/Standings';
import Races from './pages/Races';
import RaceDetails from './pages/RaceDetails';
import DriverDetails from './pages/DriverDetails';
import ConstructorDetails from './pages/ConstructorDetails/ConstructorDetails';
import Results from './pages/Results';
import Amplify from 'aws-amplify';
import {AmplifyAuthenticator, AmplifySignOut, AmplifySignUp, AmplifySignIn} from '@aws-amplify/ui-react';
import {AuthState, onAuthUIStateChange} from '@aws-amplify/ui-components';
import awsconfig from './aws-exports';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';

/* Theme variables */
import './theme/variables.css';

/* Global styles */
import './App.css';

Amplify.configure(awsconfig);

const App: React.FC = () => {
    const [authState, setAuthState] = React.useState<AuthState>();
    const [user, setUser] = React.useState<object | undefined>();

    React.useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)
        });
    }, []);
    return authState === AuthState.SignedIn && user ? (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonTabBar slot="top">
                        <IonTabButton tab="latest" href="/latest">
                            <IonIcon icon={homeOutline}/>
                            <IonLabel>Home</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="standings" href="/standings">
                            <IonIcon icon={podiumOutline}/>
                            <IonLabel>Standings</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="races" href="/races">
                            <IonIcon icon={calendarOutline}/>
                            <IonLabel>Schedule</IonLabel>
                        </IonTabButton>
                        <AmplifySignOut/>
                    </IonTabBar>
                    <IonRouterOutlet>
                        <Route path="/latest" component={Latest}/>
                        <Route path="/standings" component={Standings}/>
                        <Route path="/races" component={Races}/>
                        <Route path="/race/:season/:round/:country/:circuit" component={RaceDetails}/>
                        <Route path="/driver/:driverId" component={DriverDetails}/>
                        <Route path="/constructor/:constructorId" component={ConstructorDetails}/>
                        <Route path="/results/:season/:round/:session" component={Results}/>
                        <Route path="/" render={() => <Redirect to="/latest"/>} exact={true}/>
                    </IonRouterOutlet>
                </IonTabs>
            </IonReactRouter>
        </IonApp>
    ) : (
        <AmplifyAuthenticator usernameAlias="email">
            <AmplifySignUp
                slot="sign-up"
                usernameAlias="email"
                formFields={[
                    {
                        type: "nickname",
                        label: "Nickname",
                        placeholder: " Nickname",
                        required: true,
                    },
                    {
                        type: "email",
                        label: "Email ",
                        placeholder: " Email",
                        required: true,
                    },
                    {
                        type: "password",
                        label: "Password",
                        placeholder: "Password ",
                        required: true,
                    }
                ]}
            />
            <AmplifySignIn slot="sign-in" usernameAlias="email"/>
        </AmplifyAuthenticator>
    );
};

export default App;
