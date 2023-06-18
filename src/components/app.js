import Banner from "./banner"
import  {useEffect, useRef, useState}  from 'react';
import  L from 'leaflet';

function App(props){

    const firstLoad = true;
    const [ipAddress, setIpAddress] = useState(null);

    const mapRef = useRef(null);


    const [map, setMap] = useState(null);

    useEffect(()=>{
        getAddress("")
    }, [0]);


    


    async function getAddress(adress){

        console.log("calling"+adress);

        const results = await fetch( "http://ip-api.com/json/"+adress
        ).then((response) => {
            if(response.ok === true){
                return response.json();
            }else{
                console.log(response);
            }
        }).then((data) => {

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

            console.log(data);
            

            setIpAddress(data);
        })
    }


    return(
        <div>
            <Banner updateAddress={(val) => getAddress(val)} ipAddress={ipAddress}></Banner>
            <div id='map' className="map-root" ref={mapRef}></div>
            
        </div>
    )
}

export default App;