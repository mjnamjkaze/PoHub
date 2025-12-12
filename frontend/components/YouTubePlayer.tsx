'use client';

interface YouTubePlayerProps {
    url: string;
    title: string;
}

export default function YouTubePlayer({ url, title }: YouTubePlayerProps) {
    // Extract YouTube video ID from URL
    const getYouTubeId = (url: string): string | null => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = getYouTubeId(url);

    if (!videoId) {
        return (
            <div className="aspect-video bg-dark-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Video không khả dụng</p>
            </div>
        );
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;

    return (
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            <iframe
                src={embedUrl}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
            />
        </div>
    );
}
