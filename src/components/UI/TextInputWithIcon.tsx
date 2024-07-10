import { HTMLInputTypeAttribute, HTMLInputAutoCompleteAttribute } from 'react';

const Component: React.FC<{ id?: string, name?: string, type?: HTMLInputTypeAttribute, autocomplete?: HTMLInputAutoCompleteAttribute, isError?: boolean, icon?: JSX.Element, handleChange?: (event: React.ChangeEvent) => void, placeholder?: string }> = ({ id, name, type, autocomplete, icon, isError = false, handleChange, placeholder, ...props  }) => {
  return (
    <div className="w-full relative rounded-md shadow-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        {icon}
      </div>
      {isError &&
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <span className="text-red sm:text-sm">Please check again</span>
        </div>
      }
      <input
        type={type}
        name={name}
        id={id}
        value={undefined}
        onChange={handleChange}
        autoComplete={autocomplete}
        className={`block w-full rounded-lg border px-4 py-3 pl-10 ${isError ? 'text-red border-red' : 'text-grey-400 border-grey-200'} caret-purple-300 focus:outline-none focus:border-none focus:ring-1 focus:ring-inset focus:ring-purple-300 focus:shadow-[0px_0px_14px_2px_rgba(99,60,255,0.3)] placeholder:text-grey-400 placeholder:opacity-50`}
        placeholder={placeholder}
        {...props}
      />
    </div>
  )
}

export default Component;
