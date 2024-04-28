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
	AddAnnouncement = "add_announce",
	UpdateAnnouncement = "update_announce",
	DeleteAnnouncement = "delete_announce",
	AddOffice="add_office",
	UpdateOffice = "update_office",
	DeleteOffice = "delete_office",
	AddEvent = "add_event",
	UpdateEvent = "update_event",
	DeleteEvent = "delete_event",
	AddEmployee = "add_employee",
	UpdateEmployee = "update_employee",
	DeleteEmployee = "delete_employee",
	AddReason = "add_reason",
	UpdateReason = "update_reason",
	DeleteReason = "delete_reason",
	AddBuilding = "add_building",
	UpdateBuilding = "update_building",
	DeleteBuilding = "delete_building",


}
