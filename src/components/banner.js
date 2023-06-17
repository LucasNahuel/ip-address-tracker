import iconArrow from './../assets/images/icon-arrow.svg';
import  {useEffect, useState}  from 'react';
function Banner(props){

    const arrow = iconArrow;

    

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
                    <p className='ip-info-item-data'>{props.ipAddress ? props.ipAddress.query : ""}</p>
                    
                </div>

                <div className='ip-info-divider'/>

                <div className="ip-info-item">
                    <p className="ip-info-item-title">LOCATION</p>
                    <p className='ip-info-item-data'>
                    {props.ipAddress ? props.ipAddress.city+", "+props.ipAddress.regionName : ""}</p>
                </div>

                <div className='ip-info-divider'/>

                <div className="ip-info-item">
                    <p className="ip-info-item-title">TIMEZONE</p>
                    <p className='ip-info-item-data'>{props.ipAddress ? "UTC"+props.ipAddress.timezone : ""}</p>
                    
                </div>

                <div className='ip-info-divider'/>

                <div className="ip-info-item">
                    <p className="ip-info-item-title">ISP</p>
                    <p className='ip-info-item-data'>{ props.ipAddress ? props.ipAddress.isp : ""}</p>
                    
                </div>
            </div>


        </div>
    );
}

export default Banner;