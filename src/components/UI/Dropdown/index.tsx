'use client'

import { 
  useState, 
  useRef, 
  useCallback, 
  useEffect } from "react"
import Button from './elements/Button';
import Menu from './elements/Menu';
import { LinkShareSupportedPlatforms } from "../../../config";

const Component: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(LinkShareSupportedPlatforms['GitHub']);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  }

  // check type for event
  const handleMouseDown = useCallback((e: any) => {
    if (isOpen && !menuRef.current?.contains(e.target) &&
      !buttonRef.current?.contains(e.target)
    ) {
      setIsOpen(false);
    } 
  }, [isOpen])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [handleMouseDown]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="relative inline-block text-left w-full">
      <Button isOpen={isOpen} handleClick={handleClick} buttonRef={buttonRef} selectedPlatform={selectedPlatform} />
      {isOpen && <Menu menuRef={menuRef} selectedPlatform={selectedPlatform} setSelectedPlatform={setSelectedPlatform} setIsOpen={setIsOpen} />}
    </div>
  )
}

export default Component;