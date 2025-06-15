"use client";
import React, { useState, useEffect } from "react";
import fasttrackLogo from "./fasttrack.jpg";
import { useRouter } from "next/navigation";import Image from "next/image";


export default function InsuranceVerificationForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    to: "",
    customerName: "",
    vehicleName: "",
    rentalStartDate: "",
    rentalDays: "",
    state: "",
    driverLicense: "",
    insuranceProvider: "",
    policyNumber: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [popupMessage, setPopupMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
     const res = await fetch(
  "https://fast-trk-l744i.ondigitalocean.app/start-call",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  }
);

      if (res.ok) {
        setStatus("success");
        setPopupMessage("✅ Verification started! Redirecting...");
        setTimeout(() => {
          router.push("/thankyou");
        }, 2000);
      } else {
        setStatus("error");
        setPopupMessage("❌ Submission failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setPopupMessage("❌ Network error. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    
<img src="/fasttrk.svg" alt="Company Logo" width="200" height="80" />

    <h2 style={styles.heading}>Fasttrk AI Insurance Verification</h2>
  </div>
        <input
          name="customerName"
          placeholder="Customer Name"
          value={formData.customerName}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <select
          name="vehicleName"
          value={formData.vehicleName}
          onChange={handleChange}
          required
          style={styles.input}
        >
          <option value="">Select Vehicle</option>
          <option>22 Cadillac Escalade - $75k</option>
          <option>Lamborghini Huracán - $290k</option>
          <option>Rolls Royce Cullinan - $400k</option>
          <option>Ferrari 488 Spider - $330k</option>
        </select>
        <input
          type="date"
          name="rentalStartDate"
          value={formData.rentalStartDate}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="rentalDays"
          placeholder="Rental Days"
          value={formData.rentalDays}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="driverLicense"
          placeholder="Driver License #"
          value={formData.driverLicense}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="insuranceProvider"
          placeholder="Insurance Provider"
          value={formData.insuranceProvider}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="policyNumber"
          placeholder="Policy Number"
          value={formData.policyNumber}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="to"
          placeholder="Insurance Phone Number"
          value={formData.to}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button
          type="submit"
          style={styles.button}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Submitting..." : "Submit Verification"}
        </button>
      </form>

      {/* ✅ Simple floating popup box */}
      {popupMessage && <div style={popupStyles}>{popupMessage}</div>}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    background: "linear-gradient(-45deg, #0a0f1a, #002244, #0a1a2f, #001122)",
    backgroundSize: "400% 400%",
    animation: "gradientBG 15s ease infinite",
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  form: {
    backgroundColor: "rgba(26, 26, 26, 0.75)",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 0 25px #00f2ff55",
    width: "90%",
    maxWidth: "420px",
    backdropFilter: "blur(10px)",
  },
  heading: {
    color: "#00f2ff",
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "20px",
    fontWeight: "bold",
  },
  input: {
    width: "94%",
    padding: "8px 12px",
    marginBottom: "10px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#2b2b2b",
    color: "#fff",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#00f2ff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    color: "#000",
    cursor: "pointer",
    fontSize: "15px",
  },
};

const popupStyles: React.CSSProperties = {
  position: "fixed",
  bottom: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: "#222",
  color: "#fff",
  padding: "12px 20px",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0,255,255,0.5)",
  fontSize: "14px",
  zIndex: 1000,
  animation: "fadeInOut 3s ease-in-out",
};
