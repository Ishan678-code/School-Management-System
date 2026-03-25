import { useState, useCallback } from "react";
const useSettingsForm = () => {
  const [activeTab, setActiveTab] = useState("School");
  const [notifications, setNotifications] = useState({
    email: true,
    attendance: false,
    enrollments: true,
    events: false,
    system: true
  });
  const [showSaved, setShowSaved] = useState(false);

  const toggleNotification = useCallback((key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  }, []);

  const handleSave = useCallback(() => {
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  }, []);
 return {
    activeTab,
    setActiveTab,
    notifications,
    toggleNotification,
    showSaved,
    handleSave
  };
};

export default useSettingsForm;