import React, { Dispatch, SetStateAction } from "react";

//Layout
import LoginLayout from "../../layouts/login";

interface LoginProps {
	setIsAdmin: Dispatch<SetStateAction<boolean>>;
}

function Login({ setIsAdmin }: LoginProps) {
	return (
		<div>
			<LoginLayout setIsAdmin={setIsAdmin} />
		</div>
	);
}

export default Login;
