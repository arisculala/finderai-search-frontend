import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import MainContent from "../Structural/MainContent/MainContent";
import Navbar from "../Structural/Navbar/Navbar";
import Sidebar from "../Structural/Sidebar/Sidebar";
import { BREADCRUMBS } from "@/App/Consts";
import { getTenants, createTenant } from "@/Services/tenant/tenantService";
import type { Tenant } from "@/Services/tenant/tenant.types";
import TableList from "../../Components/TableList/TableList";
import ConfirmationModal from "../../Components/ConfirmationModal/ConfirmationModal";
import Breadcrumbs from "@/Features/Components/BreadCrumbs/BreadCrumbs";
import ContentModal from "@/Features/Components/ContentModal/ContentModal";
import AddTenantForm from "./AddTenantForm";

export default function TenantsDashboard() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isTenantDeleteModalOpen, setIsTenantDeleteModalOpen] = useState(false);
  const [tenantToDelete, setTenantToDelete] = useState<Tenant | null>(null);
  const [isAddTenantModalOpen, setIsAddTenantModalOpen] = useState(false);

  const handleAddNewTenant = () => {
    setIsAddTenantModalOpen(true);
  };

  const handleSaveNewTenant = async (tenant: { name: string; description: string; active: boolean }) => {
    console.log('Tenant submitted:', tenant);
    try {
      const savedTenant = await createTenant(tenant);
      console.log('Tenant save:', savedTenant);

      setTenants(prevTenants => [savedTenant, ...prevTenants]);

      toast.success(`Tenant "${savedTenant.name}" added successfully!`);
      setIsAddTenantModalOpen(false);
    } catch {
      toast.error("Failed to add tenant.");
    }
  };

  const handleOpenTenantDeleteModal = (tenant: Tenant) => {
    setTenantToDelete(tenant);
    setIsTenantDeleteModalOpen(true);
  };

  const confirmTenantDelete = () => {
    if (tenantToDelete) {
      setTenants(prev => prev.filter(b => b.id !== tenantToDelete.id));
      toast.success(`Deleted tenant "${tenantToDelete.name}"`);
      setTenantToDelete(null);
    }
    setIsTenantDeleteModalOpen(false);
  };

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const data = await getTenants();
        setTenants(data);
      } catch {
        toast.error("Failed to load tenants!");
      }
    };

    fetchTenants();
  }, []);

  const mappedTenantList = tenants.map((tenant) => ({
    id: tenant.id,
    name: tenant.name,
    description: tenant.description,
    status: tenant.active ? "Active" : "Inactive",
    created: new Date(tenant.createdAt).toLocaleDateString(),
    createdBy: tenant.createdBy,
    updated: new Date(tenant.updatedAt).toLocaleDateString(),
    updatedBy: tenant.updatedBy,
    actions: [
      {
        label: "Edit",
        onClick: () => console.log("Edit clicked", tenant.id),
      },
      {
        label: "Delete",
        onClick: () => handleOpenTenantDeleteModal(tenant),
      },
    ],
  }));

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />
        <Breadcrumbs breadcrumbs={BREADCRUMBS.TENANTS} />
        <MainContent>
          <TableList
						data={mappedTenantList}
						headers={[
							"id",
							"name",
							"description",
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
            headerTitle="List of Tenants"
						showHeaderSearch={true}
						showActionInEllipses={true}
						showSNo={true}
						showActions={true}
            headerButtonText="Add Tenant"
            onHeaderButtonClick={() => handleAddNewTenant()}
					/>
        </MainContent>
      </div>

      <ConfirmationModal
          open={isTenantDeleteModalOpen}
          onClose={() => setIsTenantDeleteModalOpen(false)}
          onConfirm={confirmTenantDelete}
          title="Delete Tenant"
          message={`Are you sure you want to delete the tenant "${tenantToDelete?.name}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
        />

      <ContentModal
        open={isAddTenantModalOpen}
        onClose={() => setIsAddTenantModalOpen(false)}
        onConfirm={handleSaveNewTenant}
        title="Add New Tenant"
        confirmText="Save"
        cancelText="Cancel"
        hideFooter={true}
        hideTitle={true}
      >
        <AddTenantForm onSubmit={handleSaveNewTenant} onCancel={() => setIsAddTenantModalOpen(false)} />
      </ContentModal>

    </div>
  );
}
