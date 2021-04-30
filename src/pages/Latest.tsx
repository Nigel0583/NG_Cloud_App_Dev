import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import RacePreview from '../components/race/RacePreview';
import Comments from '../components/Comments';

const Latest: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <RacePreview/>
        <Comments/>
      </IonContent>
    </IonPage>
  );
};

export default Latest;
