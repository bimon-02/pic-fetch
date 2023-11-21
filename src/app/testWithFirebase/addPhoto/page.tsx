"   use client"

import React, { useState } from "react";


function StoreImgAndText() {

    const [text, setText] = useState('');
    const [img, setImg] = useState('');

    const handleUpload = (e : any) => {
        console.log(e.target.files[0]);
    }
    

    return (
        <div>
            <h1>Store Image and Text</h1>
            <input type="file" onChange={(e) =>setText (e.target.value)} />
            <input type="file" onChange={(e) =>handleUpload(e)} />
        </div>
    );
}