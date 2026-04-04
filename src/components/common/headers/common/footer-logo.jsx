import React from 'react';
import Link from 'next/link'

function LogoImage(props) {

    return <Link href="/" >
                {/* <img src={`/assets/images/icon/${props.logo}`} alt="" className="img-fluid" /> */}
                <img src="/assets/images/icon/footer-logo.png" alt="" className="img-fluid" style={{width:"auto",maxHeight:"100px"}} />
            </Link>;
}

export default LogoImage;