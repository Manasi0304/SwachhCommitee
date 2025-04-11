import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Calendar styling
import './CalendarSchedule.css'; // Custom CSS for styling
import GetStarted from './GetStarted';
import Footer from './Footer';
import Header2 from './Header2';

function CalendarSchedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [showHolidayInfo, setShowHolidayInfo] = useState(false);
  const [showNotificationForm, setShowNotificationForm] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [notificationDays, setNotificationDays] = useState(1);
  const [notificationType, setNotificationType] = useState('email');

  // Updated holiday data for 2023
  const holidays = [
    { date: new Date(2024, 0, 26), name: 'Republic Day', description: 'Celebration of the adoption of the Indian Constitution.' },
    { date: new Date(2024, 2, 7), name: 'Dhuliwandan', description: 'Cultural festival celebrated in Maharashtra.' },
    { date: new Date(2024, 3, 14), name: 'Ambedkar Jayanti', description: 'Celebration of Dr. B.R. Ambedkar\'s birth anniversary.' },
    { date: new Date(2024, 4, 1), name: 'Maharashtra Din', description: 'Celebration of Maharashtra Day.' },
    { date: new Date(2024, 7, 15), name: 'Independence Day', description: 'Celebration of India\'s independence from British rule.' },
    { date: new Date(2024, 8, 19), name: 'Ganesh Chaturthi', description: 'Hindu festival celebrating the birth of Lord Ganesha.' },
    { date: new Date(2024, 8, 28), name: 'Anant Chaturdashi', description: 'Final day of Ganesh Chaturthi festival.' },
    { date: new Date(2024, 9, 2), name: 'Gandhi Jayanti', description: 'Birth anniversary of Mahatma Gandhi.' },
    { date: new Date(2024, 9, 24), name: 'Dashhera', description: 'Hindu festival celebrating the victory of good over evil.' },
    { date: new Date(2024, 10, 14), name: 'Diwali Padava', description: 'Celebration of the day after Diwali.' },
    { date: new Date(2024, 10, 15), name: 'Bhaubeej', description: 'Celebration of the bond between brothers and sisters.' },
    { date: new Date(2024, 11, 25), name: 'Christmas', description: 'Celebration of the birth of Jesus Christ.' }
  ];

  // Sample data for waste collection schedules
  const wasteSchedules = [
    { id: 1, location: 'Building A', time: '10:00 AM', date: '2024-10-06', manager: 'Mr. Smith' },
    { id: 2, location: 'Building B', time: '11:30 AM', date: '2024-10-10', manager: 'Mrs. Johnson' },
    { id: 3, location: 'Building C', time: '09:00 AM', date: '2024-10-15', manager: 'Mr. Clark' },
    { id: 4, location: 'Building D', time: '02:00 PM', date: '2024-10-20', manager: 'Mrs. Evans' },
    { id: 5, location: 'Building E', time: '04:30 PM', date: '2024-10-25', manager: 'Mr. Brown' }
  ];

  // Function to check if the date matches any holiday
  const isHoliday = (date) => {
    return holidays.some(holiday => 
      holiday.date.toDateString() === date.toDateString()
    );
  };

  // Get the name of the holiday for a specific date
  const getHolidayForDate = (date) => {
    return holidays.find(holiday => holiday.date.toDateString() === date.toDateString());
  };

  // Handle click on a holiday
  const handleHolidayClick = (date) => {
    const holiday = getHolidayForDate(date);
    if (holiday) {
      setSelectedHoliday(holiday);
      setShowHolidayInfo(true);
    }
  };

  // Handle notification form display
  const handleNotifyMeClick = (schedule) => {
    setSelectedSchedule(schedule);
    setShowNotificationForm(true);
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`You will be notified ${notificationDays} day(s) before via ${notificationType}`);
    setShowNotificationForm(false); // Close the form after submission
  };

  return (
    <div>
      <Header2 />
      <div className="container">
      <h1>Waste Collection Calendar & Schedule</h1>

      {/* Calendar Component */}
      <div className="calendar-section">
        <h2>Holidays/Functions</h2>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileClassName={({ date, view }) => isHoliday(date) ? 'holiday-tile' : null}
          onClickDay={(date) => handleHolidayClick(date)} // Handle click on a day
        />
        {/* <div className="holiday-info">
          {holidays.map((holiday, index) => (
            <p key={index} className="holiday-item">
              {holiday.name} on {holiday.date.toDateString()}
            </p>
          ))}
        </div> */}
      </div>

      {/* Show Holiday Info Modal */}
      {showHolidayInfo && selectedHoliday && (
        <div className="holiday-info-modal">
          <div className="modal-content">
            <h3>{selectedHoliday.name}</h3>
            <p>{selectedHoliday.description}</p>
            <button onClick={() => setShowHolidayInfo(false)} className="close-button">Close</button>
          </div>
        </div>
      )}

      {/* Waste Collection Schedules */}
      <div>
        <h2 className='h2'>Scheduled Waste Collections</h2>
        <div className="schedule-section">
          {wasteSchedules.map((schedule) => (
            <div key={schedule.id} className="schedule-item">
              <p><strong>Location:</strong> {schedule.location}</p>
              <p><strong>Time:</strong> {schedule.time}</p>
              <p><strong>Date:</strong> {schedule.date}</p>
              <p><strong>Manager:</strong> {schedule.manager}</p>
              <button className="notify-button" onClick={() => handleNotifyMeClick(schedule)}>
                Notify Me
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Form */}
      {showNotificationForm && selectedSchedule && (
        <div className="notification-form">
          <h3>Set Notification for Waste Collection at {selectedSchedule.location}</h3>
          <form onSubmit={handleFormSubmit}>
            <label>
              How many days before do you want to be notified?
              <input 
                type="number" 
                value={notificationDays} 
                onChange={(e) => setNotificationDays(e.target.value)} 
                min="1" 
              />
            </label>
            <label>
              Notification Type:
              <select value={notificationType} onChange={(e) => setNotificationType(e.target.value)}>
                <option value="email">Email</option>
                <option value="sms">SMS</option>
              </select>
            </label>
            <button type="submit" className="submit-button">Set Reminder</button>
          </form>
        </div>
      )}
    </div>
     <GetStarted />
      <Footer />
    </div>
  );
}

export default CalendarSchedule;
