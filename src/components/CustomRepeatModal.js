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

  const toggleDay = (day) => {
    const updatedDays = customRepeatConfig.days.includes(day)
      ? customRepeatConfig.days.filter((selectedDay) => selectedDay !== day)
      : [...customRepeatConfig.days, day];
  
    setCustomRepeatConfig({ ...customRepeatConfig, days: updatedDays });
  };

  const resetModal = () => {
    // Clear input values
    setDealName('');
    setDescription('');
    setCustomRepeatConfig({
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      days: [],
    });

    // Close the modal
    onRequestClose(); // Set isOpen to false in the parent component
  };

  if (!isOpen) {
    return null; // Do not render the modal if isOpen is false
  }

  return ReactDOM.createPortal(
    <div className={`custom-repeat-overlay open`} onClick={onRequestClose}>
      <div className={`custom-repeat-modal open`} onClick={(e) => e.stopPropagation()}>
        <label>Deal Name:</label>
        <input
          type="text"
          value={dealName}
          onChange={(e) => setDealName(e.target.value)}
        />

        <div className="input-group">
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
        </div>

        <div className="input-group">
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
        </div>

        <div className="day-selection">
          <label>Select Days:</label>
          <div className="day-buttons">
            {daysOfWeek.map((day, index) => (
              <button
                key={index}
                className={`day-button ${customRepeatConfig.days.includes(day) ? 'selected' : ''}`}
                onClick={() => toggleDay(day)}
              >
                {day.charAt(0)}
              </button>
            ))}
          </div>
        </div>

        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="button-group">        
          <button className="modal-save" onClick={handleSaveDeal}>Save</button>
          <button className="modal-cancel" onClick={resetModal}>Cancel</button>
        </div>

      </div>
    </div>,
    el
  );
};

export default CustomRepeatModal;
