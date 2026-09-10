import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import FieldSurveyForm from "./Pages/FieldSurveyForm";
import GisMapPage from "./Pages/GisMapPage";
import LandRecords from "./Pages/LandRecords";
import PropertyDetailsPage from "./Pages/PropertyDetailPage";
import Contact from "./Pages/Contact";
import AffiliatedDepartments from "./Components/affilated";
import Reports from "./Pages/Reports";
import Register from "./Pages/Register";
import AllServicesPage from "./Pages/Services";
import Applications from "./Pages/Applications";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/field-survey" element={<FieldSurveyForm />} />
        <Route path="/gis-map" element={<GisMapPage />} />
        <Route path="/landrecords" element={<LandRecords />} />
        <Route path="/property-details" element={<PropertyDetailsPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/affiliated-departments" element={<AffiliatedDepartments />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/services" element={<AllServicesPage />} />
        <Route path="/Applications" element={<Applications />} />
      </Routes>
    </>
  );
}

export default App;