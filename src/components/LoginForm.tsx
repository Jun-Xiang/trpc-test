import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { CreateUserInputType } from "@/schema/user.schema";
import { trpc } from "@/utils/trpc";
type Props = {};

const VerifyToken = ({ hash }: { hash: string }) => {
	const router = useRouter();
	const { data, isLoading } = trpc.useQuery(["users.verify-otp", { hash }]);

	if (isLoading) {
		return <p>Verifying...</p>;
	}
	router.push(data?.redirect.includes("login") ? "/" : data?.redirect || "/");

	return <p>Redirecting...</p>;
};
const LoginForm = (props: Props) => {
	const { handleSubmit, register } = useForm<CreateUserInputType>();
	const [success, setSuccess] = useState(false);
	const router = useRouter();

	const { mutate, error } = trpc.useMutation(["users.request-otp"], {
		onSuccess: () => {
			setSuccess(true);
		},
	});

	const hash = router.asPath.split("#token=")[1];
	if (hash) {
		return <VerifyToken hash={hash} />;
	}

	return (
		<form
			className="form"
			onSubmit={handleSubmit(value => {
				mutate({ ...value, redirect: router.asPath });
			})}>
			{error && error.message}
			{success && <p>Check your email</p>}
			<h1 className="title">Login</h1>
			<input
				className="input"
				type="email"
				placeholder="jane.doe@example.com"
				{...register("email")}
			/>
			<input
				className="input"
				type="text"
				placeholder="Jane Doe"
				{...register("name")}
			/>
			<button type="submit" className="btn">
				Login
			</button>
			<Link href="/register">
				<a className="link">Register</a>
			</Link>
		</form>
	);
};

export default LoginForm;
