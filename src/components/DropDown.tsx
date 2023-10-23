"use client";

import { Fragment, useState } from 'react'
import { Transition } from '@headlessui/react'
import Link from 'next/link';

export default function DropDown({ children}:{
    children: React.ReactNode,
}) {
  const [focus, setFocus] = useState(false);
  const onFocus = ()=>{
    setFocus(true);
  }
  const onBlur = ()=>{
    setTimeout(()=>{
      setFocus(false);
    }, 500)
  }

  return (
    <div onBlur={onBlur} className="relative">
      <div>
        <button onFocus={onFocus}>
          {children}
        </button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        show={focus}
      >
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            <Link
              href="/user/profile"
              className="hover:bg-slate-100 hover:text-slate-800 px-4 py-2 text-sm block"
            >
              Account settings
            </Link>
            <Link
              href="/user/logout"
              className="hover:bg-slate-100 hover:text-slate-800 px-4 py-2 text-sm block"
            >
              Logout
            </Link>
          </div>
        </div>
      </Transition>
    </div>
  )
}