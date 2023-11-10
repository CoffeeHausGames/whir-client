import React, { useState } from 'react';
import CustomRepeatModal from './CustomRepeatModal';
import './BusinessDealManager.css';

function ParentComponent() {
   const [isModalOpen, setIsModalOpen] = useState(false);

   const openModal = () => {
       setIsModalOpen(true);
   };

   const closeModal = () => {
       setIsModalOpen(false);
   };

   return (
       <div>
           <button className="add-deal-button" onClick={openModal}>Add Deal/Event</button>
           {isModalOpen && <CustomRepeatModal isOpen={isModalOpen} onClose={closeModal} />}
       </div>
   );
}

export default ParentComponent;
