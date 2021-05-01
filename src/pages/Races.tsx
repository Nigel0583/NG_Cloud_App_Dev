import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons } from '@ionic/react';
import RaceList from '../components/race/RaceList';

const Races: React.FC = () => {

  const getYear = () => {
    return new Date().getFullYear();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Schedule</IonTitle>
          <IonButtons slot="end">
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <RaceList season={getYear()}/>
      </IonContent>
    </IonPage>
  );
};

export default Races;
