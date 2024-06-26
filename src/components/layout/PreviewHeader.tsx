import Button from '../UI/Button';

const Component: React.FC<{handleClick: () => void}> = ({ handleClick }) => {
  return (
    <header className='p-4'>
      <nav>
        <ul className='flex flex-col space-y-3 xs:flex-row xs:space-x-4 xs:space-y-0'>
          <li className='flex-1'>
            <Button handleClick={handleClick} variant='secondary'>
              Back to Editor
            </Button>
          </li>
          <li className='flex-1'>
            <Button>
              Share Link
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Component;