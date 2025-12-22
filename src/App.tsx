import { Button } from "@/components/ui/button"

function App() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          My Spring Boot Frontend
        </h1>
        <p className="text-gray-500">Connected to GitHub Pages & Render</p>
        <Button onClick={() => alert("Hello!")}>
          Click Me (I am a Shadcn Component)
        </Button>
      </div>
    </div>
  )
}

export default App