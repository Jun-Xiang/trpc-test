import dynamic from "next/dynamic";

type Props = {};

const LoginForm = dynamic(() => import("../components/LoginForm"), {
	ssr: false,
});

const Login = (props: Props) => {
	return (
		<>
			<LoginForm />
		</>
	);
};

export default Login;
