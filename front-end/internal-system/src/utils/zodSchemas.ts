/*
	?	USED FOR DATA VALIDATION
*/
import { z, ZodType } from "zod";
import { VisitorStatus, VisitorType } from "./enums";

export interface LoginInterfaceZod {
	username: string;
	password: string;
}


export const LoginZod: ZodType<LoginInterfaceZod> = z.object({
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
});

export interface WalkInFormInterfaceZod {
	first_name: string;
	middle_name?: string;
	last_name: string;
	email?: string;
	phone: string;
	house?: string;
	street?: string;
	city: string;
	brgy: string;
	province: string;
	country: string;
	plate_num?: string | null;
	what: string[];
	where: string[];
	who: string[];
	expected_time_out: Date;
}

export const WalkInFormZod: ZodType<WalkInFormInterfaceZod> = z.object({
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
		.regex(/^[a-zA-Z]*$|\b/, {
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

	email: z.string().email({ message: "Invalid email address." }).optional(),

	phone: z.coerce
		.string({
			required_error: "Mobile Number is required.",
			invalid_type_error: "Mobile Number must not have a letter or symbol.",
		})
		.regex(/^[0-9\-+\b]*$/, {
			message: "Mobile number must not include non-numerals.",
		}),

	house: z.string().optional(),

	street: z.string().optional(),

	brgy: z.string({
		required_error: "Barangay is required.",
		invalid_type_error: "Barangay must not have a number.",
	}),

	city: z.string({
		required_error: "City is required.",
		invalid_type_error: "City must not have a number.",
	}),

	province: z.string({
		required_error: "Province is required.",
		invalid_type_error: "Province must not have a number.",
	}),

	country: z
		.string({
			required_error: "Country is required.",
			invalid_type_error: "Countrty must not have a number.",
		})
		.regex(/^[a-zA-Z]+/, {
			message: "Must not contain any numerals.",
		}),

	expected_time_out: z.date({
		required_error: "Please select a date and time",
		invalid_type_error: "That's not a date.",
	}),

	plate_num: z.string().optional().nullable(),

	what: z
		.string({
			required_error: '"What" is required.',
		})
		.array()
		.nonempty({
			message: '"What" is required.',
		}),

	where: z
		.string({
			required_error: '"Where" is required.',
		})
		.array()
		.nonempty({
			message: '"Where" is required.',
		}),

	who: z
		.string({
			required_error: '"Who" is required.',
		})
		.array()
		.nonempty({
			message: '"Who" is required.',
		}),
});

export interface VisitorDetailsInterfaceZod {
	first_name: string;
	middle_name?: string;
	last_name: string;
	email: string;
	phone: string;
	house?: string;
	street?: string;
	brgy: string;
	city: string;
	province: string;
	country: string;
	check_in_out: [string, string];
	plate_num?: string | null;
	visitor_type: VisitorType;
	status: VisitorStatus;
	what: string[];
	when: Date;
	where: string[];
	who: string[];
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
		.regex(/^[a-zA-Z]*$|\b/, {
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
	phone: z.coerce
		.string({
			required_error: "Mobile Number is required.",
			invalid_type_error: "Mobile Number must not have a letter or symbol.",
		})
		.regex(/^[0-9\-+\b]*$/, {
			message: "Mobile number must not include non-numerals.",
		}),

	house: z.string().optional(),
	street: z.string().optional(),
	brgy: z.string({
		required_error: "Barangay is required.",
		invalid_type_error: "Barangay must not have a number.",
	}),
	city: z.string({
		required_error: "City is required.",
		invalid_type_error: "City must not have a number.",
	}),
	province: z.string({
		required_error: "Province is required.",
		invalid_type_error: "Province must not have a number.",
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
	plate_num: z.string().optional().nullable(),
	visitor_type: z.nativeEnum(VisitorType),
	status: z.nativeEnum(VisitorStatus),
	what: z
		.string({
			required_error: '"What" is required.',
		})
		.array()
		.nonempty({
			message: '"What" is required.',
		}),
	when: z.date({
		required_error: "Please select a date and time",
		invalid_type_error: "That's not a date.",
	}),
	where: z
		.string({
			required_error: '"Where" is required.',
		})
		.array()
		.nonempty({
			message: '"Where" is required.',
		}),
	who: z
		.string({
			required_error: '"Who" is required.',
		})
		.array()
		.nonempty({
			message: '"Who" is required.',
		}),
});

export interface CompanionDetailsInterfaceZod {
	first_name: string;
	middle_name?: string;
	last_name: string;
	email: string;
	phone: string;
	house?: string;
	street?: string;
	brgy: string;
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
			.regex(/^[a-zA-Z]*$|\b/, {
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
		phone: z.coerce
			.string({
				required_error: "Mobile Number is required.",
				invalid_type_error: "Mobile Number must not have a letter or symbol.",
			})
			.regex(/^[0-9\-+\b]*$/, {
				message: "Mobile number must not include non-numerals.",
			}),

		house: z.string().optional(),
		street: z.string().optional(),
		brgy: z
			.string({
				required_error: "Barangay is required.",
				invalid_type_error: "Barangay must not have a number.",
			}),
		city: z
			.string({
				required_error: "City is required.",
				invalid_type_error: "City must not have a number.",
			}),
		province: z
			.string({
				required_error: "Province is required.",
				invalid_type_error: "Province must not have a number.",
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
			invalid_type_error: "Middle Name must not have number.",
		})
		.regex(/^[a-zA-Z\s]*$/, {
			message: "Must not contain any numerals.",
		})
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
		.min(1, { message: "Please enter an email." })
		.refine((data) => data !== "mail@mail.com", {
			message: "Your email must not be mail@mail.com",
		}),
	phone: z.coerce
		.string({
			required_error: "Mobile Number is required.",
			invalid_type_error: "Mobile Number must not have a letter or symbol.",
		})
		.regex(/([0-9\-+\b])\w+/, { message: "Only numeric values allowed." })
		.min(1, { message: "Please enter a phone number." }),
	role: z.enum(["admin", "security"]),
});

export interface EmployeesZod {
	name: string;
	email: string;
	contact: string;
}
//zod error checking display for employees
export const EmployeeDetailsZod: ZodType<EmployeesZod> = z.object({
	name: z
		.string({
			required_error: "Full Name is required.",
			invalid_type_error: "Full Name must not have number.",
		})
		.min(2, { message: "Please enter a full name." })
		.regex(/^[a-zA-Z]+/, {
			message: "Must not be empty or contain any numerals.",
		}),
		
	email: z
		.string(
		)
		.min(1, { message: "Please enter an email." })
		.email({ message: "Invalid email address." })
		.refine((data) => data !== "mail@mail.com", {
			message: "Your email must not be mail@mail.com",
		}),
	contact: z.coerce
		.string({
			required_error: "Mobile Number is required.",
			invalid_type_error: "Mobile Number must not have a letter or symbol.",
		})
		.min(1, { message: "Please enter a phone number." })
		.regex(/([0-9\-+\b])\w+/, { message: "Only numeric values allowed."}),
});