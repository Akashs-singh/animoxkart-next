import React from 'react';
import Link from 'next/link'

function LogoImage(props) {

    return <Link href="/" >
                <img src={`/assets/images/icon/${props.logo}`} alt="" className="animoxkartLogo" />
            </Link>;
}

export default LogoImage;