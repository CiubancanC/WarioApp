import {
  IonButton,
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Chat</IonTitle>
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
      {children}
    </IonPage>
  );
}
