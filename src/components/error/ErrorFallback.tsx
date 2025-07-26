import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ErrorFallbackProps {
  error: Error | null;
  resetError: () => void;
}

export function ErrorFallback({ error, resetError }: ErrorFallbackProps) {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
    resetError();
  };

  const getErrorMessage = (error: Error | null) => {
    if (!error) return "An unexpected error occurred";

    if (error.message.includes("network") || error.message.includes("fetch")) {
      return "Network connection error. Please check your internet connection.";
    }

    if (error.message.includes("404") || error.message.includes("not found")) {
      return "The requested content could not be found.";
    }

    return error.message || "Something went wrong while loading the page.";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">{getErrorMessage(error)}</p>
          </div>

          <div className="space-y-3">
            <Button onClick={resetError} className="w-full" size="lg">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>

            <Button
              onClick={handleGoHome}
              variant="outline"
              className="w-full"
              size="lg"
            >
              <Home className="w-4 h-4 mr-2" />
              Go to Homepage
            </Button>
          </div>

          {process.env.NODE_ENV === "development" && error && (
            <details className="mt-6 text-left">
              <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                Technical Details (Development)
              </summary>
              <pre className="mt-2 p-3 bg-gray-100 rounded text-xs text-gray-700 overflow-auto">
                {error.stack}
              </pre>
            </details>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Specific error fallbacks for different contexts
export function PokemonGridErrorFallback({
  error,
  resetError,
}: ErrorFallbackProps) {
  return (
    <div className="text-center py-16">
      <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Failed to load Pokémon
      </h3>
      <p className="text-gray-600 mb-4">{getErrorMessage(error)}</p>
      <Button onClick={resetError}>
        <RefreshCw className="w-4 h-4 mr-2" />
        Try Again
      </Button>
    </div>
  );
}

function getErrorMessage(error: Error | null) {
  if (!error) return "An unexpected error occurred";

  if (error.message.includes("network") || error.message.includes("fetch")) {
    return "Network connection error";
  }

  return "Something went wrong";
}
