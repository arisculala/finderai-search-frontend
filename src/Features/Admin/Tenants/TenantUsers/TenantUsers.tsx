import TableList from "@/Features/Components/TableList/TableList";
import type { Tenant } from "@/Services/tenant/tenant.types";
import { getTenantUsers, removeTenantFromUsers } from "@/Services/tenant/tenantService";
import type { User } from "@/Services/user/user.types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AddTenantUserModal from "./AddTenantUserModal";
import ContentModal from "@/Features/Components/ContentModal/ContentModal";

interface TenantUsersProps {
  tenant: Tenant;
}

export default function TenantUsers({ tenant }: TenantUsersProps) {
  const [tenantUsers, setTenantUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddTenantModalOpen, setIsAddTenantModalOpen] = useState(false);

  const fetchTenantUsers = async () => {
      try {
        const data = await getTenantUsers(tenant._id.toString());
        setTenantUsers(data);
      } catch {
        toast.error("Failed to load tenant users!");
      }
  };

  useEffect(() => {
    fetchTenantUsers();
  }, []);

  const handleAddNewTenantUser = () => {
    setIsAddTenantModalOpen(true);
  }

  const handleRemoveTenantUser = async (tenantUser: User) => {
    try {
      await removeTenantFromUsers(tenant._id.toString(), [tenantUser._id.toString()]);
      toast.success('Successfully remove tenant from user.');
      fetchTenantUsers();
    } catch (e) {
      console.error('Failed to remove tenant from user.', e);
      toast.error('Failed to add tenant user(s).');
    }
  };

  const mappedTenantUsersList = tenantUsers.map((tenantUser) => ({
    id: tenantUser._id,
    name: tenantUser.firstName + " " + tenantUser.lastName,
    status: tenantUser.active ? "Active" : "Inactive",
    actions: [
      {
        label: "Remove",
        onClick: () => handleRemoveTenantUser(tenantUser),
      },
    ],
  }));

  return (
      <div className="flex flex-col bg-gray-50 dark:bg-gray-900 p-4 min-h-0">
        <div className="flex-1 overflow-hidden">
          <TableList
						data={mappedTenantUsersList}
						headers={[
							"id",
							"name",
							"status",
						]}
						currentPage={currentPage}
						itemsPerPage={10}
						onPageChange={(page) => setCurrentPage(page)}
						showHeaderTitle={false}
            headerTitle="List of Users"
						showHeaderSearch={true}
						showActionInEllipses={true}
						showSNo={true}
						showActions={true}
            headerButtonText="Add User"
            onHeaderButtonClick={() => handleAddNewTenantUser()}
					/>
        </div>

        <ContentModal
          open={isAddTenantModalOpen}
          onClose={() => setIsAddTenantModalOpen(false)}
          title="Add User"
          confirmText="Add"
          cancelText="Cancel"
          hideFooter={true}
          hideTitle={true}
        >
          <AddTenantUserModal onCancel={() => setIsAddTenantModalOpen(false)} onSuccess={fetchTenantUsers} tenant={tenant} />
        </ContentModal>

      </div>
  );
}