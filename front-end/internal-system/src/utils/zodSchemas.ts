/*
	?	USED FOR DATA VALIDATION
*/
import { z, ZodType } from "zod";

export interface VisitorDetailsInterfaceZod {
	first_name: string;
	middle_name?: string;
	last_name: string;
	email: string;
	mobile: string;
	house?: string;
	street?: string;
	barangay: string;
	city: string;
	province: string;
	country: string;
	check_in_out: [string, string];
	visitor_type: string;
	status: string;
	purpose: string;
}

export const VisitorDetailZod: ZodType<VisitorDetailsInterfaceZod> = z.object({
	first_name: z
		.string({
			required_error: "First Name is required.",
			invalid_type_error: "First Name must not have number.",
		})
		.regex(/^[a-zA-Z]+/, {
			message: "Must not be empty or contain any numerals.",
		}),
	middle_name: z
		.string({
			required_error: "Middle Name is required.",
			invalid_type_error: "Middle Name must not have number.",
		})
		.regex(/^[a-zA-Z]+/, {
			message: "Must not contain any numerals.",
		})
		.optional(),
	last_name: z
		.string({
			required_error: "Last Name is required.",
			invalid_type_error: "Last Name must not have numbe.r",
		})
		.regex(/^[a-zA-Z]+/, {
			message: "Must not be empty or contain any numerals.",
		}),

	email: z.string().email({ message: "Invalid email address." }),
	mobile: z.coerce
		.string({
			required_error: "Mobile Number is required.",
			invalid_type_error: "Mobile Number must not have a letter or symbol.",
		})
		.regex(/^[0-9\-+\b]*$/, {
			message: "Mobile number must not include non-numerals.",
		}),

	house: z.string().optional(),
	street: z.string().optional(),
	barangay: z
		.string({
			required_error: "Barangay is required.",
			invalid_type_error: "Barangay must not have a number.",
		})
		.regex(/^[a-zA-Z]+/, {
			message: "Must not contain any numerals.",
		}),
	city: z
		.string({
			required_error: "City is required.",
			invalid_type_error: "City must not have a number.",
		})
		.regex(/^[a-zA-Z]+/, {
			message: "Must not contain any numerals.",
		}),
	province: z
		.string({
			required_error: "Province is required.",
			invalid_type_error: "Province must not have a number.",
		})
		.regex(/^[a-zA-Z]+/, {
			message: "Must not contain any numerals.",
		}),
	country: z
		.string({
			required_error: "Country is required.",
			invalid_type_error: "Countrty must not have a number.",
		})
		.regex(/^[a-zA-Z]+/, {
			message: "Must not contain any numerals.",
		}),
	check_in_out: z.custom<[string, string]>().refine((val) => val[0] < val[1], {
		message: "Check in must be before the Check out date.",
	}),
	visitor_type: z.enum(["Pre-registered", "Walk-In"]),
	status: z.enum(["Approved", "In Progress", "Declined"]),
	purpose: z.string({
		required_error: "Purpose is required.",
	}),
});

export interface CompanionDetailsInterfaceZod {
	first_name: string;
	middle_name?: string;
	last_name: string;
	email: string;
	mobile: string;
	house?: string;
	street?: string;
	barangay: string;
	city: string;
	province: string;
	country: string;
	check_in_out: [string, string];
}

export const CompanionDetailZod: ZodType<CompanionDetailsInterfaceZod> =
	z.object({
		first_name: z
			.string({
				required_error: "First Name is required.",
				invalid_type_error: "First Name must not have number.",
			})
			.regex(/^[a-zA-Z]+/, {
				message: "Must not be empty or contain any numerals.",
			}),
		middle_name: z
			.string({
				required_error: "Middle Name is required.",
				invalid_type_error: "Middle Name must not have number.",
			})
			.regex(/^[a-zA-Z]+/, {
				message: "Must not contain any numerals.",
			})
			.optional(),
		last_name: z
			.string({
				required_error: "Last Name is required.",
				invalid_type_error: "Last Name must not have numbe.r",
			})
			.regex(/^[a-zA-Z]+/, {
				message: "Must not be empty or contain any numerals.",
			}),

		email: z.string().email({ message: "Invalid email address." }),
		mobile: z.coerce
			.string({
				required_error: "Mobile Number is required.",
				invalid_type_error: "Mobile Number must not have a letter or symbol.",
			})
			.regex(/^[0-9\-+\b]*$/, {
				message: "Mobile number must not include non-numerals.",
			}),

		house: z.string().optional(),
		street: z.string().optional(),
		barangay: z
			.string({
				required_error: "Barangay is required.",
				invalid_type_error: "Barangay must not have a number.",
			})
			.regex(/^[a-zA-Z]+/, {
				message: "Must not contain any numerals.",
			}),
		city: z
			.string({
				required_error: "City is required.",
				invalid_type_error: "City must not have a number.",
			})
			.regex(/^[a-zA-Z]+/, {
				message: "Must not contain any numerals.",
			}),
		province: z
			.string({
				required_error: "Province is required.",
				invalid_type_error: "Province must not have a number.",
			})
			.regex(/^[a-zA-Z]+/, {
				message: "Must not contain any numerals.",
			}),
		country: z
			.string({
				required_error: "Country is required.",
				invalid_type_error: "Countrty must not have a number.",
			})
			.regex(/^[a-zA-Z]+/, {
				message: "Must not contain any numerals.",
			}),
		check_in_out: z
			.custom<[string, string]>()
			.refine((val) => val[0] < val[1], {
				message: "Check in must be before the Check out date.",
			}),
	});

export interface UserDetailsInterfaceZod {
	first_name: string;
	middle_name?: string;
	last_name: string;
	username: string;
	password: string;
	email: string;
	phone: string;
	role: string;
}

export const UserDetailsZod: ZodType<UserDetailsInterfaceZod> = z.object({
	first_name: z
		.string({
			required_error: "First Name is required.",
			invalid_type_error: "First Name must not have number.",
		})
		.regex(/^[a-zA-Z]+/, {
			message: "Must not be empty or contain any numerals.",
		})
		.min(1, { message: "Please enter a first name." }),
	middle_name: z
		.string({
			required_error: "Middle Name is required.",
			invalid_type_error: "Middle Name must not have number.",
		})
		.regex(/^[a-zA-Z]+/, {
			message: "Must not contain any numerals.",
		})
		.min(1, { message: "Please enter a middle name." })
		.optional(),
	last_name: z
		.string({
			required_error: "Last Name is required.",
			invalid_type_error: "Last Name must not have number.",
		})
		.regex(/^[a-zA-Z]+/, {
			message: "Must not be empty or contain any numerals.",
		})
		.min(1, { message: "Please enter a last name." }),
	username: z
		.string({
			required_error: "Username is required.",
			invalid_type_error: "Username must not have number.",
		})
		.min(1, { message: "Please enter a desired username." }),
	password: z
		.string({
			required_error: "Password is required.",
			invalid_type_error: "Password must not have number.",
		})
		.min(1, { message: "Please enter a desired password." }),
	email: z
		.string()
		.email({ message: "Invalid email address." })
		.min(1, { message: "Please enter an email." }),
	phone: z.coerce
		.string({
			required_error: "Mobile Number is required.",
			invalid_type_error: "Mobile Number must not have a letter or symbol.",
		})
		.regex(/^[0-9\-+\b]*$/, { message: "Only numeric values allowed." })
		.min(1, { message: "Please enter a phone number." }),
	role: z.enum(["admin", "security"]),
});
