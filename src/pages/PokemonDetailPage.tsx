import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function PokemonDetailPage() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();

  const handleBackToList = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-purple-600">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={handleBackToList}
          className="text-white hover:bg-white/20 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to List
        </Button>

        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-2">
            ⚡ {name ? name.charAt(0).toUpperCase() + name.slice(1) : "Pokemon"}
          </h1>
          <p className="text-purple-100">Pokemon details coming soon...</p>
        </div>
      </div>
    </div>
  );
}
