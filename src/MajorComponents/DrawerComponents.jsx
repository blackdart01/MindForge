import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { LuListCollapse } from 'react-icons/lu';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineAnalytics, MdOutlineQuiz, MdOutlineSchool } from 'react-icons/md';

const DrawerComponents = () => {
    const [open, setOpen] = useState(false);
    const [responseData, setResponseData] = useState([]);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const toggleScreens = (index) => () => {
        setResponseData(responseData.map((item) =>
            item.id === index ? { ...item, openState: !item.openState } : item
        ));
    };
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
                </ul>
            </div>
        {/* <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <LuListCollapse className="mt-2 relative left-[75%] size-[3.5em] rounded-full p-4 border-none bg-slate-500 hover:bg-slate-300"/>
            <List>
                {['Tests', 'Materials', 'Result'].map((text, index) => (
                    <ListItem key={text} disablePadding className="border-none hover:bg-slate-400" onClick={toggleScreens(index)}>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box> */}
        </>
    );

    // return (
    //     <div>
    //         <Button onClick={toggleDrawer(true)}>Open drawer</Button>
    //         <Drawer open={true} onClose={toggleDrawer(false)}>
    //             {DrawerList}
    //         </Drawer>
    //     </div>
    // );
}

export default DrawerComponents