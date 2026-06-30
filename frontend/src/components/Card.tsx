import { useEffect } from "react"
import ShareIcon from "../icons/ShareIcon"
import TwitterIcon from "../icons/TwitterIcon"
import YoutubeIcon from "../icons/YoutubeIcon"
import TrashIcon from "../icons/TrashIcon"

interface CardProps {
    id: string;
    title: string;
    link: string;
    type: "twitter" | "youtube";
    onDelete?: (id: string) => void;
}

const getYoutubeEmbedUrl = (url: string): string => {
    let videoId = "";
    try {
        const parsedUrl = new URL(url);
        if (parsedUrl.hostname === "youtu.be") {
            videoId = parsedUrl.pathname.substring(1);
        } else if (parsedUrl.hostname.includes("youtube.com")) {
            if (parsedUrl.pathname.startsWith("/shorts/")) {
                videoId = parsedUrl.pathname.split("/")[2];
            } else if (parsedUrl.pathname === "/watch") {
                videoId = parsedUrl.searchParams.get("v") || "";
            } else if (parsedUrl.pathname.startsWith("/embed/")) {
                videoId = parsedUrl.pathname.split("/")[2];
            }
        }
    } catch (e) {
        // Fallback using regex
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        if (match && match[2].length === 11) {
            videoId = match[2];
        }
    }

    if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
}

const Card = ({ id, title, link, type, onDelete }: CardProps) => {
    useEffect(() => {
        if (type === "twitter") {
            // @ts-ignore
            if (window.twttr && window.twttr.widgets) {
                // @ts-ignore
                window.twttr.widgets.load();
            }
        }
    }, [type, link]);

    return (
        <div>
            <div className="p-4 bg-white rounded-md border border-gray-200
             outline-slate-200 max-w-96 min-h-48">
                <div className="flex justify-between">
                    <div className="flex items-center text-md">
                        <div className="text-gray-500 pr-2">
                            {type === "youtube" && <YoutubeIcon size="lg" />}
                            {type === "twitter" && <TwitterIcon size="lg" />}
                        </div>
                        {title}
                    </div>

                    <div className="flex items-center">
                        <div className="pr-2 text-gray-500">
                            <a href={link} target="_blank" rel="noopener noreferrer">
                                <ShareIcon size="lg" />
                            </a>
                        </div>

                        {onDelete && (
                            <div className="text-gray-500 cursor-pointer hover:text-red-600 transition-colors" onClick={() => onDelete(id)}>
                                <TrashIcon size="lg" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="pt-5">
                    {type === "youtube" && (
                        <iframe
                            className="w-full h-48 rounded-md"
                            src={getYoutubeEmbedUrl(link)}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    )}

                    {type === "twitter" && (
                        <blockquote className="twitter-tweet w-full">
                            <a href={link.replace("x.com", "twitter.com")}></a>
                        </blockquote>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Card