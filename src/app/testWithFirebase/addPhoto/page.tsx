"use client"

import React, { useState } from "react";
import { imgDB } from "@/config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {v4} from 'uuid'


function StoreImgAndText() {

    const [text, setText] = useState('');
    const [img, setImg] = useState('');

    



    const handleUpload = (e : any) => {
        console.log(e.target.files[0])
        
        const imgs = ref(imgDB, `Imgs/${v4()}`)
        uploadBytes(imgs, e.target.files[0]).then((data) => {
            console.log(data, "imgs")
            getDownloadURL(data.ref).then(val=>{
                console.log(val)
            })
        });
    }
    

    return (
        <div>
            <h1>Store Image and Text</h1>
            <input  onChange={(e) =>setText (e.target.value)} />
            <input type="file" onChange={(e) =>handleUpload(e)} />
        </div>
    );
}

export default StoreImgAndText