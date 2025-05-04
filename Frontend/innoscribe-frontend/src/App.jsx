import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import RoleRegistration from "./pages/RoleBasedRegistration";
import TeacherLogin from "./pages/teacherlogin";
import StudentLogin from "./pages/studentlogin";
import StudentDashboard from "./pages/student-dashboard";
import TeacherDashboard from "./pages/teacher-dashboard";
import TeacherSubject from "./pages/TeacherSubjectPage";
import AddResources from './pages/AddResources';
import AddQuestions from "./pages/AddQuestions";
import UploadNotes from "./pages/UploadNotes";
import UploadVideos from "./pages/UploadVideos";
import StMCQ from "./pages/StMCQ";
import StEssay from "./pages/StEssay";
import StFillUps from "./pages/StFillUps";
import StShortAnswer from "./pages/StShortAnswer";
import StLongAnswer from "./pages/StLongAnswer";

// Question Type Pages
import FillUps from "./pages/FillUps";
import LongAnswers from "./pages/LongAnswer";
import ShortAnswer from "./pages/ShortAnswer";
import MCQ from "./pages/MCQ";
import Essay from "./pages/Essay";

// ✅ NEW: Student Subject Pages
import StudentSubject from "./pages/StudentSubjectPage"; // make sure this file exists
import ViewResources from "./pages/ViewResources"; // make sure this file exists
import TakeExam from "./pages/TakeExam"; // make sure this file exists

function App() {
  return (
    <Router>
      <Routes>
        {/* General Pages */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/rolebasedregistration" element={<RoleRegistration />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />

        {/* Teacher Subject-Specific Pages */}
        <Route path="/teacher/:subject" element={<TeacherSubject />} />
        <Route path="/upload-notes/:subject" element={<UploadNotes />} />
        <Route path="/upload-videos/:subject" element={<UploadVideos />} />
        <Route path="/add-questions/:subject" element={<AddQuestions />} />

        {/* Question Type Pages */}
        <Route path="/fill-ups/:subject" element={<FillUps />} />
        <Route path="/long-answer/:subject" element={<LongAnswers />} />
        <Route path="/short-answer/:subject" element={<ShortAnswer />} />
        <Route path="/mcq/:subject" element={<MCQ />} />
        <Route path="/essay/:subject" element={<Essay />} />
        <Route path="/add-resources/:subject" element={<AddResources />} />

        {/* ✅ Student Subject-Specific Pages */}
        <Route path="/student/:subject" element={<StudentSubject />} />
        <Route path="/view-resources/:subject" element={<ViewResources />} />
        <Route path="/take-exam/:subject" element={<TakeExam />} />

        <Route path="/take-exam/:subject/st_mcq" element={<StMCQ />} />
        <Route path="/take-exam/:subject/st_essay" element={<StEssay />} />
        <Route path="/take-exam/:subject/st_fill-ups" element={<StFillUps />} />
        <Route path="/take-exam/:subject/st_short-answer" element={<StShortAnswer />} />
        <Route path="/take-exam/:subject/st_long-answer" element={<StLongAnswer />} />
      </Routes>
    </Router>
  );
}

export default App;
