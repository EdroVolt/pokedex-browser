import { Button } from "@/components/ui/button";

interface ViewToggleProps {
  currentView: "pagination" | "infinite";
  onViewChange: (view: "pagination" | "infinite") => void;
}

export function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex justify-center gap-2 mb-6">
      <Button
        variant={currentView === "pagination" ? "default" : "outline"}
        onClick={() => onViewChange("pagination")}
        className="min-w-[120px]"
      >
        Page Controls
      </Button>
      <Button
        variant={currentView === "infinite" ? "default" : "outline"}
        onClick={() => onViewChange("infinite")}
        className="min-w-[120px]"
      >
        Infinite Scroll
      </Button>
    </div>
  );
}
