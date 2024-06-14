// import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
// // import { ChevronDownIcon } from '@heroicons/react/20/solid'
// import ChevronDownIcon from '../icons/ChevronDownIcon';


// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

// export default function Example() {
//   return (
//     <Menu as="div" className="relative inline-block text-left">
//       <div>
//         <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
//           Options
//           <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
//         </MenuButton>
//       </div>

//       <Transition
//         enter="transition ease-out duration-100"
//         enterFrom="transform opacity-0 scale-95"
//         enterTo="transform opacity-100 scale-100"
//         leave="transition ease-in duration-75"
//         leaveFrom="transform opacity-100 scale-100"
//         leaveTo="transform opacity-0 scale-95"
//       >
//         <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//           <div className="py-1">
//             <MenuItem>
//               {({ focus }) => (
//                 <button
//                   className={classNames(
//                     focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
//                     'block px-4 py-2 text-sm'
//                   )}
//                 >
//                   Edit
//                 </button>
//               )}
//             </MenuItem>
//             <MenuItem>
//               {({ focus }) => (
//                 <button
//                   className={classNames(
//                     focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
//                     'block px-4 py-2 text-sm'
//                   )}
//                 >
//                   Duplicate
//                 </button>
//               )}
//             </MenuItem>
//           </div>
//           <div className="py-1">
//             <MenuItem>
//               {({ focus }) => (
//                 <button
//                   href="#"
//                   className={classNames(
//                     focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
//                     'block px-4 py-2 text-sm'
//                   )}
//                 >
//                   Archive
//                 </button>
//               )}
//             </MenuItem>
//             <MenuItem>
//               {({ focus }) => (
//                 <button
//                   className={classNames(
//                     focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
//                     'block px-4 py-2 text-sm'
//                   )}
//                 >
//                   Move
//                 </button>
//               )}
//             </MenuItem>
//           </div>
//           <div className="py-1">
//             <MenuItem>
//               {({ focus }) => (
//                 <button
//                   className={classNames(
//                     focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
//                     'block px-4 py-2 text-sm'
//                   )}
//                 >
//                   Share
//                 </button>
//               )}
//             </MenuItem>
//             <MenuItem>
//               {({ focus }) => (
//                 <button
//                   className={classNames(
//                     focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
//                     'block px-4 py-2 text-sm'
//                   )}
//                 >
//                   Add to favorites
//                 </button>
//               )}
//             </MenuItem>
//           </div>
//           <div className="py-1">
//             <MenuItem>
//               {({ focus }) => (
//                 <button
//                   className={classNames(
//                     focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
//                     'block px-4 py-2 text-sm'
//                   )}
//                 >
//                   Delete
//                 </button>
//               )}
//             </MenuItem>
//           </div>
//         </MenuItems>
//       </Transition>
//     </Menu>
//   )
// }

import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
// import {
//   ArchiveBoxXMarkIcon,
//   ChevronDownIcon,
//   PencilIcon,
//   Square2StackIcon,
//   TrashIcon,
// } from '@heroicons/react/16/solid'
import ChevronDownIcon from '../icons/ChevronDownIcon';

const Component = () => {
  return (
    <div className="fixed top-24 w-52 text-right">
      <Menu __demoMode>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
          Options
          {/* <ChevronDownIcon className="size-4 fill-white/60" /> */}
          <ChevronDownIcon />
        </MenuButton>
        <Transition
          enter="transition ease-out duration-75"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <MenuItems
            anchor="bottom end"
            className="w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none"
          >
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                {/* <PencilIcon className="size-4 fill-white/30" /> */}
                Edit
                <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘E</kbd>
              </button>
            </MenuItem>
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                {/* <Square2StackIcon className="size-4 fill-white/30" /> */}
                Duplicate
                <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘D</kbd>
              </button>
            </MenuItem>
            <div className="my-1 h-px bg-white/5" />
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                {/* <ArchiveBoxXMarkIcon className="size-4 fill-white/30" /> */}
                Archive
                <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘A</kbd>
              </button>
            </MenuItem>
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                {/* <TrashIcon className="size-4 fill-white/30" /> */}
                Delete
                <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘D</kbd>
              </button>
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  )
}

export default Component;
