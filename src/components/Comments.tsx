import React, { useEffect, useState } from 'react';
import {  IonItem, IonInput, IonLabel, IonCheckbox, IonButton } from '@ionic/react';

export interface Item {
  title: string;
  link: string;
  enclosure: {
    link: string
  }
}

const Comments: React.FC = () => {
  const [feed, setFeed] = useState< [Item] | null>(null);

  useEffect(() => {
    fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.motorsport.com%2Frss%2Ff1%2Fnews%2F')
      .then(res => res.json())
      .then(result => {
        setFeed(result.items)
      });
  }, []);

  return (
      <form className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Username</IonLabel>
          <IonInput />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput type="password" />
        </IonItem>
        <IonItem lines="none">
          <IonLabel>Remember me</IonLabel>
          <IonCheckbox defaultChecked={true} slot="start" />
        </IonItem>
        <IonButton className="ion-margin-top" type="submit" expand="block">
          Login
        </IonButton>
      </form>
  );
};

export default Comments;
