import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useUserContext } from "@/context/user.context";
import LoginForm from "@/components/LoginForm";
import Link from "next/link";

const Home: NextPage = () => {
	const user = useUserContext();
	if (!user) {
		return <LoginForm />;
	}

	return (
		<div>
			<Link href="/posts/new">
				<a>Create post</a>
			</Link>
		</div>
	);
};

export default Home;
