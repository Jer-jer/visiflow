export enum VisitorStatus {
	Approved = "Approved",
	InProgress = "In Progress",
	Declined = "Declined",
}

export enum VisitorType {
	PreRegistered = "Pre-Registered",
	WalkIn = "Walk-In",
}

export enum UserRole {
	Admin = "admin",
	Security = "security",
}

export enum NotificationType {
	TimeIn = "time-in",
	TimeOut = "time-out",
	Confirmation = "confirmation",
	Pending = "pending",
	Declined = "declined",
}

export enum UserActionLogType {
	TimeIn = "time_in",
	TimeOut = "time_out",
	AddVisitor = "add_visitor",
	UpdateVisitor = "update_visitor",
	DeleteVisitor = "delete_visitor",
	ApproveStatus = "approve_status",
	DeclineStatus = "decline_status",
	AddUser = "add_user",
	UpdateUser = "update_user",
	DeleteUser = "delete_user",
	LogIn = "log_in",
	Logout = "log_out",
	GenerateBadge = "generate_badge",
}
