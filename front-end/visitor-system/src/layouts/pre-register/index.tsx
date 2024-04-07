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
		<>
			{!isNew && !isRecurring && (
				<div className="flex h-full items-center justify-center gap-5">
					<Button
						type="primary"
						className="w-[inherit] bg-primary-500"
						onClick={(e) => isNewOrRecurring(true, false)}
					>
						New Visitor
					</Button>
					<Button
						type="primary"
						className="w-[inherit] bg-primary-500"
						onClick={(e) => isNewOrRecurring(false, true)}
					>
						Recurring Visitor
					</Button>
				</div>
			)}
			{isRecurring && <RecurringVisitor />}
			{isNew && <NewVisitor />}
		</>
	);
}
