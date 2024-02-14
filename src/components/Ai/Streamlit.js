import React,{useState} from 'react'
import Navbar from "../navbar/Header"

const Streamlit = () => {

  const [loading, setloadig] = useState(false);

  const handleLoad = () => {
    setloadig(true);
  }

  return (
    <>
      <div>
        <Navbar/>
        {
          loading
            ? 
            <div className="general-centered-container">
              <div className="container">
                <h1>Loading...</h1>
              </div>
            </div>
            : 
            <iframe
            title="myFrame"
            src="https://gemini-ai-n972tnrlttf6b6j4kzbezd.streamlit.app/?embed=true"
            height="1000"
            
            style={{ width: "100%", border: "none" }}
          ></iframe>
        }
      </div>
    </>
  );
}

export default Streamlit