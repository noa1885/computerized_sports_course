import React from "react";
import "./GymLandingPage.css";
import { Typography, Button } from "@mui/material";
import { BarChart2, Activity } from "lucide-react"; // 👈 שינוי כאן

const UserProgress = () => {
  return (
    <div className="landing-wrapper">
      {/* קישוטים */}
      <div className="circle deco-pink"></div>
      <div className="circle deco-sky"></div>
      <div className="circle deco-mint"></div>

      <header className="landing-header fade-in">
        <Typography variant="h3" className="landing-title">
          המסלול וההתקדמות שלך
        </Typography>
        <Typography variant="subtitle1" className="landing-subtitle">
          כאן תוכלי לעקוב אחרי ההישגים, הציונים והשלבים הבאים במסלול האישי שלך
        </Typography>
      </header>

      <section className="classes-section">
        <div className="class-card sky">
          <BarChart2 size={36} color="#fff" />
          <Typography variant="h6" className="card-title">
            הציונים שלך
          </Typography>
          <Typography variant="body2" className="card-desc">
            ממוצע אחרון: 94% | שיפור מתמיד 💪
          </Typography>
        </div>

        <div className="class-card mint">
          <Activity size={36} color="#fff" /> {/* 👈 שימוש באייקון חדש */}
          <Typography variant="h6" className="card-title">
            המסלול הפעיל
          </Typography>
          <Typography variant="body2" className="card-desc">
            תוכנית כושר 30 ימים - יום 18 ✅
          </Typography>
        </div>
      </section>

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <Button variant="contained" href="/" className="cta-button">
          חזרה לדף הבית
        </Button>
      </div>
    </div>
  );
};

export default UserProgress;
