import React from 'react';
import moment from 'moment';
import { Paper, Typography } from '@material-ui/core'
import styled from 'styled-components';

export default function Agenda({ eventos, onEventoSelecionado }) {
    return (
        <WeekContainer>
            {
                eventos.map(data => (
                    <DayContainer dia={data.dia} key={data.dia}>
                        <TitleContainer>{data.dia}</TitleContainer>
                        {data.eventos.map((evento, index) => (
                            <EventoItem
                                onDoubleClick={() => onEventoSelecionado(evento)}
                                color={evento.color}
                                textColor={evento.textColor}
                                key={index} >
                                <p>{evento.title}</p>
                                <HourContainer>{moment(evento.date).format("HH:mm")}</HourContainer>
                            </EventoItem>
                        ))}
                    </DayContainer>
                ))
            }


        </WeekContainer>
    )
}

function EventoItem({ ...props }) {
    return <EventoItemContainer {...props} />
}

const TitleContainer = styled(Typography)`
    border-bottom: 1px solid #e1e1e1;
    padding: 8px 4px;
    text-transform: capitalize;
`;

const EventContainer = styled(Typography)`
    border-bottom: 1px solid #e1e1e1;
    padding: 8px 4px;
`;

const EventoItemContainer = styled.div`
    border-bottom: 1px solid #e1e1e1;
    padding: 4px 4px;
    margin: 4px 0;
    border-radius: 4px;
    background: ${props => props.color};
    color: ${props => props.textColor};
`;


const WeekContainer = styled.div`
    display: flex;
    flex-direction: row;

`
const DayContainer = styled.div`
    flex-direction: column;
    display: flex;
    flex: 1;
    padding-right: 8px;

`

const HourContainer = styled.div`
    flex-basis: 30px;
`