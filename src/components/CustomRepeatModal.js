import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './CustomRepeatModal.css';

const CustomRepeatModal = ({ isOpen, onRequestClose, customRepeatConfig, setCustomRepeatConfig, toggleCustomRepeatModal }) => {
  // Create a new div element to serve as the portal container
  const el = document.createElement('div');

  useEffect(() => {
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  }, [el]);

  // An array of days of the week
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Set the default unit to "week"
  if (!customRepeatConfig.repeatEvery.unit) {
    setCustomRepeatConfig({
      ...customRepeatConfig,
      repeatEvery: {
        ...customRepeatConfig.repeatEvery,
        unit: 'week',
      },
    });
  }

  // Render the modal into the new div
  return ReactDOM.createPortal(
    <div className={`custom-repeat-overlay ${isOpen ? 'open' : ''}`} onClick={onRequestClose}>
      <div className={`custom-repeat-modal ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
        <label>Start Date:</label>
        <input
          type="date"
          value={customRepeatConfig.startDate}
          onChange={(e) => setCustomRepeatConfig({ ...customRepeatConfig, startDate: e.target.value })}
        />

        <label>Repeat Every:</label>
        <div className="repeat-every-section">
          <select
            value={customRepeatConfig.repeatEvery.value}
            onChange={(e) =>
              setCustomRepeatConfig({
                ...customRepeatConfig,
                repeatEvery: { ...customRepeatConfig.repeatEvery, value: e.target.value },
              })
            }
          >
            {/* Include options 1-99 */}
            {Array.from({ length: 99 }, (_, i) => (
              <option key={i + 1} value={String(i + 1)}>
                {i + 1}
              </option>
            ))}
          </select>
          <select
            value={customRepeatConfig.repeatEvery.unit}
            onChange={(e) =>
              setCustomRepeatConfig({
                ...customRepeatConfig,
                repeatEvery: { ...customRepeatConfig.repeatEvery, unit: e.target.value },
              })
            }
          >
            <option value="day">Day(s)</option>
            <option value="week">Week(s)</option>
            <option value="month">Month(s)</option>
            <option value="year">Year(s)</option>
          </select>
        </div>

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

        <div className="occurs-text">
          Occurs every {customRepeatConfig.repeatEvery.value} {customRepeatConfig.repeatEvery.unit} until
        </div>

        <input
          type="date"
          value={customRepeatConfig.endDate}
          onChange={(e) => setCustomRepeatConfig({ ...customRepeatConfig, endDate: e.target.value })}
        />

        <button onClick={toggleCustomRepeatModal}>Save</button>
      </div>
    </div>,
    el
  );
};

export default CustomRepeatModal;
