import { useEffect, useState } from "react"
import { useContent } from "../hooks/useContent"
import { BACKEND_URL } from "../config"
import axios from "axios"
import CreateContentModal from "../components/CreateContentModal"
import Sidebar from "../components/Sidebar"
import ShareIcon from "../icons/ShareIcon"
import PlusIcon from "../icons/PlusIcon"
import Card from "../components/Card"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export default function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const {contents, refresh} = useContent();
  const navigate = useNavigate();
  const token = localStorage.getItem("authorization");

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (token) {
      refresh();
    }
  }, [modalOpen, token]);

  async function deleteContent(contentId: string) {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          "authorization": token
        },
        data: {
          contentId
        }
      });
      toast.success("Content deleted successfully!");
      refresh();
    } catch (error) {
      toast.error("Failed to delete content. Please try again.");
    }
  }

  if (!token) {
    return null;
  }

  return <div>
    <Sidebar />
    <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
      <CreateContentModal open={modalOpen} onClose={() => {
        setModalOpen(false);
      }} />
      <div className="flex justify-end gap-4">
        <Button onClick={() => {
          setModalOpen(true)
        }} variant="primary" text="Add content" startIcon={<PlusIcon size="lg" />}></Button>
        <Button onClick={async () => {
            try {
                const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
                    share: true
                }, {
                    headers: {
                        "authorization": token
                    }
                });
                const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
                alert(shareUrl);
            } catch (error) {
                toast.error("Failed to share brain");
            }
        }} variant="secondary" text="Share brain" startIcon={<ShareIcon size="lg" />}></Button>
      </div>

      <div className="flex gap-4 flex-wrap mt-4">
        {contents.map(({_id, type, link, title}) => <Card 
            key={_id}
            id={_id}
            type={type}
            link={link}
            title={title}
            onDelete={deleteContent}
        />)}
      </div>
    </div>
  </div>
}