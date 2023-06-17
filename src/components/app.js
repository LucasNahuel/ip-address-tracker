import Banner from "./banner"
import  {useEffect, useRef, useState}  from 'react';
import  L from 'leaflet';

function App(props){

    const firstLoad = true;
    const [ipAddress, setIpAddress] = useState(null);

    const mapRef = useRef(null);

    var map = null;

    useEffect(()=>{
        getAddress()
    }, [firstLoad]);


    async function getAddress(){
        const results = await fetch( "http://ip-api.com/json/"
        ).then((response) => {
            if(response.ok === true){
                return response.json();
            }else{
                console.log(response);
            }
        }).then((data) => {

            if(map == null){
                map = L.map(mapRef.current, {
                    center: [data.lat, data.lon],
                    zoom: 14
                });
                

                L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(map);

                L.marker([data.lat, data.lon]).addTo(map);
            }

            console.log(data);
            

            setIpAddress(data);
        })
    }


    return(
        <div>
            <Banner ipAddress={ipAddress}></Banner>
            <div className="map-root" ref={mapRef}></div>
            
        </div>
    )
}

export default App;