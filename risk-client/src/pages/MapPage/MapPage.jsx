import EuropeMap from "../../assets/EuropeMap.jsx";
import Spinner from 'react-bootstrap/Spinner';
import {useEffect, useState} from "react";
import CountryInfoBox from "./CountryInfoBox.jsx";

const MapPage = ({carte}) => {
    const [selectedCountry, setSelectedCountry] = useState(null)
    
    function selectCountryHandler(countryId) {
        if (countryId === null) {
            setSelectedCountry(null)
        }else{
            //TODO: Find country in carte dictionary
            setSelectedCountry({
                "owner": "Svindlarn",
                "troop": 5000,
                "timeConquered": "13/3 18:53"
            })
        }
    }

    /*    useEffect(() => {
            setSelectedCountry({
                "owner": "Svindlarn",
                "troop": 5000,
                "timeConquered": "13/3 18:53"
            })
        }, [])*/

    return (
        <div className={"map-container"}>
            {
                !!carte ?
                    <div className={"position-relative"}>
                        {selectedCountry && <CountryInfoBox country={selectedCountry}/>}
                        <EuropeMap className={"europe-map"} carte={carte} setSelectedCountry={selectCountryHandler}/>
                    </div>
                    :
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
            }

        </div>
    )
}

export default MapPage