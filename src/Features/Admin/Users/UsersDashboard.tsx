import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import MainContent from "../Structural/MainContent/MainContent";
import Navbar from "../Structural/Navbar/Navbar";
import Sidebar from "../Structural/Sidebar/Sidebar";
import { BREADCRUMBS } from "@/App/Consts";
import { getUsers, updateUserActive } from "@/Services/user/userService";
import type { User } from "@/Services/user/user.types";
import TableList from "../../Components/TableList/TableList";
import ConfirmationModal from "../../Components/ConfirmationModal/ConfirmationModal";
import Breadcrumbs from "@/Features/Components/BreadCrumbs/BreadCrumbs";
import ContentModal from "@/Features/Components/ContentModal/ContentModal";
import NewUserFormModal from "./NewUser/NewUserFormModal";

export default function UsersDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSetActiveInactiveModalOpen, setIsSetActiveInactiveModalOpen] = useState(false);
  const [userToSetActiveInactive, setUserToSetActiveInactive] = useState<User | null>(null);
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);

  const handleAddNewUser = () => {
    setIsNewUserModalOpen(true);
  };

  const handleSetActiveInactiveModal = (user: User) => {
    setUserToSetActiveInactive(user);
    setIsSetActiveInactiveModalOpen(true);
  };

  const confirmUserSetActiveInactive = async () => {
    if (userToSetActiveInactive) {
      const newActiveStatus = !userToSetActiveInactive.active;
      await updateUserActive(userToSetActiveInactive._id, newActiveStatus);
      toast.success(`Successfully ${newActiveStatus ? "activated" : "deactivated"} user "${userToSetActiveInactive.firstName} ${userToSetActiveInactive.lastName}"`);
      setUserToSetActiveInactive(null);
      fetchUsers();
    }
    setIsSetActiveInactiveModalOpen(false);
  };

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch {
      toast.error("Failed to load users!");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const mappedUserList = users.map((user) => ({
    id: user._id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    fullName: `${user.firstName} ${user.lastName}`,
    status: user.active ? "Active" : "Inactive",
    created: user.createdDate
      ? new Date(user.createdDate).toLocaleString()
      : "-",
    createdBy: user.createdBy?.username || "-",
    updated: user.updatedDate
      ? new Date(user.updatedDate).toLocaleString()
      : "-",
    updatedBy: user.updatedBy?.username || "-",
    actions: [
      {
        label: "Edit",
        onClick: () => console.log("Edit clicked", user._id),
      },
      {
        label: user.active ? "Deactivate" : "Activate",
        onClick: () => handleSetActiveInactiveModal(user),
      },
    ],
  }));

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
      <Navbar />
        <Breadcrumbs breadcrumbs={BREADCRUMBS.USERS} />
        <MainContent>
          <TableList
						data={mappedUserList}
						headers={[
							"username",
							"email",
							"fullName",
              "status",
              "created",
              "createdBy",
							"updated",
              "updatedBy",
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
            onHeaderButtonClick={() => handleAddNewUser()}
					/>
        </MainContent>
      </div>

      <ConfirmationModal
          open={isSetActiveInactiveModalOpen}
          onClose={() => setIsSetActiveInactiveModalOpen(false)}
          onConfirm={confirmUserSetActiveInactive}
          title={userToSetActiveInactive?.active ? "Deactivate User" : "Activate User"}
          message={`Are you sure you want to ${userToSetActiveInactive?.active ? "deactivate" : "activate"} the user "${userToSetActiveInactive?.firstName} ${userToSetActiveInactive?.lastName}"? This action cannot be undone.`}
          confirmText={userToSetActiveInactive?.active ? "Deactivate" : "Activate"}
          cancelText="Cancel"
        />

      <ContentModal
          open={isNewUserModalOpen}
          onClose={() => setIsNewUserModalOpen(false)}
          title="New User"
          confirmText="Save"
          cancelText="Cancel"
          hideFooter={true}
          hideTitle={true}
        >
          <NewUserFormModal onCancel={() => setIsNewUserModalOpen(false)} onSuccess={fetchUsers} />
        </ContentModal>
    </div>
  );
}
