import iconArrow from './../assets/images/icon-arrow.svg';
import  {useEffect, useState}  from 'react';
function Banner(props){

    const arrow = iconArrow;

    const [ipAddress, setIpAddress] = useState(null);

    useEffect(()=>{
        getAddress()
    });


    async function getAddress(){
        const results = await fetch( "https://geo.ipify.org/api/v2/country,city,vpn?apiKey="+process.env.REACT_APP_IPIFY_API_KEY
        ).then((response) => {
            console.log(response);

            if(response.ok === true){
                return response.json();
            }else{
                console.log(response);
            }
        }).then((data) => {
            console.log(data);
            setIpAddress(data);
        })
    }

    function handleSubmit(){

    }


    return(
        <div className="banner-root">
            <h1 className="banner-title">IP Address Tracker</h1>

            <form onSubmit={() => handleSubmit()}>

                <input type="text" placeholder="serch for any IP address or domain"/>

                <button type="submit">
                    <img src={arrow}></img>
                </button>

            </form>

            <div className="ip-info-root">
                <div className="ip-info-item">
                    <p className="ip-info-item-title">IP ADRESS</p>
                    {ipAddress ? ipAddress.ip : ""}
                </div>

                <div className='ip-info-divider'/>

                <div className="ip-info-item">
                    <p className="ip-info-item-title">LOCATION</p>
                    {ipAddress ? ipAddress.location.city+", "+ipAddress.location.region : ""}
                </div>

                <div className='ip-info-divider'/>

                <div className="ip-info-item">
                    <p className="ip-info-item-title">TIMEZONE</p>
                    {ipAddress ? "UTC"+ipAddress.location.timezone : ""}
                </div>

                <div className='ip-info-divider'/>

                <div className="ip-info-item">
                    <p className="ip-info-item-title">ISP</p>
                    <div>{ ipAddress ? ipAddress.isp : ""}</div>
                </div>
            </div>


        </div>
    );
}

export default Banner;