import Lottie from "lottie-react";
import LoadingAnimation from "../assets/Loadercat.json";


const Loader = ({height = 200}) =>{
    return(

        <div style={{
           display: "flex",
            justifyContent: "center", 
            alignItems: "center", 
            height: "100vh", 
            flexDirection: "column",
            background:"black" }}>
      <Lottie
      animationData={LoadingAnimation}
      loop
      style={{height}}
      
      />
      <p 
         style={{
          color: "#fff",
          marginTop: "14px",
          fontSize: "18px",
    }}>Loading...</p>
      </div>
    );
};
export default Loader;