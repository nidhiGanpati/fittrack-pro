# 🏋️ FitTrack Pro - Fitness Tracking Application

![FitTrack Pro](https://img.shields.io/badge/Bootstrap-5.3.2-purple?style=for-the-badge&logo=bootstrap)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 📋 Project Overview

**FitTrack Pro** is a modern, responsive fitness tracking web application designed to help users monitor their workouts, track progress, and achieve their fitness goals with AI-powered insights. This project was built as part of **Group Assignment 5** focusing on Bootstrap framework implementation, responsive design, and front-end development best practices.

### 🎯 Purpose

To provide users with an intuitive, feature-rich platform for:
- Tracking daily workouts and exercises
- Monitoring fitness progress with detailed analytics
- Accessing personalized workout plans
- Connecting with a fitness community
- Achieving health and fitness goals

---

## ✨ Features

### Core Features
- ✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- ✅ **User Authentication** - Secure login system with form validation
- ✅ **Progress Tracking** - Monitor fitness journey with charts and analytics
- ✅ **Workout Library** - Access to 1000+ exercises with video tutorials
- ✅ **AI Coach** - Personalized workout and nutrition recommendations
- ✅ **Community Features** - Connect with friends and join challenges
- ✅ **Health Metrics** - Track calories, heart rate, sleep, and more

### Additional Features
- Real-time form validation with visual feedback
- Password strength indicator
- Social login integration (Google, Facebook, Apple, Microsoft)
- Testimonial carousel with user reviews
- Pricing plans comparison
- FAQ accordion section
- Contact form with validation
- Smooth scroll navigation
- Scroll-to-top button

---

## 🎨 Bootstrap Components Used (25+ Components)

This project extensively utilizes Bootstrap 5.3.2 components to create a professional, responsive UI:

### Navigation & Layout
1. **Navbar** - Fixed responsive navigation bar
2. **Container** - Responsive layout container
3. **Row & Columns** - Grid system for responsive layouts
4. **Breadcrumb** - Navigation trail on login page

### Content Components
5. **Card** - Login card, feature cards, pricing cards
6. **Badge** - Status indicators and labels
7. **Alert** - Success, error, and info notifications
8. **Carousel** - Testimonial slider with auto-play
9. **Accordion** - FAQ expandable sections

### Forms & Inputs
10. **Form** - Login and contact forms
11. **Form Control** - Text inputs, email, password fields
12. **Form Floating** - Floating labels for inputs
13. **Form Check** - Checkbox for "Remember Me"
14. **Input Group** - Grouped form elements

### Buttons & Actions
15. **Button** - Primary, secondary, outline buttons
16. **Button Group** - Social login buttons
17. **Dropdown** - Additional login options menu
18. **Spinner** - Loading indicators

### Feedback Components
19. **Valid Feedback** - Success validation messages
20. **Invalid Feedback** - Error validation messages
21. **Progress Bar** - Loading progress indicator
22. **Toast** - Session timeout notifications

### Modal Components
23. **Modal** - Forgot password popup
24. **Modal** - Sign up registration popup
25. **Modal Header/Body/Footer** - Modal structure

### Additional Components
26. **Hero Section** - Custom gradient background
27. **Stats Cards** - Animated statistics display
28. **Feature Icons** - Icon-based feature showcase
29. **Pricing Tables** - Subscription plan comparison
30. **Footer** - Multi-column footer with links
31. **Social Links** - Social media icon buttons

---

## 🛠️ Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| HTML5 | - | Semantic markup and structure |
| CSS3 | - | Custom styling and animations |
| JavaScript | ES6+ | Form validation and interactivity |
| Bootstrap | 5.3.2 | Responsive framework and components |
| Bootstrap Icons | 1.11.1 | Icon library |
| Git | - | Version control |

---

## 📁 Project Structure
```
fittrack-pro/
├── index.html              # Login page (20+ components)
├── landing.html            # Landing page (25+ components)
├── dashboard.html          # User dashboard (future)
├── progress.html           # Progress tracker (future)
├── workouts.html           # Workout library (future)
├── README.md              # Project documentation
├── .gitignore             # Git ignore file
└── assets/
    ├── css/
    │   └── style.css      # Custom styles (optional)
    ├── js/
    │   ├── main.js        # Main JavaScript
    │   └── dashboard.js   # Dashboard scripts
    └── images/            # Project images
```

---

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Text editor or IDE (VS Code recommended)
- Git (optional, for version control)

### Installation

1. **Clone or Download the Repository**
```bash
   git clone https://github.com/YOUR_USERNAME/fittrack-pro.git
   cd fittrack-pro
```

2. **Open the Project**
   - Open `index.html` in your web browser for the login page
   - Or open `landing.html` for the main landing page

3. **No Build Process Required!**
   - This is a static website - just open the HTML files
   - All dependencies are loaded via CDN

### Running Locally

**Option 1: Direct File Opening**
- Right-click `index.html` or `landing.html`
- Select "Open with" → Your preferred browser

**Option 2: Using Live Server (VS Code)**
- Install "Live Server" extension in VS Code
- Right-click on `index.html`
- Select "Open with Live Server"
- Website opens at `http://localhost:5500`

**Option 3: Using Python HTTP Server**
```bash
# Python 3
python -m http.server 8000

# Then open: http://localhost:8000
```

---

## 🔐 Demo Credentials

To test the login functionality:

- **Email:** `demo@fittrack.com`
- **Password:** `password123`

---

## 📱 Responsive Breakpoints

The website is fully responsive across all devices:

| Device | Breakpoint | Layout |
|--------|------------|--------|
| Mobile | < 576px | Single column, stacked content |
| Tablet | 576px - 991px | 2 columns, adjusted spacing |
| Desktop | ≥ 992px | Full multi-column layout |
| Large Desktop | ≥ 1200px | Maximum width container |

---

## ✅ Form Validation

### Login Page Validation

**Email Validation:**
- Must be a valid email format (user@domain.com)
- Real-time validation with visual feedback
- Error message for invalid format

**Password Validation:**
- Minimum 8 characters required
- Password strength indicator (weak/medium/strong)
- Show/hide password toggle
- Real-time validation feedback

**Validation Features:**
- Bootstrap validation classes (is-valid, is-invalid)
- Custom error messages
- Visual feedback with icons
- Prevents form submission if invalid

---

## 🎨 Color Palette
```css
Primary Color:    #6366f1 (Indigo)
Secondary Color:  #8b5cf6 (Purple)
Success Color:    #10b981 (Green)
Danger Color:     #ef4444 (Red)
Warning Color:    #f59e0b (Orange)
Dark Color:       #1e293b (Slate)
Light Color:      #f8fafc (Light Gray)
```

---

## 📊 Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | Latest | ✅ Fully Supported |
| Firefox | Latest | ✅ Fully Supported |
| Safari | Latest | ✅ Fully Supported |
| Edge | Latest | ✅ Fully Supported |
| Opera | Latest | ✅ Fully Supported |

---

## 🤝 Team Members

- **[Your Name]** - Full Stack Developer - [GitHub Profile]
- **[Team Member 2]** - Frontend Developer - [GitHub Profile]
- **[Team Member 3]** - UI/UX Designer - [GitHub Profile]
- **[Team Member 4]** - QA Tester - [GitHub Profile]

---

## 📝 Assignment Requirements Met

✅ **Page Development** - Login and landing pages created  
✅ **Form Validation** - Comprehensive client-side validation  
✅ **Bootstrap Components** - 25+ distinct components used  
✅ **Responsive Design** - Works on all device sizes  
✅ **Documentation** - Complete README with all details  
✅ **Git Workflow** - Proper version control implemented  

---

## 🚀 Future Enhancements

- [ ] Complete dashboard page with analytics
- [ ] Progress tracking with charts (Chart.js)
- [ ] Workout library with search and filters
- [ ] User profile and settings page
- [ ] Dark mode toggle
- [ ] Backend API integration
- [ ] Database for user data persistence
- [ ] Push notifications
- [ ] Social sharing features
- [ ] Mobile app (React Native)

---

## 📸 Screenshots

### Login Page
![Login Page](screenshots/login.png)

### Landing Page
![Landing Page](screenshots/landing.png)

### Responsive Design
![Responsive](screenshots/responsive.png)

---

## 🔗 Live Demo

**[View Live Demo](https://your-username.github.io/fittrack-pro/)**

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Bootstrap team for the amazing framework
- Bootstrap Icons for the icon library
- Google Fonts for typography
- Unsplash for placeholder images
- Our professor and TAs for guidance

---

## 📞 Contact

For questions or feedback:

- **Email:** support@fittrackpro.com
- **GitHub:** [Your GitHub Profile](https://github.com/YOUR_USERNAME)
- **LinkedIn:** [Your LinkedIn](https://linkedin.com/in/YOUR_PROFILE)

---

## ⭐ Show Your Support

If you found this project helpful, please consider giving it a ⭐ on GitHub!

---

**Made with ❤️ by [Your Team Name]**

© 2025 FitTrack Pro. All Rights Reserved.