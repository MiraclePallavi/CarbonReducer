'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';


const Navbar: React.FC = () => {
  return (
    <nav className="bg-gradient-to-r from-cyan-500 to-green-300 ">
      <div className="container mx-auto">
        <ul className="flex justify-between items-center">
          <div className="flex gap-16">
            <li>
              <Link href="/" className="text-white text-lg">Home</Link>
            </li>
            <li>
              <Link href="/about" className="text-white text-lg">About</Link>
            </li>
            <li>
              <Link href="/contact" className="text-white text-lg">Contact</Link>
            </li>
            <li>
             
            </li>
          </div>
          <li>
            <div className="flex flex-col items-center">
              <Link href="/Dashboard/userProfile" className="text-white text-sm">
                <Image
                  src="/profileIcon.svg"
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                Profile
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
