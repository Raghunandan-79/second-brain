import ShareIcon from "../icons/ShareIcon"
import TwitterIcon from "../icons/TwitterIcon"
import YoutubeIcon from "../icons/YoutubeIcon"
import TrashIcon from "../icons/TrashIcon"

interface CardProps {
    id: string;
    title: string;
    link: string;
    type: "twitter" | "youtube";
    onDelete: (id: string) => void;
}

const Card = ({ id, title, link, type, onDelete }: CardProps) => {
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

                        <div className="text-gray-500 cursor-pointer hover:text-red-600 transition-colors" onClick={() => onDelete(id)}>
                            <TrashIcon size="lg" />
                        </div>
                    </div>
                </div>

                <div className="pt-5">
                    {type === "youtube" && <iframe className="w-full"
                        src={link.replace("watch", "embed").replace("?v=", "/")}
                        title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; 
                            clipboard-write; 
                            encrypted-media; gyroscope; 
                            picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen> </iframe>}

                    {type === "twitter" && <blockquote className="twitter-tweet">
                        <a href={link}></a>
                    </blockquote>}
                </div>
            </div>
        </div>
    )
}

export default Card