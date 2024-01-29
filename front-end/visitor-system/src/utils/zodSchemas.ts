import { ZodType, z } from "zod";

export type StepOneData = {
	visitorNo: number;
	poi: string;
	checkInOut: [string, string];
	purpose: string;
	termsConditions: boolean;
};

export type StepTwoData = {
	firstName: string;
	middleName?: string;
	lastName: string;
	email: string;
	mobile: string;
	house?: string;
	street?: string;
	barangay: string;
	city: string;
	province: string;
	country: string;
};

export const StepOneZod: ZodType<StepOneData> = z.object({
	visitorNo: z
		.number({
			required_error: "Visitor must be at least 1.",
		})
		.min(1, { message: "Must be 1 or more visitor" }),
	poi: z.string(), // Person of Interest
	checkInOut: z.custom<[string, string]>().refine((val) => val[0] < val[1], {
		message: "Check in must be before the Check out date.",
	}),
	purpose: z
		.string({
			required_error: "Purpose is required.",
		})
		.min(1, { message: "You must have a purpose." }),
	termsConditions: z.literal(true, {
		errorMap: (issue, _ctx) => {
			switch (issue.code) {
				default:
					return { message: "This must be checked" };
			}
		},
	}),
});

export const StepTwoZod: ZodType<StepTwoData> = z.object({
	firstName: z
		.string({
			required_error: "First Name is required.",
			invalid_type_error: "First Name must not have number.",
		})
		.regex(/^[a-zA-Z]+/, {
			message: "Must not be empty or contain any numerals.",
		}),
	middleName: z
		.string({
			required_error: "Middle Name is required.",
			invalid_type_error: "Middle Name must not have number.",
		})
		.regex(/^[a-zA-Z]*$|\b/, {
			message: "Must not contain any numerals.",
		})
		.optional(),
	lastName: z
		.string({
			required_error: "Last Name is required.",
			invalid_type_error: "Last Name must not have number.",
		})
		.regex(/^[a-zA-Z]+/, {
			message: "Must not be empty or contain any numerals.",
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
		.regex(/([0-9\-+\b])\w+/, { message: "Only numeric values allowed." }),

	house: z.string().optional(),
	street: z.string().optional(),
	barangay: z
		.string({
			required_error: "Barangay is required.",
			invalid_type_error: "Barangay must not have a number.",
		})
		.regex(/^[a-zA-Z]+/, {
			message: "Must not be empty or contain any numerals.",
		}),
	city: z
		.string({
			required_error: "City is required.",
			invalid_type_error: "City must not have a number.",
		})
		.regex(/^[a-zA-Z]+/, {
			message: "Must not be empty or contain any numerals.",
		}),
	province: z
		.string({
			required_error: "Province is required.",
			invalid_type_error: "Province must not have a number.",
		})
		.regex(/^[a-zA-Z]+/, {
			message: "Must not be empty or contain any numerals.",
		}),
	country: z
		.string({
			required_error: "Country is required.",
			invalid_type_error: "Countrty must not have a number.",
		})
		.regex(/^[a-zA-Z]+/, {
			message: "Must not be empty or contain any numerals.",
		}),
});
