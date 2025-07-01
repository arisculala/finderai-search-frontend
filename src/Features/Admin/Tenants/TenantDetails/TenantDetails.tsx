import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CollapsibleContainer from "@/Features/Components/CollapsibleContainer/CollapsibleContainer";
import {
  UserGroupIcon,
  BuildingOffice2Icon,
} from '@heroicons/react/24/outline';
import Sidebar from "../../Structural/Sidebar/Sidebar";
import Navbar from "../../Structural/Navbar/Navbar";
import MainContent from "../../Structural/MainContent/MainContent";
import type { Tenant } from "@/Services/tenant/tenant.types";
import { getTenant } from "@/Services/tenant/tenantService";
import Breadcrumbs from "@/Features/Components/BreadCrumbs/BreadCrumbs";
import { BREADCRUMBS } from "@/App/Consts";
import TenantGeneralForm from "./TenantGeneralForm";
import TenantUsers from "../TenantUsers/TenantUsers";

export default function TenantDetails() {
  const { id: tenantId } = useParams();
  const [tenant, setTenant] = useState<Tenant | null>(null);

  const fetchTenant = async () => {
    try {
      const data = await getTenant(tenantId || '');
      setTenant(data);
    } catch(e) {
      console.error("Failed to fetch tenant details!", e);
    }
  };

  useEffect(() => {
    fetchTenant();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
      <Navbar />
      <Breadcrumbs breadcrumbs={BREADCRUMBS.TENANT_DETAILS} lastItem={tenant?._id.toString()}/>
        <MainContent>
          {tenant && (
            <div className="space-y-8">
              {/* General Section */}
              <CollapsibleContainer
                headerText={`${tenant?.name ?? ''}`}
                icon={<BuildingOffice2Icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />}
              >
                <TenantGeneralForm tenant={tenant} onSuccess={fetchTenant}/>
              </CollapsibleContainer>

              {/* Users Section */}
              <CollapsibleContainer
                headerText="Users"
                icon={<UserGroupIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />}
              >
                <TenantUsers tenant={tenant} />
              </CollapsibleContainer>
            </div>
          )}
        </MainContent>
      </div>
    </div>
  );
}
