import React from 'react';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonTitle,
    IonSlides,
    IonSlide,
    IonGrid,
    IonRow,
    IonCol
} from '@ionic/react';
import {RouteComponentProps} from 'react-router';
import Circuit from '../components/circuit/Circuit/Circuit';

interface RaceDetailsProps extends RouteComponentProps<{
    season: string,
    round: string,
    country: string,
    circuit: string
}> {
}

const RaceDetails: React.FC<RaceDetailsProps> = ({match}) => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/races"/>
                        <IonTitle>Race</IonTitle>
                    </IonButtons>
                </IonToolbar>
                <IonToolbar>
                    <IonSegment>
                        <IonSegmentButton value="circuit">
                            <IonLabel>Circuit</IonLabel>
                        </IonSegmentButton>
                    </IonSegment>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonSlides>
                    <IonSlide>
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <Circuit season={match.params.season} round={match.params.round}
                                             circuit={match.params.circuit}/>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonSlide>
                </IonSlides>
            </IonContent>
        </IonPage>
    );
};

export default RaceDetails;
