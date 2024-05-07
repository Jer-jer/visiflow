import { ZodType, z } from "zod";

export type StepOneData = {
	visitorNo: number;
	plateNum?: string | null;
	checkInOut: [Date, Date];
	what: string[];
	when: Date;
	where: string[];
	who: string[];
	termsConditions: boolean;
};

export const StepOneZod: ZodType<StepOneData> = z.object({
	visitorNo: z
		.number({
			required_error: "Visitor must be at least 1.",
		})
		.min(1, { message: "Must be 1 or more visitor" }),
	plateNum: z.string().nullable().optional(),
	checkInOut: z
		.custom<[Date, Date]>()
		.refine((val) => val[0].getTime() < val[1].getTime(), {
			message: "Time in must be before the Time out date.",
		}),
	what: z
		.string({
			required_error: '"What" is required.',
		})
		.array()
		.nonempty({
			message: '"What" is required.',
		}),
	when: z
		.date({
			required_error: "Please select a date and time",
			invalid_type_error: "That's not a date.",
		})
		.min(new Date(), { message: "Choosen date is in the past." }),
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
	termsConditions: z.literal(true, {
		errorMap: (issue, _ctx) => {
			switch (issue.code) {
				default:
					return { message: "This must be checked" };
			}
		},
	}),
});

export type StepOneRecurringData = {
	visitorNo?: number;
	plateNum?: string | null;
	checkInOut: [Date, Date];
	what: string[];
	when: Date;
	where: string[];
	who: string[];
	termsConditions: boolean;
};

export const StepOneRecurringZod: ZodType<StepOneRecurringData> = z.object({
	visitorNo: z
		.number()
		.min(0, { message: "Companions should either be none or more" })
		.default(0),
	plateNum: z.string().nullable().optional(),
	checkInOut: z
		.custom<[Date, Date]>()
		.refine((val) => val[0].getTime() < val[1].getTime(), {
			message: "Time in must be before the Time out date.",
		}),
	what: z
		.string({
			required_error: '"What" is required.',
		})
		.array()
		.nonempty({
			message: '"What" is required.',
		}),
	when: z
		.date({
			required_error: "Please select a date and time",
			invalid_type_error: "That's not a date.",
		})
		.min(new Date(), { message: "Choosen date is in the past." }),
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
	termsConditions: z.literal(true, {
		errorMap: (issue, _ctx) => {
			switch (issue.code) {
				default:
					return { message: "This must be checked" };
			}
		},
	}),
});

export type StepTwoData = {
	firstName: string;
	middleName?: string;
	lastName: string;
	email: string;
	mobile: string;
	house?: string;
	street?: string;
	brgy: string;
	city: string;
	province: string;
	country: string;
	front: string;
	back: string;
	selfie: string;
};

export const StepTwoZod: ZodType<StepTwoData> = z.object({
	firstName: z
		.string({
			required_error: "First Name is required.",
			invalid_type_error: "First Name must not have number.",
		})
		.regex(/^[a-zA-Z]+/, {
			message: "First Name not be empty or contain any numerals.",
		}),
	middleName: z
		.string({
			required_error: "Middle Name is required.",
			invalid_type_error: "Middle Name must not have number.",
		})
		.regex(/^[a-zA-Z]*$|\b/, {
			message: "Middle Name not contain any numerals.",
		})
		.optional(),
	lastName: z
		.string({
			required_error: "Last Name is required.",
			invalid_type_error: "Last Name must not have number.",
		})
		.regex(/^[a-zA-Z]+/, {
			message: "Last Name not be empty or contain any numerals.",
		}),

	email: z
		.string()
		.email({ message: "Invalid email address." })
		.min(1, { message: "Please enter an email." }),
	mobile: z.coerce
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
	brgy: z
		.string({
			required_error: "Barangay is required.",
			invalid_type_error: "Barangay must not have a number.",
		})
		.min(1, { message: "Barangay is required." }),
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
			invalid_type_error: "Country must not have a number.",
		})
		.regex(/^[a-zA-Z]+/, {
			message: "Country must not be empty or contain any numerals.",
		}),
	front: z
		.string({
			required_error: "Front of ID is required.",
			invalid_type_error: "Front of ID must not have a number.",
		})
		.min(1, "Front of ID is required."),
	back: z
		.string({
			required_error: "Back of ID is required.",
			invalid_type_error: "Back of ID must not have a number.",
		})
		.min(1, "Back of ID is required."),
	selfie: z
		.string({
			required_error: "Selfie with your ID is required.",
			invalid_type_error: "Selfie with your ID must not have a number.",
		})
		.min(1, "Selfie with your ID is required."),
});

export type StepTwoRecurringData = {
	firstName: string;
	middleName?: string;
	lastName: string;
	email: string;
	mobile: string;
	house?: string;
	street?: string;
	brgy: string;
	city: string;
	province: string;
	country: string;
	front: string;
	back: string;
	selfie: string;
};

//TODO Test New and Recurring Visitor Using New Phone Number
export const StepTwoRecurringZod: ZodType<StepTwoRecurringData> = z.object({
	firstName: z
		.string({
			required_error: "First Name is required.",
			invalid_type_error: "First Name must not have number.",
		})
		.regex(/^[a-zA-Z]+/, {
			message: "First Name not be empty or contain any numerals.",
		}),
	middleName: z
		.string({
			required_error: "Middle Name is required.",
			invalid_type_error: "Middle Name must not have number.",
		})
		.regex(/^[a-zA-Z]*$|\b/, {
			message: "Middle Name not contain any numerals.",
		})
		.optional(),
	lastName: z
		.string({
			required_error: "Last Name is required.",
			invalid_type_error: "Last Name must not have number.",
		})
		.regex(/^[a-zA-Z]+/, {
			message: "Last Name not be empty or contain any numerals.",
		}),

	email: z
		.string()
		.email({ message: "Invalid email address." })
		.min(1, { message: "Please enter an email." }),
	mobile: z.coerce
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
	brgy: z.coerce
		.string({
			required_error: "Barangay is required.",
			invalid_type_error: "Barangay must not have number.",
		})
		.min(1),
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
			invalid_type_error: "Country must not have a number.",
		})
		.regex(/^[a-zA-Z]+/, {
			message: "Country must not be empty or contain any numerals.",
		}),
	front: z
		.string({
			required_error: "Front of ID is required.",
			invalid_type_error: "Front of ID must not have a number.",
		})
		.min(1, "Front of ID is required."),
	back: z
		.string({
			required_error: "Back of ID is required.",
			invalid_type_error: "Back of ID must not have a number.",
		})
		.min(1, "Back of ID is required."),
	selfie: z
		.string({
			required_error: "Selfie with your ID is required.",
			invalid_type_error: "Selfie with your ID must not have a number.",
		})
		.min(1, "Selfie with your ID is required."),
});
