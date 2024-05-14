import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonContent,
  IonIcon,
  IonItemDivider,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonTitle,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";
import Chat from "./pages/Chat";
import "./App.css";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import PageWrapper from "./components/PageWrapper";

setupIonicReact();

const AppHeader: React.FC<{ title: string }> = ({ title }) => (
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonMenuButton />
      </IonButtons>
      <IonTitle>{title}</IonTitle>
      <IonButtons slot="end">
        <IonButton
          onClick={() => {
            /* Do nothing */
          }}
        >
          Button
        </IonButton>
      </IonButtons>
    </IonToolbar>
  </IonHeader>
);

const App: React.FC = () => (
  <IonApp>
    <IonMenu side="start" contentId="main-content">
      <IonContent>
        <IonList>
          <IonItemDivider>Menu</IonItemDivider>
          <IonMenuToggle>
            <IonButton>Item 1</IonButton>
            <IonButton>Item 2</IonButton>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/">
            <AppHeader title="Chat" />
            {/* We need to wrap our page in order to have reusable navigation that's also custom. */}
            <PageWrapper>
              <Chat />
            </PageWrapper>
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="top" style={{ display: "none" }}>
          <IonTabButton tab="chat" href="/">
            <IonIcon aria-hidden="true" icon={triangle} />
            <IonLabel>Chat</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
