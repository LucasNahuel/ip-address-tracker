import iconArrow from './../assets/images/icon-arrow.svg';

function Banner(props){

    const arrow = iconArrow;

    function handleSubmit(){

    }


    return(
        <div className="banner-root">
            <h1 className="banner-title">IP Address Tracker</h1>

            <form onSubmit={()=> handleSubmit()}>

                <input type="text" placeholder="serch for any IP address or domain"></input>

                <button type="submit">
                    <img src={arrow}></img>
                </button>

            </form>

            <div className="ip-info-root">

            </div>


        </div>
    );
}

export default Banner;