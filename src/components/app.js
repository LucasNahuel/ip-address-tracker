import Banner from "./banner"
import  {useEffect, useRef, useState}  from 'react';
import  L from 'leaflet';

function App(props){

    const firstLoad = true;
    const [ipAddress, setIpAddress] = useState(null);

    const mapRef = useRef(null);

    const [map, setMap] = useState(null);

    const [fetchErrorMsg, setFetchErrorMsg] = useState(null);

    useEffect(()=>{
        getAddress("")
    }, [0]);


    


    async function getAddress(adress){


        const results = await fetch( "http://ip-api.com/json/"+adress
        ).then((response) => {
            if(response.ok === true){
                return response.json();
            }else{
                console.log(response);
            }
        }).then((data) => {

            

            if(data.status == "fail"){
                setFetchErrorMsg("Not a valid IP found");
            }else{
                if(map === null){

                    try{
    
                        let newmap = L.map(mapRef.current, {
                            center: [data.lat, data.lon],
                            zoom: 14
                        });
        
        
                            
                        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(newmap);
        
                        L.marker([data.lat, data.lon]).addTo(newmap);
        
                        setMap(newmap);
                    }catch(e){
                        console.log(e);
                        
                    }
                    
                }else{
                    map.flyTo([data.lat, data.lon], 14);
                    L.marker([data.lat, data.lon]).addTo(map);
    
                    
                }

                fetch('https://dev.virtualearth.net/REST/v1/timezone/'+data.lat+','+data.lon+'?key='+process.env.REACT_APP_BING_KEY ).then(
                    (bingResponse)=>{
                        if(bingResponse.ok === true){
                            return bingResponse.json();
                        }else{
                            console.log(bingResponse);
                        }
                    }
                ).then(
                    (bingData) =>{
                        data.timezone = bingData.resourceSets[0].resources[0].timeZone.utcOffset;


                        setIpAddress(data);
                    }
                )
                
                
            }

            

            

        })
    }

    const getOffset = (timeZone) => {
        const timeZoneName = Intl.DateTimeFormat("ia", {
          timeZoneName: "short",
          timeZone,
        })
          .formatToParts()
          .find((i) => i.type === "timeZoneName").value;
        const offset = timeZoneName.slice(3);
        if (!offset) return 0;
      
        const matchData = offset.match(/([+-])(\d+)(?::(\d+))?/);
        if (!matchData) throw `cannot parse timezone name: ${timeZoneName}`;
      
        const [, sign, hour, minute] = matchData;
        let result = parseInt(hour) * 60;
        if (sign === "+") result *= -1;
        if (minute) result += parseInt(minute);
      
        return result;
      };


    return(
        <div>
            <Banner updateAddress={(val) => getAddress(val)} ipAddress={ipAddress} errorMessage={fetchErrorMsg}></Banner>
            <div id='map' className="map-root" ref={mapRef}></div>
            
        </div>
    )
}

export default App;