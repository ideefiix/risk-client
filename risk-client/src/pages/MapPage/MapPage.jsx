import EuropeMap from "../../assets/EuropeMap.jsx";
import Spinner from 'react-bootstrap/Spinner';
import {useEffect, useState} from "react";
import CountryInfoBox from "./CountryInfoBox.jsx";
import {Prev} from "react-bootstrap/PageItem";

const MapPage = ({carte, setCarte, setPlayer}) => {
    const [selectedCountry, setSelectedCountry] = useState(null)
    
    function selectCountryHandler(countryId) {
        if (countryId === null) {
            setSelectedCountry(null)
        }else{
            setSelectedCountry(carte.find(country => country.id === countryId))
        }
    }
    
    function updateCountryHandler(country){
        //Replace 1 country in the array
        const updatedArr = carte.map(c => {
            if(c.id === country.id){
                return country
            }else{
                return c
            }
        })
        setCarte(updatedArr)
        //Assume that the country updated is selected
        setSelectedCountry(country)
    }
    
    function updatePlayerHandler(oldTerritory, newTerritory, attackingTroops){
        if(oldTerritory.ownername === newTerritory.ownername){
            //Attack lost
            setPlayer(prev => {
                return {
                    ...prev,
                    troops: prev.troops - attackingTroops,
                    kills: prev.kills + attackingTroops
                }
            })
        }else{
            //Attack won
        setPlayer(prev => {
            return {
                ...prev,
                troops: prev.troops - attackingTroops,
                kills: prev.kills + oldTerritory.troops
            }
        })
        }
    }

    return (
        <div className={"map-container"}>
            {
                !!carte ?
                    <div className={"position-relative"}>
                        {selectedCountry && <CountryInfoBox country={selectedCountry} updateCountryHandler={updateCountryHandler} updatePlayerHandler={updatePlayerHandler} />}
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