import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineAnalytics, MdOutlineQuiz, MdOutlineSchool } from 'react-icons/md';

const DrawerComponents = () => {
    const [activeLink, setActiveLink] = useState('results');

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    return (
        <>
            <div className="bg-gray-100 p-4 h-screen"> {/*overflow-y-auto w-60 md:w-1/5 lg:w-1/6">  Responsive width */}
                <ul className="space-y-4">
                    <li>
                        <Link
                            to="/result"
                            className={`flex items-center p-2 rounded-md ${activeLink === 'results' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                            onClick={() => handleLinkClick('results')}
                        >
                            <MdOutlineAnalytics className="w-5 h-5 md:w-6 md:h-6 text-gray-700" /> {/* Responsive icon size */}
                            <span className="ml-2 text-sm md:text-base text-gray-700">Results</span> {/* Responsive text size */}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/test"
                            className={`flex items-center p-2 rounded-md ${activeLink === 'tests' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                            onClick={() => handleLinkClick('tests')}
                        >
                            <MdOutlineQuiz className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                            <span className="ml-2 text-sm md:text-base text-gray-700">Tests</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/course"
                            className={`flex items-center p-2 rounded-md ${activeLink === 'courses' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                            onClick={() => handleLinkClick('courses')}
                        >
                            <MdOutlineSchool className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                            <span className="ml-2 text-sm md:text-base text-gray-700">Courses</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/admin"
                            className={`flex items-center p-2 rounded-md ${activeLink === 'admin' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                            onClick={() => handleLinkClick('admin')}
                        >
                            <MdOutlineSchool className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                            <span className="ml-2 text-sm md:text-base text-gray-700">Admin</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );

}

export default DrawerComponents