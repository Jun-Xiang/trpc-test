import { CreateUserInputType } from "@/schema/user.schema";
import { trpc } from "@/utils/trpc";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

type Props = {};

const Register = (props: Props) => {
	const { handleSubmit, register } = useForm<CreateUserInputType>();
	const router = useRouter();

	const { mutate, error } = trpc.useMutation(["users.register-user"], {
		onSuccess: () => {
			router.push("/login");
		},
	});

	return (
		<>
			<form
				className="form"
				onSubmit={handleSubmit(value => {
					mutate(value);
				})}>
				{error && error.message}
				<h1 className="title">Register</h1>
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
					Register
				</button>
				<Link href="/login">
					<a className="link">Login</a>
				</Link>
			</form>
		</>
	);
};

export default Register;
