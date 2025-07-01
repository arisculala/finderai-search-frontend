import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import MainContent from "../Structural/MainContent/MainContent";
import Navbar from "../Structural/Navbar/Navbar";
import Sidebar from "../Structural/Sidebar/Sidebar";
import { BREADCRUMBS } from "@/App/Consts";
import { getTenants, updateTenantActive } from "@/Services/tenant/tenantService";
import type { Tenant } from "@/Services/tenant/tenant.types";
import TableList from "../../Components/TableList/TableList";
import ConfirmationModal from "../../Components/ConfirmationModal/ConfirmationModal";
import Breadcrumbs from "@/Features/Components/BreadCrumbs/BreadCrumbs";
import ContentModal from "@/Features/Components/ContentModal/ContentModal";
import NewTenantFormModal from "./NewTenantFormModal";
import { useNavigate } from "react-router-dom";
import { paths } from "@/App/Routes/Paths";

export default function TenantsDashboard() {
  const navigate = useNavigate();
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSetActiveInactiveModalOpen, setIsSetActiveInactiveModalOpen] = useState(false);
  const [tenantToSetActiveInactive, setTenantToSetActiveInactive] = useState<Tenant | null>(null);
  const [isNewTenantModalOpen, setIsNewTenantModalOpen] = useState(false);

  const handleAddNewTenant = () => {
    setIsNewTenantModalOpen(true);
  };

  const handleSetActiveInactiveModal = (tenant: Tenant) => {
    setTenantToSetActiveInactive(tenant);
    setIsSetActiveInactiveModalOpen(true);
  };

  const confirmTenantSetActiveInactive = async () => {
    if (tenantToSetActiveInactive) {
      const newActiveStatus = !tenantToSetActiveInactive.active;
      await updateTenantActive(tenantToSetActiveInactive._id, newActiveStatus);
      toast.success(`Successfully ${newActiveStatus ? "activated" : "deactivated"} tenant "${tenantToSetActiveInactive.name}"`);
      setTenantToSetActiveInactive(null);
      fetchTenants();
    }
    setIsSetActiveInactiveModalOpen(false);
  };

  const fetchTenants = async () => {
      try {
        const data = await getTenants();
        setTenants(data);
      } catch {
        toast.error("Failed to load tenants!");
      }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  const mappedTenantList = tenants.map((tenant) => ({
    id: tenant._id,
    name: tenant.name,
    status: tenant.active ? "Active" : "Inactive",
    created: tenant.createdDate
      ? new Date(tenant.createdDate).toLocaleString()
      : "-",
    createdBy: tenant.createdBy?.username || "-",
    updated: tenant.updatedDate
      ? new Date(tenant.updatedDate).toLocaleString()
      : "-",
    updatedBy: tenant.updatedBy?.username || "-",
    actions: [
      {
        label: "Edit",
        onClick: () => navigate(paths.tenants.details.replace(':id', tenant._id.toString())),
      },
      {
        label: tenant.active ? "Deactivate" : "Activate",
        onClick: () => handleSetActiveInactiveModal(tenant),
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
          open={isSetActiveInactiveModalOpen}
          onClose={() => setIsSetActiveInactiveModalOpen(false)}
          onConfirm={confirmTenantSetActiveInactive}
          title={tenantToSetActiveInactive?.active ? "Deactivate Tenant" : "Activate Tenant"}
          message={`Are you sure you want to ${tenantToSetActiveInactive?.active ? "deactivate" : "activate"} the tenant "${tenantToSetActiveInactive?.name}"? This action cannot be undone.`}
          confirmText={tenantToSetActiveInactive?.active ? "Deactivate" : "Activate"}
          cancelText="Cancel"
        />

      <ContentModal
        open={isNewTenantModalOpen}
        onClose={() => setIsNewTenantModalOpen(false)}
        title="New Tenant"
        confirmText="Save"
        cancelText="Cancel"
        hideFooter={true}
        hideTitle={true}
      >
        <NewTenantFormModal onCancel={() => setIsNewTenantModalOpen(false)} onSuccess={fetchTenants} />
      </ContentModal>

    </div>
  );
}
