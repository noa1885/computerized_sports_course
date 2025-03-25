// src/Components/CustomWorkoutStart.jsx
import React, { useEffect, useState } from "react";
import "./GymLandingPage.css"; // משתמשים באותו עיצוב
import { Typography, Button, Checkbox, FormControlLabel, TextField, Card, CardContent } from "@mui/material";
import { Settings } from "lucide-react";

const CustomWorkoutStart = () => {
  const [duration, setDuration] = useState(30);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    fetch("/api/Fitness/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("שגיאה בטעינת קטגוריות:", err));
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleStart = () => {
    window.location.href = `/custom-workout?duration=${duration}&categories=${selectedCategories.join(",")}`;
  };

  return (
    <div className="landing-wrapper">
      <div className="circle deco-pink"></div>
      <div className="circle deco-mint"></div>
      <div className="circle deco-sky"></div>

      <header className="landing-header fade-in">
        <Typography variant="h4" className="landing-title">
          התחלת מסלול מותאם אישית
        </Typography>
        <Typography variant="subtitle1" className="landing-subtitle">
          בחרי את מה שמתאים לך – זמן, סגנון, והתחילי מסלול כושר ייחודי משלך ✨
        </Typography>
      </header>

      <section className="classes-section">
        <Card className="class-card pink">
          <CardContent>
            <Settings size={36} color="#fff" />
            <Typography variant="h6" className="card-title">
              בחרי משך זמן (בדקות):
            </Typography>
            <TextField
              type="number"
              inputProps={{ min: 5, max: 120 }}
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              variant="outlined"
              size="small"
              style={{ marginTop: "1rem", backgroundColor: "#fff", borderRadius: "8px" }}
            />
          </CardContent>
        </Card>

        <Card className="class-card mint">
          <CardContent>
            <Typography variant="h6" className="card-title">
              בחרי קטגוריות מועדפות:
            </Typography>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "start", marginTop: "1rem" }}>
              {categories.map((cat) => (
                <FormControlLabel
                  key={cat.id}
                  control={
                    <Checkbox
                      checked={selectedCategories.includes(cat.id)}
                      onChange={() => handleCheckboxChange(cat.id)}
                      color="secondary"
                    />
                  }
                  label={cat.name}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <Button variant="contained" className="cta-button" onClick={handleStart}>
          התחילי עכשיו
        </Button>
      </div>
    </div>
  );
};

export default CustomWorkoutStart;
