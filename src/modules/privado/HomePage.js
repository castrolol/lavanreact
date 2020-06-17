import React from 'react';
import Layout from '../../components/Layout';
import { Paper, Typography } from '@material-ui/core';
import styled from 'styled-components';


const TitleContainer = styled(Typography)`
    border-bottom: 1px solid #e1e1e1;
    padding: 8px 4px;
`;

const EventContainer = styled(Typography)`
    border-bottom: 1px solid #e1e1e1;
    padding: 8px 4px;
`;

const EventItemContainer = styled(Paper)`
    border-bottom: 1px solid #e1e1e1;
    padding: 4px 4px;
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


function Day() {
    return (
        <DayContainer >
            <TitleContainer> Segunda </TitleContainer>
            <EventContainer>
                <EventItemContainer> oi </EventItemContainer>
            </EventContainer>
        </DayContainer>

    );
}

function Hour() {
    return <HourContainer />
}


export default function HomePage() {
    return (
        <Layout>
            <Paper style={{ margin: 32, padding: 16 }}>

                <WeekContainer>
                    <Day />
                    <Day />
                    <Day />
                    <Day />
                    <Day />
                    <Day />
                </WeekContainer>

            </Paper>
        </Layout>
    )
}