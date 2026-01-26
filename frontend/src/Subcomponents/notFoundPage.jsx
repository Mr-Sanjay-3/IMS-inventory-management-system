import Lottie from "lottie-react";
import Notfound from "../assets/Error404.json"

const notFoundPage = ({height = 300}) => {
  return (
    <>
    
  
    <div style={{
           display: "flex",
            justifyContent: "center", 
            alignItems: "center", 
            height: "100vh", 
            flexDirection: "column",
            background:'#bdc3c7'
            }}>
      <Lottie
      animationData={Notfound}
      loop
      style={{height}}
      
      />
      <p 
         style={{
          color: "#2c3e50",
          marginTop: "14px",
          fontSize: "18px",
    }}>Not Found</p>
      </div>
    </>
  )
}

export default notFoundPage;