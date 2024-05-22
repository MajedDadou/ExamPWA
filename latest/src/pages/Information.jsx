// Information.jsx
import React from 'react';
import Section from '../Component/Section';
import Tab from '../Component/tab';
import '../Styles/Information.css';

const Information = () => {
    return (
        <div className="information-page">
            <div className="tabs">
                <Tab to="#opening-hours" label="Opening Hours" />
                <Tab to="#prices" label="Prices" />
                <Tab to="#annual-card" label="Annual Card" />
                <Tab to="#feeding-hours" label="Feeding Hours" />
            </div>

            <Section id="opening-hours" title="Opening Hours"customStyles={{ backgroundColor: '#2A444D' }}>
                <p>Details about opening hours...</p>
            </Section>

            <Section id="prices" title="Prices" customStyles={{ backgroundColor: '#684024' }}>
                <p>Details about prices...</p>
            </Section>

            <Section id="annual-card" title="Annual Card" customStyles={{ backgroundColor: '#0C4425' }}>
                <p>Details about the annual card...</p>
                <button className="buy-button">Buy Annual Card</button>
            </Section>

            <Section id="feeding-hours" title="Feeding Hours" customStyles={{ backgroundColor: '#2A444D' }}>
                <p>Details about feeding hours...</p>
            </Section>
        </div>
    );
};

export default Information;
