export interface Tenant {
	id: number;
	name: string;
	description: string;
	active: boolean;
	createdAt: string;
	updatedAt: string;
	createdBy: string;
	updatedBy: string;
}

export interface CreateTenant {
	name: string;
	description: string;
	active: boolean;
}
