import React, { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Files', href: '/#files', current: false },
  { name: 'Share', href: '/share', current: false },
  { name: 'Profile', href: '/profile', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


function scrollToSection() {
  const element = document.getElementById('files');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}




const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to='/'>
                    <span className='text-3xl text-white'>Decentralized Drive</span>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">

                    <Link
                      key="hahha"
                      to='/'
                      className=" text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    >
                      Home
                    </Link>



                    <Link
                      key="21"
                      to='/#files'
                      onClick={scrollToSection}
                      className=" text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    >
                      Files
                    </Link>


                    {navigation.map((nav) => (
                      <Link
                        key={nav.name}
                        to={nav.href}
                        onClick={nav.name === 'Files' ? scrollToSection : undefined}
                        className=" text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      >
                        {nav.name}
                      </Link>
                    ))}


                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 hidden items-center space-x-3 pr-2 sm:static sm:inset-auto sm:ml-6 sm:flex sm:pr-0">
                {user ? (
                  <Menu as="div" className="relative">
                    <div>
                      <Menu.Button className="flex items-center gap-2 rounded-full bg-gray-700/80 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-600">
                        <span className="hidden sm:inline">{user.email}</span>
                        <span className="text-xs text-gray-300">▾</span>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-xl bg-gray-900 py-2 shadow-2xl ring-1 ring-white/10 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={classNames(
                                active ? 'bg-gray-800 text-white' : 'text-gray-200',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              View Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              type="button"
                              onClick={handleLogout}
                              className={classNames(
                                active ? 'bg-gray-800 text-white' : 'text-gray-200',
                                'block w-full px-4 py-2 text-left text-sm'
                              )}
                            >
                              Logout
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="rounded-md border border-white/30 px-4 py-2 text-sm font-semibold text-gray-100 hover:bg-gray-700"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <div className="mt-4 space-y-2 border-t border-gray-700 pt-3">
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      className="block rounded-md border border-white/20 px-3 py-2 text-center text-base font-semibold text-gray-100"
                    >
                      View Profile
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="block w-full rounded-md bg-indigo-500 px-3 py-2 text-center text-base font-semibold text-white"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block rounded-md border border-white/30 px-3 py-2 text-center text-base font-semibold text-gray-100"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-base font-semibold text-white"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Navigation;
