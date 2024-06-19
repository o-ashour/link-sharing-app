'use client'

import { useState } from "react"
import Button from './elements/Button';
import Menu from './elements/Menu';

const Component: React.FC = () => {
  // change to dialog?
  // need to improve accessiblity 
  // keyboard esc, enter, tab to focus on menu items 
  // close/open
  // clicking outside component should close menu
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="relative inline-block text-left w-full">
      <Button isOpen={isOpen} handleClick={handleClick} />
      <Menu isOpen={isOpen} />
    </div>
  )
}

export default Component;