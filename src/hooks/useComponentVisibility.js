import { useState, useCallback } from 'react';
import isFunction from 'utils/isFunction';

export default function useComponentVisibility(value, onOpen, onClose) {
   const [isOpen, setComponentVisibility] = useState(value);

   const handleOpen = useCallback(() => {
      setComponentVisibility(true);
      if (isFunction(onOpen)) onOpen();
   }, [onOpen]);

   const handleClose = useCallback(() => {
      setComponentVisibility(false);
      if (isFunction(onClose)) onClose();
   }, [onClose]);

   return [isOpen, handleOpen, handleClose];
}
