import iconArrow from './../assets/images/icon-arrow.svg';
import  {useEffect, useState, useRef}  from 'react';



function Banner(props){

    const arrow = iconArrow;

    const [searchInputContent, setSearchInputContent] = useState(null);

    const inputRef = useRef(null);

    useEffect(()=>{
        if(props.errorMessage != null){
            inputRef.current.setCustomValidity(props.errorMessage);
            inputRef.current.reportValidity();
        }
    }, [props.errorMessage])

    

    function handleSubmit(ev){
        ev.preventDefault();  
        if(searchInputContent != null){
            
            props.updateAddress(searchInputContent);
        }
    }

    function handleSearchInputChange(ev){

        ev.preventDefault();

        if(ev.target.value.length > 7 && ev.target.value.length < 16){
            setSearchInputContent(ev.target.value);
        }
    }


    return(
        <div className="banner-root">
            <h1 className="banner-title">IP Address Tracker</h1>

            <form onSubmit={(ev) => handleSubmit(ev)}>

                <input ref={inputRef} minLength={7} maxLength={15} onChange={(ev)=> handleSearchInputChange(ev)}
                 type="text" placeholder="serch for any IP address or domain" />

                <button type="submit">
                    <img src={arrow}></img>
                </button>

            </form>

            <div className='ip-info-container'>
                <div className="ip-info-root">
                    <div className="ip-info-item">
                        <p className="ip-info-item-title">IP ADRESS</p>
                        <p className='ip-info-item-data'>{props.ipAddress ? props.ipAddress.ip : ""}</p>
                        
                    </div>

                    <div className='ip-info-divider'/>

                    <div className="ip-info-item">
                        <p className="ip-info-item-title">LOCATION</p>
                        <p className='ip-info-item-data'>
                        {props.ipAddress ? props.ipAddress.city+", "+props.ipAddress.region : ""}</p>
                    </div>

                    <div className='ip-info-divider'/>

                    <div className="ip-info-item">
                        <p className="ip-info-item-title">TIMEZONE</p>
                        <p className='ip-info-item-data'>{props.ipAddress ? "UTC "+props.ipAddress.utc_offset : ""}</p>
                        
                    </div>

                    <div className='ip-info-divider'/>

                    <div className="ip-info-item">
                        <p className="ip-info-item-title">ISP</p>
                        <p className='ip-info-item-data'>{ props.ipAddress ? props.ipAddress.org : ""}</p>
                        
                    </div>
                </div>
            </div>

           


        </div>
    );
}

export default Banner;