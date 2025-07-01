import TableList from "@/Features/Components/TableList/TableList";
import type { Dataset } from "@/Services/dataset/dataset.types";
import type { Tenant } from "@/Services/tenant/tenant.types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { paths } from "@/App/Routes/Paths";
import { getDatasetsForTenant } from "@/Services/tenant/tenantService";

interface TenantUsersProps {
  tenant: Tenant;
}

export default function TenantDatasets({ tenant }: TenantUsersProps) {
  const navigate = useNavigate();
  const [tenantDatasets, setTenantDatasets] = useState<Dataset[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchTenantDatasets = async () => {
      try {
        const data = await getDatasetsForTenant(tenant._id.toString());
        setTenantDatasets(data);
      } catch {
        toast.error("Failed to load tenant datasets!");
      }
  };

  useEffect(() => {
    fetchTenantDatasets();
  }, []);

  const handleAddTenantDataset = () => {
    console.log('CALLING . . . . . . handleAddTenantDataset clicked');
    navigate(paths.datasets.root);
  }

  const mappedTenantUsersList = tenantDatasets.map((tenantDataset) => ({
    id: tenantDataset._id,
    name: tenantDataset.name,
    owner: tenantDataset.isOwner,
  }));

  return (
      <div className="flex flex-col bg-gray-50 dark:bg-gray-900 p-4 min-h-0">
        <div className="flex-1 overflow-hidden">
          <TableList
						data={mappedTenantUsersList}
						headers={[
							"id",
							"name",
							"owner",
						]}
						currentPage={currentPage}
						itemsPerPage={10}
						onPageChange={(page) => setCurrentPage(page)}
						showHeaderTitle={false}
            headerTitle="Tenant Datasets"
						showHeaderSearch={true}
						showActionInEllipses={false}
						showSNo={true}
						showActions={false}
            headerButtonText="Add Dataset"
            onHeaderButtonClick={() => handleAddTenantDataset()}
					/>
        </div>
      </div>
  );
}