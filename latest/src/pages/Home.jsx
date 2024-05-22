import React from 'react';
import ButtonLink from '../Component/ButtonLink';
import Title from '../Component/Title';
function Home() {
    return (
        <>
        <div>
            <Title TitleText={'Information'}/>
        <ButtonLink ButtonLink="/" ButtonText="Åbningstider" />
        <ButtonLink ButtonLink="/" ButtonText="Billeter" />
        <ButtonLink ButtonLink="/" ButtonText="Køb Årskort" />
        <ButtonLink ButtonLink="/" ButtonText="Fodringstider" />
        <ButtonLink ButtonLink="/" ButtonText="Dyrepassere" />

        </div>
        </>
    )
}

export default Home;