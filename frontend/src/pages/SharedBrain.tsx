import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BACKEND_URL } from "../config"
import axios from "axios"
import Sidebar from "../components/Sidebar"
import Card from "../components/Card"
import toast from "react-hot-toast"

interface ContentItem {
  _id: string;
  type: "twitter" | "youtube";
  link: string;
  title: string;
}

export default function SharedBrain() {
  const { hash } = useParams<{ hash: string }>();
  const [username, setUsername] = useState<string>("");
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchSharedBrain() {
      try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${hash}`);
        setUsername(response.data.username);
        setContents(response.data.content);
        setError("");
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load shared brain");
        toast.error("Could not fetch shared brain");
      } finally {
        setLoading(false);
      }
    }

    if (hash) {
      fetchSharedBrain();
    }
  }, [hash]);

  const filteredContents = contents.filter(({ type }) => {
    if (activeTab === "all") return true;
    return type === activeTab;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading brain...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md border border-gray-100 text-center">
          <span className="text-4xl">🧠</span>
          <h1 className="text-2xl font-bold text-gray-800 mt-4">Brain Not Found</h1>
          <p className="text-gray-500 mt-2">{error}</p>
          <a 
            href="/signup" 
            className="inline-block mt-6 px-6 py-2.5 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors"
          >
            Create Your Own Brain
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isPublic={true} />
      <div className="p-4 md:ml-72 min-h-screen bg-gray-100 border-2 pb-24 md:pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-4 mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 flex items-center gap-2">
              <span className="text-purple-600">🧠</span>
              {username}'s Brain
            </h1>
            <p className="text-sm text-gray-500 mt-1">Viewing a shared collection of links</p>
          </div>
          <a 
            href="/signup" 
            className="self-start md:self-auto px-4 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors text-sm"
          >
            Create Your Own ✨
          </a>
        </div>

        {filteredContents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-5xl">📂</span>
            <h3 className="text-lg font-bold text-gray-700 mt-4">No content found</h3>
            <p className="text-gray-500 text-sm max-w-xs mt-1">
              {activeTab === "all" 
                ? "This brain has no items saved yet." 
                : `No ${activeTab === "twitter" ? "X.com tweets" : "YouTube videos"} found under this tab.`}
            </p>
          </div>
        ) : (
          <div className="flex gap-4 flex-wrap mt-4">
            {filteredContents.map(({ _id, type, link, title }) => (
              <Card 
                key={_id}
                id={_id}
                type={type}
                link={link}
                title={title}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
