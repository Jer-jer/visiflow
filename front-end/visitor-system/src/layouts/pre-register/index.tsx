import React, { useState } from "react";

// Components
import { Button } from "antd";
import NewVisitor from "../../components/new-visitor";
import RecurringVisitor from "../../components/recurring-visitor";

// Styles
import "./styles.scss";

export default function PreRegister() {
	const [isNew, setIsNew] = useState(false);
	const [isRecurring, setIsRecurring] = useState(false);

	const isNewOrRecurring = (newVisitor: boolean, recurringVisitor: boolean) => {
		setIsNew(newVisitor);
		setIsRecurring(recurringVisitor);
	};

	return (
		<div className="h-screen">
			{!isNew && !isRecurring && (
				<div className="mb-[50px] flex w-full flex-col items-center justify-start gap-y-12 pt-20 md:mb-0">
					<span className="text-center text-3xl font-semibold uppercase">
						Are you new here?
					</span>
					<div className="flex flex-col gap-y-8 md:flex-row md:gap-x-8">
						<div className="h-[40vh] w-full overflow-hidden rounded-lg hover:rounded-lg md:w-[30vw]">
							<Button
								className="new-photo flex h-[40vh] w-full items-center justify-center text-3xl uppercase md:w-[30vw] "
								onClick={(e) => isNewOrRecurring(true, false)}
							>
								<span className="relative z-50 text-white">New Visitor</span>
							</Button>
						</div>
						<div className="h-[40vh] w-full overflow-hidden rounded-lg hover:rounded-lg md:w-[30vw]">
							<Button
								className="recurring-photo flex h-[40vh] w-full items-center justify-center text-3xl uppercase md:w-[30vw] "
								onClick={(e) => isNewOrRecurring(false, true)}
							>
								<span className="relative z-50 text-white">
									Recurring Visitor
								</span>
							</Button>
						</div>
					</div>
				</div>
			)}
			{isRecurring && <RecurringVisitor />}
			{isNew && <NewVisitor />}
		</div>
	);
}
