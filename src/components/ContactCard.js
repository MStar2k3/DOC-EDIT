import React, {useState, useEffect} from "react";
import firebase from "firebase/app";
import "firebase/storage";
import cv from "opencv4nodejs";
import {createCanvas} from "canvas";
import {render} from 'react-dom'

{
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const loadImage = async () => {
    const fileRef = storageRef.child("path/to/image.jpg");
    const url = await fileRef.getDownloadURL();
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const img = cv.imdecode(Buffer.from(buffer), cv.IMREAD_COLOR);
    setOriginalImage(img);
    };


    const cropAndResizeImage = (img, width, height) => {
        const [imgHeight, imgWidth] = img.sizes;
        const cropHeight = Math.min(imgHeight, imgWidth);
        const cropWidth = cropHeight;
        const cropY = Math.floor((imgHeight - cropHeight) / 2);
        const cropX = Math.floor((imgWidth - cropWidth) / 2);
        const croppedImg = img.getRegion(new cv.Rect(cropX, cropY, cropWidth, cropHeight));
        const resizedImg = croppedImg.resize(new cv.Size(width, height));
        return resizedImg;
    };


    const [originalImage, setOriginalImage] = useState(null);
    const [croppedResizedImage, setCroppedResizedImage] = useState(null);
    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(300);

useEffect(() => {
    loadImage();
}, []);

useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (originalImage) {
    const img = cropAndResizeImage(originalImage, width, height);
    setCroppedResizedImage(img);
    }
},[originalImage, width, height]
);
return (
    <div>
        {originalImage && (
        <canvas width={originalImage.cols} height={originalImage.rows} ref={(canvas) => {
            if (canvas) {
                const ctx = canvas.getContext("2d");
                const imgData = ctx.createImageData(originalImage.cols, originalImage.rows);
                imgData.data.set(originalImage.getData());
                ctx.putImageData(imgData, 0, 0);
            }
            }}
        />
        )}
        {croppedResizedImage && (
        <canvas
            width={croppedResizedImage.cols}
            height={croppedResizedImage.rows}
            ref={(canvas) => {
            if (canvas) {
                const ctx = canvas.getContext("2d");
                const imgData = ctx.createImageData(croppedResizedImage.cols, croppedResizedImage.rows);
                imgData.data.set(croppedResizedImage.getData());
                ctx.putImageData(imgData, 0, 0);
            }
            }}
        />
        
        )}
        
        </div>
);
}





