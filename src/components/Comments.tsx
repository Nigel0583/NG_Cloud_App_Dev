import React from 'react';
import {  IonItem, IonInput, IonLabel, IonCheckbox, IonButton } from '@ionic/react';
import Comms from './comms/Comms';

const Comments: React.FC = () => {
  return (
      <form className="ion-padding">
      <Comms/>
      </form>
  );
};

export default Comments;
