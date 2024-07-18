import DragAndDropIcon from '../icons/DragAndDropIcon';
import Dropdown from '@/components/UI/Dropdown/index';
import TextInputWithIcon from '@/components/UI/TextInputWithIcon';
import { icons } from '@/config/index';
import { useState } from 'react';
import { State, Action } from '@/userReducer';
import { Dispatch } from 'react';

const Component: React.FC<{ state: State, dispatch: Dispatch<Action> }> = ({ state, dispatch }) => {

  const [isExpand, setIsExpand] = useState(false);
  const [targetId, setTargetId] = useState<string | number>();
  const [draggedLinkId, setDraggedLinkId] = useState(0)

  const handleRemoveLink = (linkId: number) => {
    dispatch({ type: 'removed_link', linkId });
  }

  const handleDragStart = (e: React.DragEvent, linkId: number) => {
    e.dataTransfer.setData("linkId", linkId.toString());
    setDraggedLinkId(linkId);
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropzoneLinkId: number | string) => {
    const draggedLinkId = e.dataTransfer.getData("linkId");
    dispatch({ type: 'moved_link', draggedLinkId, dropzoneLinkId })
    setIsExpand(false);
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, linkId: string | number) => {
    e.preventDefault();
    const targetIdx = state.links.findIndex(link => link.id === linkId)
    const draggedLinkIdx = state.links.findIndex(link => link.id === draggedLinkId);

    if (draggedLinkId !== linkId && ((draggedLinkIdx - 1) !== targetIdx)) {
      setIsExpand(true);
    } else {
      setIsExpand(false);
    }

    if (targetId !== linkId) {
      setTargetId(linkId)
    }
  }

  const handleDragLeave = () => {
    setIsExpand(false);
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    dispatch({ type: 'edited_url', linkId: id, url: e.target.value });
  }

  return (
    <div id='links' className='mt-6'>
      <ul className='space-y-6'>
        <div id='top-dropzone' onDragOver={(e, linkId = 'top-dropzone') => handleDragOver(e, linkId)} className='w-full h-6 absolute' onDrop={(e, linkId = 'top-dropzone') => handleDrop(e, linkId)} onDragLeave={handleDragLeave} />
        {
          targetId == 'top-dropzone' && isExpand &&
          <div className='transition ease-in w-full h-12' />
        }
        {
          state.links.map((link, idx) => {
            return (
              <div key={link.id} className=''>
                <li className='p-5 space-y-3' draggable onDragStart={(e) => handleDragStart(e, link.id)}>
                  <div className='flex justify-between text-grey-300'>
                    <div className='flex items-center gap-x-2'>
                      <DragAndDropIcon />
                      <span className='font-bold'>Link #{idx + 1}</span>
                    </div>
                    <button onClick={() => handleRemoveLink(link.id)}>Remove</button>
                  </div>

                  <div>
                    <label htmlFor="platform-selection" className="text-grey-400 text-sm">
                      Platform
                    </label>
                    <Dropdown linkId={link.id} dispatch={dispatch} state={state} />
                  </div>

                  <div>
                    <label htmlFor="link" className="text-grey-400 text-sm">
                      Link
                    </label>
                    <TextInputWithIcon value={link.url} name='link' type='url' autocomplete='url' isError={link.status.isError} icon={icons.link} handleChange={(e, linkId = link.id) => handleUrlChange(e, linkId)} placeholder='e.g https://www.github.com/al-khawarizmi' />
                  </div>
                </li>
                <div onDragOver={(e, linkId = link.id) => handleDragOver(e, linkId)} className='w-full h-12 absolute' onDrop={(e, linkId = link.id) => handleDrop(e, linkId)} onDragLeave={handleDragLeave} />
                {
                  targetId == link.id && isExpand &&
                  <div className='w-full h-12' />
                }
              </div>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Component;