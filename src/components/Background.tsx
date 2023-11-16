import Image from 'next/image'
import React from 'react'
import { backgroundImage } from './Images';

const Background = () => {
  return (
    <>
      <Image
        className="fixed top-0 left-0 z-0 object-cover"
        src={backgroundImage[0]}
        alt="background image"
        width={2070}
        height={1080}
        placeholder="blur"
        // loading="lazy"
        blurDataURL="data:image/jpeg;base64,..."
      />
      <div className="fixed top-0 left-0 w-full h-full z-10 bg-gradient-to-t from-stone-900 "></div>
    </>
  );
};

export default Background