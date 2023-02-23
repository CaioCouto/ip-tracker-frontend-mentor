
import { useState, useEffect } from 'react';

import styles from './Header.module.css';
import { getIPGeolocation } from '../../api';
import { formatUTCOffset } from '../../utils';

const informationFields = [ 
    {
        label: 'IP Address',
        value: (data) => data.ip
    },
    {
        label: 'Location',
        value: (data) => `${ data.location.city }, ${ data.location.region } ${ data.location.postalCode }`
    },
    {
        label: 'Timezone',
        value: (data) => `UTC ${data.location.timezone}`
    },
    {
        label: 'ISP',
        value: (data) => data.isp
    },
];

function setFloatingSectionWidth() {
    const headerInformationSection = document.querySelector(`.${styles["header-information"]}`);
    if(!headerInformationSection || window.innerWidth > 900) return;
    const headerInputSection = document.querySelector(`.${styles["header-form"]}`);
    headerInformationSection.style.width = headerInputSection.clientWidth+'px';
}

function InformationSection({ data }) {
    return (
        <section className={ `${styles["header-section"]} ${styles["header-information"]}` }>
            {
                !data ?
                <h1>Search for any IPv4 address.</h1> :
                typeof(data) === 'string' ?
                <h1>{ data }</h1> :
                informationFields.map((field, index) => (
                    <div key={ index }>
                        <p className={ styles["header-information-dataLabel"] }>{ field.label }</p>
                        <h3 className={ styles["header-information-dataValue"] }>{ field.value(data) }</h3>
                    </div>
                ))
                
            }
        </section>
    );
}

function Header({ setCoordinates }) {
    const [ ip, setIp ] = useState('');
    const [ data, setData] = useState(null);

    function handleIpChange(value) {
        setIp(value.replace(/[^0-9.]/g, ''));
    }

    function submit(e) {
        if(e) e.preventDefault();
        getIPGeolocation(ip, setData, setCoordinates);
    }

    useEffect(() => { 
        setFloatingSectionWidth();
        getIPGeolocation(ip, setData, setCoordinates);
     }, []);

    return (
        <header className={ styles["header"] }>
            <div className={ styles["header-container"] }>
                <h1 className={ styles["header-heading"] }>IP Address Tracker</h1>

                <form className={`${styles["header-section"]} ${styles["header-form"]}`} onSubmit={(e) => submit(e)}>
                    <label htmlFor="header-form-input" style={{ display: 'none' }}>IP Adress</label>
                    <input 
                        type="text" 
                        value={ ip }
                        id="header-form-input" 
                        className={ styles["header-form-input"] }
                        onChange={(e) => handleIpChange(e.target.value)}
                        autoFocus
                    />
                    <button className={ styles["header-form-button"] } type='button' onClick={ () => submit() }>
                        <img src="images/icon-arrow.svg" alt="A greater than symbol"/>
                    </button>
                </form>

                <InformationSection data={ data }/>
            </div>
        </header>
    )
}

export default Header;
