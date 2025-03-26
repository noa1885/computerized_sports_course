import React, { useState, useEffect } from "react";
import "./index.css";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent
} from "@mui/material";
import { Dumbbell, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const classesData = [
  { title: "חוג יוגה לנשים", desc: "שיפור גמישות ונשימה באווירה נשית 🌸", color: "pink" },
  { title: "אימון פונקציונלי", desc: "כוח, סיבולת ואתגר 💪", color: "mint" },
  { title: "כושר לילדים", desc: "כיף, קואורדינציה וביטחון עצמי 🎈", color: "sky" },
  { title: "חיזוק ובריאות", desc: "חיזוק הגוף עם אנרגיה צהובה ☀️", color: "yellow" },
];

const GymLandingPage = () => {
  const sliderImages = [
    { src: "/assets/ads1.jpg", caption: "💪 החוגים הכי שווים בעיר מחכים לך עכשיו" },
    { src: "/assets/ads2.jpg", caption: "🔥 הצטרפי לאימון עם אנרגיות מטורפות" },
    { src: "/assets/ads3.jpg", caption: "🎈 כושר לילדים – חוויה לכל המשפחה" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing-wrapper">
      {/* סרגל ניווט */}
      <AppBar position="fixed" className="navbar" elevation={0}>
        <Toolbar className="navbar-inner">
          <div className="navbar-logo">
            <Dumbbell color="#ec407a" />
            <Typography variant="h6" className="logo-text">GymPro</Typography>
          </div>
          <div className="navbar-links">
            <a href="#classes">חוגים</a>
            <a href="#contact">צור קשר</a>
            <a href="#contact">אודות</a>
          </div>
        </Toolbar>
      </AppBar>

      {/* באנר עם פרסומות */}
      <div className="top-banner">
        {sliderImages.map((item, index) => (
          <div
            key={index}
            className={`banner-slide ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url(${item.src})` }}
          >
            <div className="banner-caption">{item.caption}</div>
          </div>
        ))}
      </div>

      {/* כותרת ראשית */}
      <header className="landing-header fade-in">
        <Typography variant="h3" className="landing-title">
          ברוכים הבאים לעולם הכושר שלך!
        </Typography>
        <Typography variant="subtitle1" className="landing-subtitle">
          חוגי כושר מודרניים לנשים, גברים וילדים – עם אנרגיה צבעונית ובאווירה מדהימה!
        </Typography>
        
        {/* כפתור הרשמה – מעביר ל- /signup */}
        <Link to="/signup">
          <Button variant="contained" className="cta-button yellow-btn">
            הצטרפו עכשיו
          </Button>
        </Link>
      </header>

      {/* כרטיסי חוגים */}
      <section className="classes-section" id="classes">
        {classesData.map((item, index) => (
          <Card key={index} className={`class-card ${item.color}`}>
            <CardContent>
              <Sparkles size={36} color="#fff" />
              <Typography variant="h6" className="card-title">{item.title}</Typography>
              <Typography variant="body2" className="card-desc">{item.desc}</Typography>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* פרסומות */}
      <section className="ads-section">
        <div className="ad-row reverse">
          <img src="/assets/gif4.gif" alt="פרסומת 4" />
          <div className="ad-text">
            <h3>התחלה חכמה מהבית 🏠</h3>
            <p>בונים שגרה בריאה גם מהבית – עם כל הכלים להצלחה</p>
            <Link to="/custom-start">
              <Button variant="contained" className="ad-button">בואו נתחיל</Button>
            </Link>
          </div>
        </div>

        <div className="ad-row">
          <img src="/assets/gif1.gif" alt="פרסומת 1" />
          <div className="ad-text">
            <h3>זזים קדימה בכיף!</h3>
            <p>אימון זה לא משימה – זו שמחה בתנועה!</p>
            <Link to="/ExercisePage">
              <Button variant="contained" className="ad-button">לפרטים</Button>
            </Link>
          </div>
        </div>

        <div className="ad-row reverse">
          <img src="/assets/gif2.gif" alt="פרסומת 2" />
          <div className="ad-text">
            <h3>כיף לילדים</h3>
            <p>חוגים מותאמים במיוחד עם הרבה מרץ ותנועה</p>
            
            {/* כפתור הרשמה – מעביר ל- /login */}
            <Link to="/login">
              <Button variant="contained" className="ad-button">התחברות</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* צור קשר */}
      <footer className="contact-section" id="contact">
        <Typography variant="h5" className="contact-title">
          רוצים להצטרף?
        </Typography>
        <Typography variant="body1" className="contact-subtitle">
          השאירו פרטים ונחזור אליכם עם כל המידע!
        </Typography>
        <Button variant="contained" className="contact-button">צור קשר</Button>
      </footer>
    </div>
  );
};

export default GymLandingPage;
