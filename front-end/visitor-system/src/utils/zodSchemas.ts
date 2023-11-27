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

type VisitorValData = {
	visitorNo?: number;
	poi: string;
	checkInOut: [string, string];
	termsConditions: boolean;

	firstName: string;
	middleName: string;
	lastName: string;
	email: string;
	mobile: string;
	house: string;
	street: string;
	barangay: string;
	city: string;
	province: string;
	country: string;
};

// const VisitorDataZod = z.object({
// 	firstName: z.string({
// 		required_error: "First Name is required.",
// 		invalid_type_error: "First Name must not have number.",
// 	}),
// 	middleName: z
// 		.string({
// 			required_error: "Middle Name is required.",
// 			invalid_type_error: "Middle Name must not have number.",
// 		})
// 		.max(1),
// 	lastname: z.string({
// 		required_error: "Last Name is required.",
// 		invalid_type_error: "Last Name must not have numbe.r",
// 	}),

// 	email: z.string().email({ message: "Invalid email address." }),
// 	mobile: z.coerce.string().regex(/^-?\d*(\.\d*)?$/),

// 	house: z.string(),
// 	street: z.string(),
// 	barangay: z.string(),
// 	city: z.string(),
// 	province: z.string(),
// 	country: z.string(),
// });

export const StepOneZod: ZodType<StepOneData> = z.object({
	visitorNo: z
		.number({
			required_error: "Visitor must be at least 1.",
		})
		.min(1, { message: "Must be 1 or more visitor" }),
	poi: z.string(), // Person of Interest
	checkInOut: z.custom<[string, string]>(),
	purpose: z.string(),
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
	firstName: z.string({
		required_error: "First Name is required.",
		invalid_type_error: "First Name must not have number.",
	}),
	middleName: z
		.string({
			required_error: "Middle Name is required.",
			invalid_type_error: "Middle Name must not have number.",
		})
		.optional(),
	lastName: z.string({
		required_error: "Last Name is required.",
		invalid_type_error: "Last Name must not have numbe.r",
	}),

	email: z
		.string({
			required_error: "Email Address is required.",
			invalid_type_error: "Email Address must not have number.",
		})
		.email({ message: "Invalid email address." }),
	mobile: z.coerce
		.string({
			required_error: "Mobile Number is required.",
			invalid_type_error: "Mobile Number must not have a letter or symbol.",
		})
		.regex(/^-?\d*(\.\d*)?$/),

	house: z.string().optional(),
	street: z.string().optional(),
	barangay: z.string({
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
	country: z.string({
		required_error: "Country is required.",
		invalid_type_error: "Countrty must not have a number.",
	}),
});

export const VisitorZod: ZodType<VisitorValData> = z.object({
	visitorNo: z
		.number({
			required_error: "Visitor must be at least 1.",
		})
		.min(1)
		.default(1),
	poi: z.string(), // Person of Interest
	// checkInOut: z.string().array(),
	checkInOut: z.custom<[string, string]>(),
	purpose: z.string(),
	termsConditions: z.boolean(),

	// data: VisitorDataZod.array(),
	firstName: z.string({
		required_error: "First Name is required.",
		invalid_type_error: "First Name must not have number.",
	}),
	middleName: z
		.string({
			required_error: "Middle Name is required.",
			invalid_type_error: "Middle Name must not have number.",
		})
		.max(1),
	lastName: z.string({
		required_error: "Last Name is required.",
		invalid_type_error: "Last Name must not have numbe.r",
	}),

	email: z.string().email({ message: "Invalid email address." }),
	mobile: z.coerce.string().regex(/^-?\d*(\.\d*)?$/),

	house: z.string(),
	street: z.string(),
	barangay: z.string(),
	city: z.string(),
	province: z.string(),
	country: z.string(),
});
