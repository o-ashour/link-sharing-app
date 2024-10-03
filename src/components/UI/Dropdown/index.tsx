'use client'

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  Dispatch
} from "react"
import Button from './elements/Button';
import Menu from './elements/Menu';
import { State, Action } from "@/lib/definitions";

const Component: React.FC<{ linkId: number, dispatch: Dispatch<Action>, state: State }> = ({ linkId, dispatch, state }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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
      <Button isOpen={isOpen} buttonRef={buttonRef} linkId={linkId} state={state} setIsOpen={setIsOpen} />
      {isOpen && <Menu menuRef={menuRef} setIsOpen={setIsOpen} linkId={linkId} dispatch={dispatch} state={state} />}
    </div>
  )
}

export default Component;