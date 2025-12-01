'use client';

import { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Player from 'video.js/dist/types/player';

interface VideoPlayerProps {
    src: string;
    poster?: string;
    subtitleUrl?: string;
    onTimeUpdate?: (currentTime: number) => void;
    startTime?: number;
}

export default function VideoPlayer({
    src,
    poster,
    subtitleUrl,
    onTimeUpdate,
    startTime = 0,
}: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const playerRef = useRef<Player | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (!videoRef.current) return;

        // Initialize Video.js player
        const player = videojs(videoRef.current, {
            controls: true,
            autoplay: false,
            preload: 'auto',
            fluid: true,
            poster: poster,
            sources: [
                {
                    src: src,
                    type: 'video/mp4',
                },
            ],
        });

        playerRef.current = player;

        // Add subtitle track if provided
        if (subtitleUrl) {
            player.addRemoteTextTrack(
                {
                    kind: 'subtitles',
                    src: subtitleUrl,
                    srclang: 'en',
                    label: 'English',
                },
                false
            );
        }

        // Set start time
        player.ready(() => {
            setIsReady(true);
            if (startTime > 0) {
                player.currentTime(startTime);
            }
        });

        // Time update listener
        if (onTimeUpdate) {
            player.on('timeupdate', () => {
                onTimeUpdate(player.currentTime() || 0);
            });
        }

        // Cleanup
        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, [src, poster, subtitleUrl, startTime, onTimeUpdate]);

    return (
        <div className="w-full h-full bg-black">
            <div data-vjs-player>
                <video
                    ref={videoRef}
                    className="video-js vjs-big-play-centered"
                    playsInline
                />
            </div>
        </div>
    );
}
