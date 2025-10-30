import { Router, Route } from "react-router-dom"; 

import { login } from './views/login';
import { actionLogs } from './views/actionLogs';
import { menu } from './views/menu';
import { users } from './views/User';
import { role } from './views/Role';

export function Routes(){
    return (
        <Router
            main={
                <>
                    <Route path="/" element={<login/>} />
                </>
            }
    )
}