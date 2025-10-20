import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

const NewsletterPopup = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");

  // Show popup after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 15000); // 10 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();

    // Send email to backend
    axios.post("/api/newsletter-subscribe", { email })
      .then(res => {
        if (res.data.status === 200) {
          swal("Success", res.data.message, "success");
          setShow(false);
          setEmail("");
        } else {
          swal("Error", res.data.message, "error");
        }
      })
      .catch(err => {
        swal("Error", "Something went wrong.", "error");
      });
  };

  if (!show) return null;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center",
      zIndex: 1000
    }}>
      <div className="col-lg-6 col-md-6 col-10" style={{
        background: "#fff", padding: "30px", borderRadius: "10px", textAlign: "center"
      }}>
        <h4>Subscribe to our Newsletter</h4>
        <form onSubmit={handleSubscribe}>
          <input 
            type="email" className="form-control my-3"
            placeholder="Enter your email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="site-btn w-100">Subscribe</button>
        </form>
        <button onClick={() => setShow(false)} style={{ marginTop: "10px", background: "transparent", border: "none", color: "red" }}>Close</button>
      </div>
    </div>
  );
};
export default NewsletterPopup;