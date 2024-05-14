import {
  IonMenu,
  IonContent,
  IonList,
  IonItemDivider,
  IonMenuToggle,
  IonButton,
} from "@ionic/react";

export default function PageMenu({}: {}) {
  return (
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
  );
}
