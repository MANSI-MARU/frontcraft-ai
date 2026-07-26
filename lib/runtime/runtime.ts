export const frontCraftRuntime = {
  "/App.tsx": `
import React from "react";

export default function App() {
  return (
    <div className="container">
      <h1>FrontCraft AI 🚀</h1>
      <p>Start building amazing interfaces.</p>
    </div>
  );
}
`,

  "/index.tsx": `
import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import App from "./App";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
`,

  "/styles.css": `
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

body{
  font-family:Inter,Arial,sans-serif;
  background:#0f172a;
  color:#fff;
}

/* Input */

.input{
  width:100%;
  padding:14px 18px;
  border:1px solid #334155;
  border-radius:12px;
  background:#0f172a;
  color:#ffffff;
  outline:none;
  transition:0.2s ease;
}

.input::placeholder{
  color:#94a3b8;
}

.input:focus{
  border-color:#7c3aed;
}
    
/* Layout */

.container{
  display:flex;
  justify-content:center;
  align-items:center;
  padding:40px;
}

.section{
  display:flex;
  flex-direction:column;
  gap:20px;
}

.grid{
  display:grid;
  gap:20px;
}

.row{
  display:flex;
  gap:16px;
  align-items:center;
}

/* Card */

.card{
  width:100%;
  max-width:450px;
  background:#1e293b;
  border-radius:24px;
  padding:36px;
  box-shadow:
    0 25px 80px rgba(0,0,0,.45);
}

/* Typography */

.title{
  font-size:2rem;
  font-weight:700;
  margin-bottom:12px;
}

.subtitle{
  color:#94a3b8;
  margin-bottom:28px;
}

.text-center{
  text-align:center;
}

/* Form */

label{
  display:block;
  margin-bottom:8px;
  font-size:.95rem;
}

input{
  width:100%;
  padding:14px 18px;
  border-radius:12px;
  border:1px solid #334155;
  background:#0f172a;
  color:white;
  outline:none;
  transition:.2s;
}

input:focus{
  border-color:#7c3aed;
}

/* Buttons */

.button{
  width:100%;
  border:none;
  border-radius:12px;
  background:#7c3aed;
  color:white;
  padding:14px;
  cursor:pointer;
  transition:.25s;
  font-size:15px;
  font-weight:600;
}

.button:hover{
  background:#6d28d9;
}

/* Utility */

.mt{
  margin-top:20px;
}

.mb{
  margin-bottom:20px;
}

.center{
  display:flex;
  justify-content:center;
  align-items:center;
}
`,

  "/package.json": `
{
  "name":"frontcraft-runtime",
  "main":"/index.tsx",
  "dependencies":{
      "react":"latest",
      "react-dom":"latest"
  }
}
`,
};