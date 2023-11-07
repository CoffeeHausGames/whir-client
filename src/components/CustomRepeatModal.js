import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './CustomRepeatModal.css';

const CustomRepeatModal = ({
  isOpen,
  onRequestClose,
  customRepeatConfig,
  setCustomRepeatConfig,
  toggleCustomRepeatModal,
  dealName,
  description,
  setDealName,
  setDescription,
  handleSaveDeal,
}) => {
  const el = document.createElement('div');

  useEffect(() => {
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  }, [el]);

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return ReactDOM.createPortal(
    <div className={`custom-repeat-overlay ${isOpen ? 'open' : ''}`} onClick={onRequestClose}>
      <div className={`custom-repeat-modal ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
        <label>Deal Name:</label>
        <input
          type="text"
          value={dealName}
          onChange={(e) => setDealName(e.target.value)}
        />

        <label>Start Date:</label>
        <input
          type="date"
          value={customRepeatConfig.startDate}
          onChange={(e) => setCustomRepeatConfig({ ...customRepeatConfig, startDate: e.target.value })}
        />

        <label>End Date:</label>
        <input
          type="date"
          value={customRepeatConfig.endDate}
          onChange={(e) => setCustomRepeatConfig({ ...customRepeatConfig, endDate: e.target.value })}
        />

        <label>Start Time:</label>
        <input
          type="time"
          value={customRepeatConfig.startTime}
          onChange={(e) => setCustomRepeatConfig({ ...customRepeatConfig, startTime: e.target.value })}
        />

        <label>End Time:</label>
        <input
          type="time"
          value={customRepeatConfig.endTime}
          onChange={(e) => setCustomRepeatConfig({ ...customRepeatConfig, endTime: e.target.value })}
        />

        <div className="day-selection">
          <label>Select Days:</label>
          <div className="day-checkboxes">
            {daysOfWeek.map((day, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  value={day}
                  checked={customRepeatConfig.days.includes(day)}
                  onChange={(e) => {
                    const selectedDays = customRepeatConfig.days.slice();
                    if (e.target.checked) {
                      selectedDays.push(day);
                    } else {
                      const index = selectedDays.indexOf(day);
                      if (index !== -1) {
                        selectedDays.splice(index, 1);
                      }
                    }
                    setCustomRepeatConfig({ ...customRepeatConfig, days: selectedDays });
                  }}
                />
                {day}
              </label>
            ))}
          </div>
        </div>

        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={handleSaveDeal}>Save</button>
      </div>
    </div>,
    el
  );
};

export default CustomRepeatModal;
