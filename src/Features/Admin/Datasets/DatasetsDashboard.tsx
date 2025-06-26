import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import MainContent from "../Structural/MainContent/MainContent";
import Navbar from "../Structural/Navbar/Navbar";
import Sidebar from "../Structural/Sidebar/Sidebar";
import { BREADCRUMBS } from "@/App/Consts";
import { getDatasets } from "@/Services/dataset/datasetService";
import type { Dataset } from "@/Services/dataset/dataset.types";
import TableList from "../../Components/TableList/TableList";
import Breadcrumbs from "@/Features/Components/BreadCrumbs/BreadCrumbs";
import ContentModal from "@/Features/Components/ContentModal/ContentModal";
import NewDatasetFormModal from "./NewDatasetFormModal";

export default function DatasetsDashboard() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isNewDatasetModalOpen, setIsNewDatasetModalOpen] = useState(false);

  const handleAddNewDataset = () => {
    setIsNewDatasetModalOpen(true);
  };

  const fetchDatasets = async () => {
      try {
        const data = await getDatasets();
        setDatasets(data);
      } catch {
        toast.error("Failed to load datasets!");
      }
  };

  useEffect(() => {
    fetchDatasets();
  }, []);

  const mappedDatasetList = datasets.map((dataset) => ({
    id: dataset._id,
    name: dataset.name,
    ownerTenant: dataset.ownerTenantId?.name || '—',
    sharedTenants: dataset.sharedWithTenants?.map((t) => t.name).join(', ') || '—',
    created: dataset.createdDate
      ? new Date(dataset.createdDate).toLocaleString()
      : "-",
    createdBy: dataset.createdBy?.username || "-",
    updated: dataset.updatedDate
      ? new Date(dataset.updatedDate).toLocaleString()
      : "-",
    updatedBy: dataset.updatedBy?.username || "-",
    actions: [
      {
        label: "Edit",
        onClick: () => console.log("Edit clicked", dataset._id),
      }
    ],
  }));

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />
        <Breadcrumbs breadcrumbs={BREADCRUMBS.DATASETS} />
        <MainContent>
          <TableList
						data={mappedDatasetList}
						headers={[
							"id",
							"name",
              "ownerTenant",
              "sharedTenants",
							"created",
              "createdBy",
							"updated",
              "updatedBy",
						]}
						currentPage={currentPage}
						itemsPerPage={10}
						onPageChange={(page) => setCurrentPage(page)}
						showHeaderTitle={false}
            headerTitle="List of Datasets"
						showHeaderSearch={true}
						showActionInEllipses={true}
						showSNo={true}
						showActions={true}
            headerButtonText="Add Dataset"
            onHeaderButtonClick={() => handleAddNewDataset()}
					/>
        </MainContent>
      </div>

      <ContentModal
        open={isNewDatasetModalOpen}
        onClose={() => setIsNewDatasetModalOpen(false)}
        title="New Dataset"
        confirmText="Save"
        cancelText="Cancel"
        hideFooter={true}
        hideTitle={true}
      >
        <NewDatasetFormModal onCancel={() => setIsNewDatasetModalOpen(false)} onSuccess={fetchDatasets} />
      </ContentModal>

    </div>
  );
}
