// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useState } from 'react'
import './App.css'
import Admin from './components/admin'
import Data from './components/data'
import MainScreen from './Screens/MainScreen';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Tests from './Screens/Tests';
import DrawerComponents from './MajorComponents/DrawerComponents';
import AdminScreen from './Screens/AdminScreen';

function App() {
  const [isAdmin, setAdmin] = useState(false);

  const some = () => {
    console.log("isadmin -> ", isAdmin);

    setAdmin(!isAdmin);
  }
  // return (
    // <>
    //   <div className="">Hello</div>
    //   <button onClick={some}>User</button>
    //   {!isAdmin ? <div className="">
    //     <Data></Data>
    //   </div>
    //     :
    //     <div className="">
    //       <Admin></Admin>
    //     </div>
    //   }
    // </>

    return (
    <BrowserRouter>
    <div className="flex">
          <div className="fixed top-0 left-0 w-60 bg-gray-100 p-4 h-screen"> {/* Fixed sidebar */}
            <DrawerComponents />
          </div>
          <div className="flex-grow p-4 ml-60">
      <Routes>
        {/* <Route path="/" element={<MainScreen />} /> */}
        <Route index element={<MainScreen />} />
            <Route path="/test" element={<Tests />} />
            <Route path="/admin" element={<AdminScreen />} />
          {/* <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} /> */}
          {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
      </div>
          </div>
    </BrowserRouter>
  );

  //   <>
  //     <MainScreen></MainScreen>
  //   </>
  // )
}

export default App
