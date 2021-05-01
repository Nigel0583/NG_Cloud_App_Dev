import React, { useEffect, useState } from 'react';
import { IonList, IonListHeader, IonItem, IonLabel, IonBadge, IonSkeletonText, IonThumbnail, IonImg } from '@ionic/react';
import { useHistory } from 'react-router';
import { Race } from '../../models';
import '@capacitor-community/http';
import {Plugins} from "@capacitor/core";

export interface RaceSession {
  name:      string;
  location:  string;
  latitude:  number;
  longitude: number;
  tbc:       boolean;
  round:     number;
  slug:      string;
  localeKey: string;
}


const Schedule: React.FC<{season: string, round: string}> = ({season, round}) => {
  let history = useHistory();
  const [race, setRace] = useState<Race | null>(null);
  const [raceSchedule, setraceSchedule] = useState<RaceSession | null>(null);
  const { Http } = Plugins;

  useEffect(() => {
    Http.request({
      method: 'GET',
      url: `https://ergast.com/api/f1/${season}/${round}.json`,
    })
    .then(({ data }) => {
      setRace(data.MRData.RaceTable.Races[0]);
    })

    Http.request({
      method: 'GET',
      url: `https://f1calendar.com/api/year/${season}`,
    })
    .then(({ data }) => {
      setraceSchedule(data.races[parseInt(round) - 1]);
    })
  }, [round, season, Http]);

  const _handleClick = (season: string, round: string, session: string, date: Date) => {
    if(new Date(date) < new Date()) {
      history.push(`/results/${season}/${round}/${session}`);
    }
  }

  if (raceSchedule === null || race === null) {
    return (
      <IonList lines="full">
        <IonListHeader>&nbsp;</IonListHeader>
        {[...Array(5)].map((item, index) =>
          <IonItem key={index}>
            <div slot="start">
              &nbsp;&nbsp;
            </div>
            <IonLabel>
              <h2><IonSkeletonText animated style={{ height: '11px', width: '40px' }}/></h2>
              <p><IonSkeletonText animated style={{ height: '11px', width: '100px' }}/></p>
            </IonLabel>
          </IonItem>
        )}
      </IonList>
    );
  }
  return (
    <>
    <IonItem lines="none" className="ion-margin-top">
        <IonThumbnail slot="start" >
          <IonImg src={`assets/img/flags/${race.Circuit.Location.country}.svg`} alt={race.Circuit.Location.country}/>
        </IonThumbnail>
        <IonLabel>
          <h2><strong>{race.Circuit.Location.country}</strong> {season}</h2>
          <p>{race.raceName}</p>
        </IonLabel>
      </IonItem>
    </>
  );
};

export default Schedule;
