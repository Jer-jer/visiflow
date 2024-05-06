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
	email?: string | null;
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

	email: z
		.string()
		.regex(/^(?:\S*@\S*\.\S*)?$/, { message: "Invalid Email" })
		.optional(),

	phone: z.coerce
		.string({
			required_error: "Mobile Number is required.",
			invalid_type_error: "Mobile Number must not have a letter or symbol.",
		})
		.regex(
			/^\+((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$/,
			{
				message: "Mobile Number is invalid",
			},
		),

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
		.regex(
			/^\+((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$/,
			{
				message: "Mobile Number is invalid",
			},
		),

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
		//TODO Improve Design
		phone: z.coerce
			.string({
				required_error: "Mobile Number is required.",
				invalid_type_error: "Mobile Number must not have a letter or symbol.",
			})
			.regex(
				/^\+((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$/,
				{
					message: "Mobile Number is invalid",
				},
			),

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
	//TODO Improve Design
	phone: z.coerce
		.string({
			required_error: "Mobile Number is required.",
			invalid_type_error: "Mobile Number must not have a letter or symbol.",
		})
		.regex(
			/^\+((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$/,
			{
				message: "Mobile Number is invalid",
			},
		),
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
		.string()
		.min(1, { message: "Please enter an email." })
		.email({ message: "Invalid email address." })
		.refine((data) => data !== "mail@mail.com", {
			message: "Your email must not be mail@mail.com",
		}),
	//TODO Improve Design
	contact: z.coerce
		.string({
			required_error: "Contact is required.",
			invalid_type_error: "Contact must not have a letter or symbol.",
		})
		.regex(
			/^\+((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$/,
			{
				message: "Contact is invalid",
			},
		),
});

export interface ReasonZod {
	reason: string;
}

export const ReasonDetailsZod: ZodType<ReasonZod> = z.object({
	reason: z
		.string({
			required_error: "Reason is required.",
		})
		.min(2, { message: "Please enter a valid reason." }),
});

export interface BuildingZod {
	name: string;
}

export const BuildingDetailsZod: ZodType<BuildingZod> = z.object({
	name: z
		.string({
			required_error: "Name is required.",
		})
		.min(2, { message: "Please enter a valid name." }),
});

export interface AnnouncementZod {
	title: string;
	message: string;
}

export const AnnouncementDetailsZod: ZodType<AnnouncementZod> = z.object({
	title: z
		.string({
			required_error: "Title is required.",
		})
		.min(2, { message: "Please enter a valid title." }),
	message: z
		.string({
			required_error: "Message is required.",
		})
		.min(2, { message: "Please enter a valid message." }),
});

export interface OfficeZod {
	name: string;
	roomNo: string;
	pic: string;
	contact: string;
	build: string;
	floor: string;
	openTime: Date;
	closeTime: Date;
	imageUrl: string;
}

export const OfficeDetailsZod: ZodType<OfficeZod> = z.object({
	name: z
		.string({
			required_error: "Name is required.",
		})
		.min(2, { message: "Please enter a valid name." }),
	roomNo: z
		.string({
			required_error: "Room No. is required.",
		})
		.min(2, { message: "Please enter a valid room no." }),
	pic: z.string({
		required_error: "Personnel in Charge is required.",
	}),
	//TODO Improve Design
	contact: z.coerce
		.string({
			required_error: "Contact is required.",
			invalid_type_error: "Contact must not have a letter or symbol.",
		})
		.regex(
			/^\+((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$/,
			{
				message: "Contact is invalid",
			},
		),
	build: z.string({
		required_error: "Building is required.",
	}),
	floor: z.string({
		required_error: "Floor No. is required.",
	}),
	openTime: z.date({
		required_error: "Please select an open time",
	}),
	closeTime: z.date({
		required_error: "Please select a close time",
	}),
	imageUrl: z.string({
		required_error: "Image is required.",
	}),
});

export interface EventZod {
	name: string;
	startDate: Date;
	endDate: Date;
	startTime: Date;
	endTime: Date;
	locationId: string;
	description: string;
	imageUrl: string;
}

export const EventDetailsZod: ZodType<EventZod> = z.object({
	name: z
		.string({
			required_error: "Name is required.",
		})
		.min(2, { message: "Please enter a valid name." }),
	startDate: z.date({
		required_error: "Please select a start date.",
	}),
	endDate: z.date({
		required_error: "Please select an end date.",
	}),
	startTime: z.date({
		required_error: "Please select a start time.",
	}),
	endTime: z.date({
		required_error: "Please select an end time.",
	}),
	locationId: z.string({
		required_error: "Location is required.",
	}),
	description: z
		.string({
			required_error: "Description is required.",
		})
		.min(2, { message: "Please enter a valid description." }),
	imageUrl: z.string({
		required_error: "Image is required.",
	}),
});
