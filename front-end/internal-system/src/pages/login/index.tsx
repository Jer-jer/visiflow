import React, { Dispatch, SetStateAction } from "react";

//Layout
import LoginLayout from "../../layouts/login";

interface LoginProps {
	setIsAdmin: Dispatch<SetStateAction<boolean>>;
	setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

function Login({ setIsAdmin, setIsLoggedIn }: LoginProps) {
	return (
		<div>
			<LoginLayout setIsAdmin={setIsAdmin} setIsLoggedIn={setIsLoggedIn} />
		</div>
	);
}

export default Login;
