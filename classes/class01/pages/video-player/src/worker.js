import * as tf from '@tensorflow/tfjs';
import "https://unpkg.com/@tensorflow/tfjs-core@2.4.0/dist/tf-core.js"
import "https://unpkg.com/@tensorflow/tfjs-converter@2.4.0/dist/tf-converter.js"
import "https://unpkg.com/@tensorflow-models/face-landmarks-detection@0.0.1/dist/face-landmarks-detection.js"

import Service from "./service.js"

//no processo principal é window e no worker é self

const {faceLandmarksDetection} = self
tf.setBackend('wasm').then(() => main())

const service = new Service({
    faceLandmarksDetection
})

console.log('loading tf model')
await service.loadModel()
console.log('tf model loaded!')
postMessage('READY')

onmessage = async ({ data: video }) => {
    const blinked = await service.handBlinked(video)
    if(!blinked) return;
    postMessage({ blinked })
}