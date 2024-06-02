// src/pages/Information.jsx
import React from 'react';
import Section from '../Component/Section';
import Tab from '../Component/tab';
import '../Styles/Information.css';
import Title from '../Component/Title';

const Information = () => {
    const openingHours = [
        { left: 'alle dage fra 1.april - 31. oktober:', right: '10:00 - 17:00' },

    ];
    const annualCardPrices = [
        { left: 'Voksen', right: '489 kr.' },
        { left: 'Barn 3-13 år', right: '310 kr.' },
    ];
    const prices = [
        { left: 'Voksne', right: '200 kr.' },
        { left: 'Børn 3-13 år', right: '130 kr.' },
        { left: 'Børn 0-1 år', right: 'Gratis' },
        { left: 'Senior +65 år', right: '180 kr.' },

    ];
    const feedingHours = [
        { left: 'Søbjørne', right: '10:30-11:00' },
        { left: '', right: '15:30-16:00' },
        { left: '', right: '' },

        { left: 'Løver', right: '16:15-16:45' },
        { left: 'Kænguruer', right: '11:30-12:00' },
        { left: 'Zebra', right: '13:00-13:30' },

    ];
    const tourPrices = [
        { left: 'Cykelbåde', right: '10 kr.' },
        { left: 'Karrusel', right: '5 kr.' },
        { left: 'Trækketur på pony', right: '25 kr.' },
        { left: 'Kajak', right: '5 kr.' },

    ];

    return (
        <div className="information-page">
            <Title TitleText={'Information'} />
            <div className="tabs">
                <Tab to="#opening-hours" label="Åbningstider" />
                <Tab to="#prices" label="Billetpriser" />
                <Tab to="#annual-card" label="Fordele med
årskort!" />
                <Tab to="#feeding-hours" label="Fodringstider" />
                <Tab to="#tour" label="Turpriser" />

            </div>

            <Section id="opening-hours" title="Åbningstider" content={openingHours} />

            <Section id="prices" title="Billetpriser"  content={prices} />
            <Section id="annual-card" title="Fordele med årskort!">
                <p>
                    Med Årskort får I eksklusive rabatter i vores restauranter, caféer, kiosken samt souvenirshoppen. <br /> <br />
                    Derudover giver årskort adgang til en unik oplevelse med dyrene, hvor både børn og voksne kan være med til at fordre dyrene. <br /><br />
                    Børn (3-13 år) kan også give 50% på billetprisen til et andet barn i samme aldersgruppe. <br />
                </p>
                <Section content={annualCardPrices} customStyles={{ margin: '0', padding: '0', boxShadow: 'none' }} />
                <div className="button-container">
                    <button className="buy-button">Buy Annual Card</button>
                </div>
            </Section>

            <Section id="feeding-hours" title="Feeding Hours"  content={feedingHours}>
            </Section>
            <Section id="tour" title="Turpriser" content={tourPrices} />

        </div>
    );
};

export default Information;
