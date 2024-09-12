import { HTMLInputTypeAttribute, HTMLInputAutoCompleteAttribute } from 'react';

const Component: React.FC<{ id?: string, value?: string, name?: string, type?: HTMLInputTypeAttribute, autocomplete?: HTMLInputAutoCompleteAttribute, isError?: boolean, icon?: JSX.Element, placeholder?: string, className?: string, handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void }> = ({ id, value, name, type, autocomplete, icon, isError = false, placeholder, className, handleChange, ...props }) => {
  return (
    <div className={`w-full ${className}`}>
      {isError &&
        <span className="text-red text-sm ml-1 mb-0.5">Please check again</span>
      }
      <div className='relative rounded-md shadow-sm'>
        <input
          onChange={handleChange}
          type={type}
          value={value}
          name={name}
          id={id}
          autoComplete={autocomplete}
          className={`block w-full rounded-lg border px-4 py-3 ${isError ? 'text-red border-red' : 'text-grey-400 border-grey-200'} focus:outline-none focus:border-none focus:ring-1 focus:ring-inset focus:ring-purple-300 focus:shadow-[0px_0px_14px_2px_rgba(99,60,255,0.3)] placeholder:text-grey-400 placeholder:opacity-50 caret-purple-300`}
          placeholder={placeholder}
          {...props}
        />
      </div>
    </div>
    
  )
}

export default Component;
