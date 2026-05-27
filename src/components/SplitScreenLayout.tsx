

interface SplitScreenLayoutProps {
  leftPane: React.ReactNode;
  rightPane: React.ReactNode;
  topBar?: React.ReactNode;
}

export function SplitScreenLayout({ leftPane, rightPane, topBar }: SplitScreenLayoutProps) {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-50">
      {topBar && (
        <div className="flex-shrink-0 z-20 shadow-sm relative">
          {topBar}
        </div>
      )}
      
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden relative z-10">
        {/* Left Pane: Processing Queue (33%) */}
        <div className="w-full md:w-1/3 h-1/2 md:h-full flex flex-col border-b md:border-b-0 md:border-r border-gray-200">
          {leftPane}
        </div>
        
        {/* Right Pane: Context Workspace (67%) */}
        <div className="w-full md:w-2/3 h-1/2 md:h-full flex flex-col bg-white">
          {rightPane}
        </div>
      </div>
    </div>
  );
}
