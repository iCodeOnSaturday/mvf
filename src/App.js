import React from 'react';
import styled from "styled-components/macro";
import SearchCard from './SearchCard'

export const BackgroundImage = styled.div`
    background-size: cover;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
`;

export const HeaderIntroText = styled.h2`
   color: white;
   padding: 20px;
   font-size: 24px;
   font-weight: 700;
   margin: auto;
   width: fit-content;
`;

function App() {
    return (
        <BackgroundImage
            style={{"backgroundImage": `url(https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80)`}}>
            <header>
                <HeaderIntroText>This app guesses the Github user's favourite programming language.</HeaderIntroText>
            </header>
            <main>
                <SearchCard />
            </main>
        </BackgroundImage>
    );
}

export default App;
