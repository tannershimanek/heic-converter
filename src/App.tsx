import { useState } from 'react'
import { ImageConverter } from './components/ImageConverter'
import './App.css'

function App() {
  const [hasConvertedImage, setHasConvertedImage] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-background text-foreground">
      <div className="w-full max-w-xl p-6 bg-card text-card-foreground shadow-lg rounded-lg">
        <ImageConverter onConversionStateChange={setHasConvertedImage} />
      </div>
      {!hasConvertedImage && (
        <footer className="mt-8 text-center text-sm text-muted-foreground">
          <p>Convert HEIC images to JPG format with ease.</p>
        </footer>
      )}
    </div>
  )
}

export default App
