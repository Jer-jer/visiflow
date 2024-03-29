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
			message: "Check in must be before the Check out date.",
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
	brgy: z
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
			invalid_type_error: "Country must not have a number.",
		})
		.regex(/^[a-zA-Z]+/, {
			message: "Must not be empty or contain any numerals.",
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
