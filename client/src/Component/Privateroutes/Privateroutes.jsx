import { Outlet, Navigate } from 'react-router-dom'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Privateroutes = () => {
    const history = useNavigate();
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    setTimeout(() => {
   
    }, 1500)
    
    
    return(
        localStorage.getItem('ShivamITech')? <><Outlet/></> : (
        
            <> 
            <h1 className='text-center'> Please Login</h1>
        
     
      
      </>)
    )
}

export default Privateroutes