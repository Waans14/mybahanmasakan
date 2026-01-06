import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import Header from '../components/Header';
import WebcamCard from '../components/WebcamCard';
import PredictionBar from '../components/PredictionBar';
import SplashScreen from '../components/SplashScreen';
import { Camera, RefreshCw } from 'lucide-react';

const Home = () => {
    const webcamRef = useRef(null);
    const modelRef = useRef(null);
    const [facingMode, setFacingMode] = useState("environment");

    const [isLoading, setIsLoading] = useState(true);
    const [predictions, setPredictions] = useState([]);
    const [metadata, setMetadata] = useState(null);

    // Load Model & Metadata
    useEffect(() => {
        const loadModel = async () => {
            try {
                // Load metadata
                const metadataResponse = await fetch('/model/metadata.json');
                const metadataJSON = await metadataResponse.json();
                setMetadata(metadataJSON);

                // Load model
                // Teachable Machine standard export is usually a Layers Model
                const model = await tf.loadLayersModel('/model/model.json');
                modelRef.current = model;

                // Warmup the model
                const dummy = tf.zeros([1, 224, 224, 3]);
                model.predict(dummy).dispose();
                dummy.dispose();

                console.log('Model loaded successfully');
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to load model:', error);
            }
        };

        loadModel();
    }, []);

    // Prediction Loop
    useEffect(() => {
        if (isLoading) return;

        let animationFrameId;

        const loop = async () => {
            if (
                modelRef.current &&
                webcamRef.current &&
                webcamRef.current.video.readyState === 4
            ) {
                const video = webcamRef.current.video;

                const tfImg = tf.tidy(() => {
                    const img = tf.browser.fromPixels(video);
                    const resized = tf.image.resizeBilinear(img, [224, 224]);
                    const normalized = resized.div(127.5).sub(1);
                    return normalized.expandDims(0);
                });

                try {
                    const prediction = await modelRef.current.predict(tfImg).data();

                    if (metadata && metadata.labels) {
                        const results = Array.from(prediction).map((probability, index) => ({
                            className: metadata.labels[index],
                            probability: probability
                        }));
                        results.sort((a, b) => b.probability - a.probability);
                        setPredictions(results);
                    }
                } catch (err) {
                    console.error(err);
                } finally {
                    tfImg.dispose();
                }
            }
            animationFrameId = requestAnimationFrame(loop);
        };

        loop();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };

    }, [isLoading, metadata]);

    const toggleCamera = () => {
        setFacingMode(prev => prev === "user" ? "environment" : "user");
    };

    return (
        <>
            <SplashScreen show={isLoading} />
            <div className="min-h-screen pb-10">
                <div className="bg-gradient-to-br from-emerald-900/20 via-slate-900 to-slate-900 fixed inset-0 -z-10" />

                <div className="max-w-6xl mx-auto px-4">
                    <Header />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
                        {/* Left Column: Webcam */}
                        <div className="flex flex-col items-center">
                            <WebcamCard isLoading={isLoading}>
                                <Webcam
                                    ref={webcamRef}
                                    audio={false}
                                    screenshotFormat="image/jpeg"
                                    className="w-full h-full object-cover"
                                    videoConstraints={{
                                        facingMode: facingMode,
                                        width: 480,
                                        height: 480
                                    }}
                                    mirrored={facingMode === "user"}
                                />
                                <button
                                    onClick={toggleCamera}
                                    className="absolute bottom-4 right-4 p-3 rounded-full bg-slate-800/80 text-emerald-400 hover:bg-slate-700/80 backdrop-blur-sm border border-slate-600/50 shadow-lg transition-all active:scale-95 z-40 group"
                                    title="Ganti Kamera"
                                >
                                    <RefreshCw className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                                </button>
                            </WebcamCard>
                            <p className="mt-4 text-slate-500 text-sm">
                                Pastikan pencahayaan yang baik untuk hasil terbaik
                            </p>
                        </div>

                        {/* Right Column: Results */}
                        <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 shadow-xl h-fit">
                            <h2 className="text-xl font-semibold mb-6 text-slate-200 border-b border-slate-700/50 pb-4">
                                Hasil Prediksi
                            </h2>

                            {isLoading ? (
                                <div className="space-y-4 animate-pulse">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="h-12 bg-slate-700/30 rounded-lg"></div>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {predictions.map((p, idx) => (
                                        <PredictionBar
                                            key={p.className}
                                            className={p.className}
                                            probability={p.probability}
                                            isHighest={idx === 0}
                                        />
                                    ))}

                                    {predictions.length === 0 && (
                                        <p className="text-slate-500 text-center py-4">Menunggu stream...</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
