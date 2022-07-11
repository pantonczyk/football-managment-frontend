import { useState } from 'react';

export default function useToggleVisibility(value) {
   const [isOpen, setComponentVisibility] = useState(value);

   const handleToggleVisibility = () => {
      setComponentVisibility((prevValue) => !prevValue);
   };

   return [isOpen, handleToggleVisibility];
}
